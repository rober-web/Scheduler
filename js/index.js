let currentDay = $("#currentDay");
let container = $("#container");
let time = $("#theTime");
let currentHour = dayjs().format('H');

// 1. Set the current date
currentDay.append(dayjs().format("dddd, MMMM D"));

// 2. Function to display schedule
const displaySchedule = () => {
  for (let i = 0; i <= 24; i++) {
    let isCurrentHour = currentHour == i;
    let isPastHour = currentHour > i;
    let isFutureHour = currentHour <i;

    $("tbody").append(`
            <tr class="${isPastHour ? 'pastTime' : ''} ${isCurrentHour ? 'currentTime' : ''} ${isFutureHour ? 'futureTime' : ''}">
                <td class="fs-3 ">${i}:00 </td>
                <td class="editable fs-5" id="event-${i}"></td>
                <td id="deleteEvent"><button class="btn btn-danger">Delete</button></td>
            </tr>
        `);
  }
};

displaySchedule();

// 3. Add dblclick event to make theEvent editable
$("tbody").on("dblclick", ".editable", function () {
  // Create an input field and set its value to the current text
  let currentValue = $(this).text().trim();
  let inputField = $('<input class="inputField">')
    .attr("type", "text")
    .val(currentValue);

  // Replace the current text with the input field
  $(this).html(inputField);

  // Focus on the input field
  inputField.focus();

  // Add blur event to save changes when focus is lost
  inputField.on("blur", function () {
    let newText = $(this).val();
    $(this).parent().text(newText);
  });
});
