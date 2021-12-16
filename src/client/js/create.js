// SELECTBOX CONTROL
const selectBoxType = document.querySelector(".select-box.type");
const selectBoxStacks = document.querySelector(".select-box.stacks");
const selectionsType = document.querySelector(".selection-container.type");
const selectionsLanguage = document.querySelector(".selection-container.language");

selectBoxType.addEventListener("click", toggleSelectBoxType);
selectBoxStacks.addEventListener("click", toggleSelectBoxStack);

function toggleSelectBoxType(event){
    event.preventDefault();
    selectionsType.classList.toggle("active");
}
function toggleSelectBoxStack(event){
    event.preventDefault();
    selectionsLanguage.classList.toggle("active");
}

// SELECTNOX CONTROL //

// SELECT STUDY TAG
const studyType = ["면접", "프로젝트", "스터디"];
const stackType = ["HTML", "CSS", "JavaScript", "Node.JS", "React", "Python"];
const studyTags = document.querySelector(".tags.study-type");
const stackTags = document.querySelector(".tags.stack-type");

function addStudyType(){ 
    studyType.forEach((item) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        li.classList.add("stacks")
        button.textContent = item;
        button.classList.add("selections")
        selectionsType.appendChild(li).appendChild(button);

    });
}
addStudyType();

function addStackType(){ 
    stackType.forEach((item) => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        li.classList.add("languages")
        button.textContent = item;
        button.classList.add("selections"); 
        selectionsLanguage.appendChild(li).appendChild(button);

    });
}
addStackType();


const selectTypeParent = document.querySelector(".select-box.parent"); 

selectionsType.addEventListener("click", (event) => { 

    if (event.target.nodeName === "BUTTON") {
        const li = document.createElement("li");
        studyTags.appendChild(li);
        event.preventDefault();
        
        const tag = document.querySelector(".tags.study-type li");
        tag.textContent = `${event.target.textContent}`;
    }
    selectionsType.classList.remove("active");
}); 

// DATE PICKER
// 시작일
const datePickerElement = document.querySelector(".date.start .date-picker");
const selectedDateElement = document.querySelector(".date.start .date-picker .selected-date");
const datesElement = document.querySelector(".date.start .date-picker .dates");
const monthElement = document.querySelector(".date.start .date-picker .dates .month .mth");
const nextMonthElement = document.querySelector(".date.start .date-picker .dates .month .next-month");
const prevMonthElement = document.querySelector(".date.start .date-picker .dates .month .prev-month");
const daysElement = document.querySelector(".date.start .date-picker .dates .days");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

monthElement.textContent = months[month] + " " + year;
selectedDateElement.textContent = formatDate(date);
selectedDateElement.dataset.value = selectedDate;

populateDates();

nextMonthElement.addEventListener("click", goToNextMonth);
prevMonthElement.addEventListener("click", goToPrevMonth);
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
    populateDates();
}

function goToPrevMonth(event){
    month--;
    if (month < 0){
        month = 11;
        year--;
    }
    monthElement.textContent = months[month] + " " + year;
    populateDates();
}

function populateDates(event) {
    daysElement.innerHTML = "";
    let amountDays = 31;

    if (month == 1){
        amountDays = 28;
    }

    for(let i = 0; i < amountDays; i++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = i + 1;

        if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month){
            dayElement.classList.add("selected");
        }

        dayElement.addEventListener("click", function() {
            selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
            selectedDay = (i + 1);
            selectedMonth = month;
            selectedYear = year;
            
            selectedDateElement.textContent = formatDate(selectedDate);
            selectedDateElement.dataset.value = selectedDate;

            populateDates();
        });

        daysElement.appendChild(dayElement);
    }
}

// helper function
function checkEventPathForClass(path, selector) {
    for(i=0; i < path.length; i++){
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}

function formatDate(d) {
    let day = d.getDate();
    if (day < 10){
        day = "0" + day;
    }

    let month = d.getMonth() + 1;
    if (month < 10){
        month = "0" + month;
    }

    let year = d.getFullYear();

    return month + " / " + day + " / " + year;
}

// DATE PICKER //

// LOCATION PICKER
const selectBoxLocation = document.querySelector(".select-box.location");
const selectionsLocation = document.querySelector(".selection-location");

selectBoxLocation.addEventListener("click", toggleSelectBoxLocation);

function toggleSelectBoxLocation(event){
    event.preventDefault();
    selectionsLocation.classList.toggle("active");
} 
