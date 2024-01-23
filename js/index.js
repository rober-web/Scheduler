let currentDay = $("#currentDay");
let container = $("#container");
let time = $("#theTime");
let currentHour = dayjs().format("H");

// 1. Set the current date
currentDay.append(dayjs().format("dddd, MMMM D"));

// 2. Function to display schedule
const displaySchedule = () => {
  // Create the number of hours in the schedule through a loop
  for (let i = 0; i <= 23; i++) {
    // Create classes to apply according to the past, present and future hours
    let isCurrentHour = currentHour == i;
    let isPastHour = currentHour > i;
    let isFutureHour = currentHour < i;

    // Get the stored value from local storage | set dynamic id according to the for loop iteration
    let storedEvent = localStorage.getItem(`event-${i}`) || "";

    // Append the table row to the table body
    $("tbody").append(`
      <tr class="${isPastHour ? "pastTime" : ""} ${isCurrentHour ? "currentTime" : ""} ${isFutureHour ? "futureTime" : ""}">
        <td class="fs-3">${i}:00 </td>
        <td class="editable fs-5" id="event-${i}">${storedEvent}</td>
        <td><button class="btn btn-danger rounded-circle delete" id="delete-${i}">X</button></td>
      </tr>
    `);
  }
};

// Call function to display the schedule
displaySchedule();

// 3. Add dblclick event to make theEvent editable
$("tbody").on("dblclick", ".editable", function (e) {
  e.preventDefault();

  // Get the current value from the clicked element
  let currentValue = $(e.currentTarget).text().trim();

  // Create an input field and set its value to the current text

  let inputField = $('<input class="inputField">')
    .attr("type", "text")
    .val(currentValue);

  // Replace the current text with the input field
  $(this).html(inputField);

  // Focus on the input field
  inputField.focus();

  // Call the save event function to bind the inputField
  saveEvent(inputField);
});


// 4. Save the event 

const saveEvent = (theEvent) => {
  // Add blur event to save changes when focus is lost
  theEvent.on("blur", function () {
    // Get the updated text from the input field
    let newText = $(this).val();

    // Get the current hour index
    let currentHour = $(this).closest("tr").index();

    // Store the updated value in local storage with a unique key for each hour
    // Prior check if the value is empty before saving to local storage to avoid saving empty values
    if (newText !== "") localStorage.setItem(`event-${currentHour}`, newText);

    // Retrieve the stored value from local storage
    let theText = localStorage.getItem(`event-${currentHour}`);

    // Set the retrieved text to the parent element
    $(this).parent().text(theText);

    console.log(theText);
  });
};

// 5. Delete button

$("tbody").on("click", ".delete", (e) => {
  e.preventDefault();

  // Set a confirm box for the user making sure they want to delete the event
  let deleteMessage = "Confirm you want to delete this event?";

  if(confirm(deleteMessage) === true) {

    // Get the closest row (parent 'tr') to the clicked delete button
    let row = $(e.currentTarget).closest("tr");

    // Get the index of the row
    let currentHour = row.index();

    // Remove the item from localStorage
    localStorage.removeItem(`event-${currentHour}`);

    // Clear the text in the table cell
    row.find(".editable").text("");

  }
  else{
    return;
  }

});
