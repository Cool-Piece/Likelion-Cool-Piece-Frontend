const datePickerElement = document.querySelector(".date-picker");
const selectedDateElement = document.querySelector(".date-picker .selected-date");
const datesElement = document.querySelector(".date-picker .dates");
const monthElement = document.querySelector(".date-picker .dates .month .mth");
const nextMonthElement = document.querySelector(".date-picker .dates .month .next-month");
const prevMonthElement = document.querySelector(".date-picker .dates .month .prev-month");
const daysElement = document.querySelector(".date-picker .dates .days");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];

let date = new Date();
let day = date.getDate();
let month = date.getMonth()-2;
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

monthElement.textContent = months[month] + ' ' + year;
nextMonthElement.addEventListener('click', goToNextMonth());
 

// EVENT LISTNERS
datePickerElement.addEventListener("click", toggleDatePicker);


// FUNCTIONS
function toggleDatePicker(event) {
    if (!checkEventPathForClass(event.path, "dates" )){
        datesElement.classList.toggle("active");
    } 
}

function goToNextMonth(event){ 
    month++;
    if (month > 11){
        month = 0;
        year++;
    }
    monthElement.textContent = months[month] + " " + year;
}

function checkEventPathForClass(path, selector) {
    for(i=0; i < path.length; i++){
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}