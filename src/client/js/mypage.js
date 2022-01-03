import "../scss/styles.scss";
import "regenerator-runtime";
import Auth from "./auth";
import { stackType, locations } from "./studyDatas";
import { BASE_URL } from "./api";

const editButton = document.querySelector(".mypage-form .button-edit");
const saveButton = document.querySelector(".mypage-form .button-save");
const currentNickname = document.querySelector(".input-name .nickname-label");
const inputNickname = document.querySelector(
  ".profile-data-container .nickname"
);
const controlLocation = document.querySelector(".button-location");
const selectLocation = document.querySelector(".selections-location");
const currentLocation = document.querySelector(".user-location dd");
const selectionButton = document.querySelector(
  ".mypage-form .profile-data-container .fav-select-box .select-box"
);
const selectionStacks = document.querySelector(
  ".mypage-form .profile-data-container .fav-select-box .selection-stack"
);
const favTag = document.querySelector(
  ".mypage-form .profile-data-container .tags.stack-type"
);

function changeEditButton() {
  editButton.addEventListener("click", (event) => {
    inputNickname.classList.toggle("on"); 
    const nickname = inputNickname.value;
    currentNickname.innerHTML = nickname;
  });
}

function addLocationOptions() {
  locations.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    li.classList.add("locations");
    button.textContent = item;
    button.classList.add("location");
    selectLocation.appendChild(li).appendChild(button);
  });
}

function showLocationOptions() {
  editButton.addEventListener("click", (event) => {
    controlLocation.classList.toggle("on");
  });
  controlLocation.addEventListener("click", (event) => {
    selectLocation.classList.add("on");
  });
}

function updateLocationOptions() {
  selectLocation.addEventListener("click", (event) => {
    if (event.target.nodeName === "BUTTON") {
      currentLocation.textContent = `${event.target.textContent}`;
    }
    selectLocation.classList.toggle("on");
  });
}

function addStackType() {
  stackType.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    li.classList.add("stacks");
    button.textContent = item;
    button.classList.add("selections");
    selectionStacks.appendChild(li).appendChild(button);
  });
}

let favStackList = [];
function handleTagSelect() {
  editButton.addEventListener("click", (event) => {
    selectionButton.classList.toggle("on");
  });
  selectionButton.addEventListener("click", (event) => {
    selectionStacks.classList.toggle("on"); 
  }); 


  selectionStacks.addEventListener("click", (event) => {
    let flag = true;
    favStackList.forEach((tag) => {
      if (event.target.textContent === tag) {
        flag = false;
      }
    });

    if (flag) {
      if (event.target.nodeName === "BUTTON") {
        let li = document.createElement("li");
        favTag.appendChild(li);
        li.textContent = `${event.target.textContent}`;
        favStackList.push(event.target.textContent);
      }
    }
    event.preventDefault();
    selectionStacks.classList.remove("on");
  });

  favTag.addEventListener("click", (event) => {
    let removeTag;
    if (event.target.nodeName === "LI") {
      event.target.remove();
      removeTag = favStackList.indexOf(event.target.textContent);
      favStackList.splice(removeTag, 1);
    }
  });
}

async function displayUserInfo() {
  const userData = await Auth.getUserData();
  const { username, avatar_url, location, interested_skills } = userData;
  const avatar = document.querySelector(".user-image");
  currentNickname.textContent = username;
  avatar.src = avatar_url;
  currentLocation.textContent = location;

  if (interested_skills) {
    interested_skills.forEach((data) => {
      const skill = document.createElement("li");
      skill.textContent = data;
    });
  }
}

function renderUpdateProfile() {
  changeEditButton();
  showLocationOptions();
  handleTagSelect();
  addLocationOptions();
  updateLocationOptions();
  addStackType();
} 

async function requestUpdateUserInfo() {
  const body = {};
  const updateRequest = await fetch(`${BASE_URL}/user/edit`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

function init() {
  displayUserInfo();
  renderUpdateProfile();
  requestUpdateUserInfo();
}

init();

// 데이터 전송
function sendUserData() {
  saveButton.addEventListener("click", (event) => {
    const profileData = {
      nickname: currentNickname.textContent, 
      user_location: currentLocation.textContent, 
      fav_stack: favStackList
    } 

    // const baseURL = "http://localhost:5000/mypage";
    //   const request = await fetch(baseURL, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(profileData),
    //   });
    //   const result = await request.json();
    //   console.log(result.message); 

    //   if(result.message === "Internal Server Error"){
    //     alert("서버를 기다리는 중입니다. 잠시후 다시 시도해주세요!");
    //   } if(result.result === "ok") {
    //     window.location.href = "http://127.0.0.1:5500/Likelion-Cool-Piece-Frontend/assets/html/index.html"; 
    //   }
    
  })
}
sendUserData(); 
