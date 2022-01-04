import "regenerator-runtime";
import "../scss/styles.scss";
import Auth from "../js/auth";
import { studyType, stackType, months, locations } from "../js/studyDatas";

// 셀렉트박스 요소
const selectBoxType = document.querySelector(".select-box.type");
const selectBoxStacks = document.querySelector(".select-box.stacks");
const selectionsType = document.querySelector(".selection-container.type");
const selectionsLanguage = document.querySelector(
  ".selection-container.language"
);
const stackTags = document.querySelector(".tags.stack-type");
const selectBoxLocation = document.querySelector(".select-box.location");
const selectionsLocation = document.querySelector(".selection-location");
// 캘린더 시작일 요소
const datePickerElement = document.querySelector(".date.start .date-picker");
const selectedDateElement = document.querySelector(
  ".date.start .date-picker .selected-date"
);
const datesElement = document.querySelector(".date.start .date-picker .dates");
const monthElement = document.querySelector(
  ".date.start .date-picker .dates .month .mth"
);
const nextMonthElement = document.querySelector(
  ".date.start .date-picker .dates .month .next-month"
);
const prevMonthElement = document.querySelector(
  ".date.start .date-picker .dates .month .prev-month"
);
const daysElement = document.querySelector(
  ".date.start .date-picker .dates .days"
);
// 캘린더 종료일 요소
const datePickerElementEnd = document.querySelector(".date.end .date-picker");
const selectedDateElementEnd = document.querySelector(
  ".date.end .date-picker .selected-date"
);
const datesElementEnd = document.querySelector(".date.end .date-picker .dates");
const monthElementEnd = document.querySelector(
  ".date.end .date-picker .dates .month .mth"
);
const nextMonthElementEnd = document.querySelector(
  ".date.end .date-picker .dates .month .next-month"
);
const prevMonthElementEnd = document.querySelector(
  ".date.end .date-picker .dates .month .prev-month"
);
const daysElementEnd = document.querySelector(
  ".date.end .date-picker .dates .days"
);

// 제목
const studyTitle = document.querySelector(".input-title");

// 모집인원
const participants = document.querySelector(".select-box.number");

// 상세내용
const textDetails = document.querySelector(".input-text");

// 모달창
const modalCreatePage = document.querySelector(".modal");

// 페이지 생성 버튼
const createButton = document.querySelector(".modal-button.yes");
const submitButton = document.querySelector(".buttons.submit");

// 셀렉트 박스 클릭 시 토글
function toggleSelectBoxType(event) {
  event.preventDefault();
  selectionsType.classList.toggle("active");
}
function toggleSelectBoxStack(event) {
  event.preventDefault();
  selectionsLanguage.classList.toggle("active");
}
selectBoxType.addEventListener("click", toggleSelectBoxType);
selectBoxStacks.addEventListener("click", toggleSelectBoxStack);

// 스터디 유형 셀렉트 박스에 추가
function addStudyType() {
  studyType.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    li.classList.add("stacks");
    button.textContent = item;
    button.classList.add("selections");
    selectionsType.appendChild(li).appendChild(button);
  });
}
addStudyType();

// 스택, 기술 이름 셀렉트 박스에 추가
function addStackType() {
  stackType.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    li.classList.add("languages");
    button.textContent = item;
    button.classList.add("selections");
    selectionsLanguage.appendChild(li).appendChild(button);
  });
}
addStackType();

// 스터디 유형 셀렉트 박스 선택 시 텍스트 변경
selectionsType.addEventListener("click", (event) => {
  if (event.target.nodeName === "BUTTON") {
    selectBoxType.textContent = `${event.target.textContent}`;
    event.preventDefault();
  }
  selectionsType.classList.remove("active");
});

let tagList = [];
// 스택 유형 셀렉트 박스 선택 시 태그 추가
selectionsLanguage.addEventListener("click", (event) => {
  // 중복확인
  let flag = true;
  tagList.forEach((tag) => {
    if (event.target.textContent === tag) {
      flag = false;
    }
  });

  if (flag) {
    if (event.target.nodeName === "BUTTON") {
      const li = document.createElement("li");
      stackTags.appendChild(li);
      li.textContent = `${event.target.textContent}`;
      tagList.push(event.target.textContent);
    }
  }
  event.preventDefault();
  selectionsLanguage.classList.remove("active");
});

// 스택 유형 태그 제거
stackTags.addEventListener("click", (event) => {
  let removeTag;
  if (event.target.nodeName === "LI") {
    event.target.remove();
    removeTag = tagList.indexOf(event.target.textContent);
    tagList.splice(removeTag, 1);
  }
});

// 데이트 피커 (변수들)
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
monthElementEnd.textContent = months[month] + " " + year;
selectedDateElementEnd.textContent = formatDate(date);
selectedDateElementEnd.dataset.value = selectedDate;

populateDates();
populateDatesEnd();

// 시작일 - 데이트 피커 버튼 클릭 시 토글
function toggleStartDate(event) {
  if (!checkEventPathForClass(event.path, "dates")) {
    datesElement.classList.toggle("active");
  }
}

// 종료일 - 데이트 피커 버튼 클릭 시 토글
function toggleEndDate(event) {
  if (!checkEventPathForClass(event.path, "dates")) {
    datesElementEnd.classList.toggle("active");
  }
}

// 시작일 - 다음 월로 이동
function goToNextMonth(event) {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  monthElement.textContent = months[month] + " " + year;
  populateDates();
}

// 시작일 - 이전 월로 이동
function goToPrevMonth(event) {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  monthElement.textContent = months[month] + " " + year;
  populateDates();
}

// 종료일 - 다음 월로 이동
function goToNextMonthEnd(event) {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  monthElementEnd.textContent = months[month] + " " + year;
  populateDatesEnd();
}

// 종료일 - 이전 월로 이동
function goToPrevMonthEnd(event) {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  monthElementEnd.textContent = months[month] + " " + year;
  populateDatesEnd();
}

nextMonthElement.addEventListener("click", goToNextMonth);
prevMonthElement.addEventListener("click", goToPrevMonth);
nextMonthElementEnd.addEventListener("click", goToNextMonthEnd);
prevMonthElementEnd.addEventListener("click", goToPrevMonthEnd);
datePickerElement.addEventListener("click", toggleStartDate);
datePickerElementEnd.addEventListener("click", toggleEndDate);

// 시작일 - 월별 일자 생성
function populateDates(event) {
  daysElement.innerHTML = "";
  let amountDays = 31;

  if (month == 1) {
    amountDays = 28;
  }
  if (month == 3) {
    amountDays = 30;
  }
  if (month == 5) {
    amountDays = 30;
  }
  if (month == 8) {
    amountDays = 30;
  }
  if (month == 10) {
    amountDays = 30;
  }

  for (let i = 0; i < amountDays; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = i + 1;

    if (
      selectedDay == i + 1 &&
      selectedYear == year &&
      selectedMonth == month
    ) {
      dayElement.classList.add("selected");
    }

    dayElement.addEventListener("click", function () {
      selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;
      selectedDateElement.textContent = formatDate(selectedDate);
      selectedDateElement.dataset.value = selectedDate;

      populateDates();
    });

    daysElement.appendChild(dayElement);
  }
}

// 종료일 - 월별 일자 생성
function populateDatesEnd(event) {
  daysElementEnd.innerHTML = "";
  let amountDays = 31;

  if (month == 1) {
    amountDays = 28;
  }
  if (month == 3) {
    amountDays = 30;
  }
  if (month == 5) {
    amountDays = 30;
  }
  if (month == 8) {
    amountDays = 30;
  }
  if (month == 10) {
    amountDays = 30;
  }

  for (let i = 0; i < amountDays; i++) {
    const endElement = document.createElement("div");
    endElement.classList.add("day");
    endElement.textContent = i + 1;

    if (
      selectedDay == i + 1 &&
      selectedYear == year &&
      selectedMonth == month
    ) {
      endElement.classList.add("selected");
    }

    endElement.addEventListener("click", function () {
      selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
      selectedDay = i + 1;
      selectedMonth = month;
      selectedYear = year;
      selectedDateElementEnd.textContent = formatDate(selectedDate);
      selectedDateElementEnd.dataset.value = selectedDate;

      populateDatesEnd();
    });
    daysElementEnd.appendChild(endElement);
  }
}

// 데이트 피커 선택 시 창 사라지는거 방지
function checkEventPathForClass(path, selector) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].classList && path[i].classList.contains(selector)) {
      return false;
    }
  }
}

// 셀렉트 박스에 일월년도 표시
function formatDate(d) {
  let day = d.getDate();
  if (day < 10) {
    day = "0" + day;
  }

  let month = d.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }

  let year = d.getFullYear();
  return month + " / " + day + " / " + year;
}

// 셀렉트 박스 지역 선택
function toggleSelectBoxLocation(event) {
  event.preventDefault();
  selectionsLocation.classList.toggle("active");
}
selectBoxLocation.addEventListener("click", toggleSelectBoxLocation);

// 셀렉트 박스 지역 추가
function addLocations() {
  locations.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    li.classList.add("locations");
    button.textContent = item;
    button.classList.add("location");
    selectionsLocation.appendChild(li).appendChild(button);
  });
}
addLocations();

// 지역 선택 시 텍스트 변경
selectionsLocation.addEventListener("click", (event) => {
  if (event.target.nodeName === "BUTTON") {
    selectBoxLocation.textContent = `${event.target.textContent}`;
  }
  event.preventDefault();
  selectionsLocation.classList.remove("active");
});

// 작성 클릭 시 모달창 오픈
submitButton.addEventListener("click", function (event) {
  modalCreatePage.classList.add("on");
});

modalCreatePage.addEventListener("click", function (event) {
  if (event.target.className === "modal-button no") {
    modalCreatePage.classList.remove("on");
  }
});

let userId;
let username;

// 유저 데이터 요청
async function getUserData() {
  const token = Auth.getToken();
  const request = await fetch("http://localhost:5000/users", {
    method: "GET",
    headers: {
      Authorization: `Bearer${token}`,
    },
  });
  const result = await request.json();
  console.log(result, "api result");
  userId = result.userId;
  username = result.username;
}
getUserData();

// 데이터 전송
async function sendStudyData() {
  createButton.addEventListener("click", async function (event) {
    // validation
    if (studyTitle.value == false && "제목을 입력해주세요") {
      alert("제목을 입력해주세요");
      return;
    } else if (selectBoxType.textContent == "모집 유형을 선택해주세요") {
      alert("모집 유형을 선택해주세요");
      return;
    } else if (tagList.length == 0) {
      alert("기술을 선택해주세요");
      return;
    } else if (selectBoxLocation.textContent == "지역 선택") {
      alert("지역을 선택해주세요");
      return;
    } else if (participants.value == false) {
      alert("모집 인원을 선택해주세요");
      return;
    } else if (textDetails.value == false) {
      alert("상세 내용을 입력해주세요");
      return;
    } else {

      const createStudyDatas = {
        title: studyTitle.value,
        study_type: selectBoxType.textContent,
        skills: tagList,
        start_date: selectedDateElement.textContent,
        due_date: selectedDateElementEnd.textContent,
        location: selectBoxLocation.textContent,
        total: participants.value,
        description: textDetails.value,
        userId,
      };
      console.log(createStudyDatas);

      const baseURL = "http://localhost:5000/create";
      const request = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createStudyDatas),
      });
      const result = await request.json();
      console.log(result.message); 

      if(result.message === "Internal Server Error"){
        alert("서버를 기다리는 중입니다. 잠시후 다시 시도해주세요!");
      } if(result.result === "ok") {
        window.location.href = "http://127.0.0.1:5500/Likelion-Cool-Piece-Frontend/assets/html/index.html"; 
      }
    }
    modalCreatePage.classList.remove("on");
  });
}
sendStudyData();
