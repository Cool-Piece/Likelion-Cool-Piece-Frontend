import "../scss/styles.scss";
import "regenerator-runtime";
import Auth from "./auth";
import { stackType, userLocations } from "./studyDatas";
import { BASE_URL } from "./api";

const editButton = document.querySelector(".mypage-form .button-edit");
const saveButton = document.querySelector(".mypage-form .button-save");
const currentNickname = document.querySelector(".input-name .nickname-label");
const inputNickname = document.querySelector(".profile-data-container .nickname");
const controlLocation = document.querySelector(".button-location");
const selectLocation = document.querySelector(".selections-location");
const currentLocation = document.querySelector(".user-location dd");
const selectionButton = document.querySelector(".mypage-form .profile-data-container .fav-select-box .select-box");
const selectionStacks = document.querySelector(".mypage-form .profile-data-container .fav-select-box .selection-stack");
const favTag = document.querySelector(".mypage-form .profile-data-container .tags.stack-type");


function addLocationOptions() {
  userLocations.forEach((item) => {
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

function editUserProfileInfo() {
  // 버튼 토글 및 버튼 텍스트 수정 
  editButton.addEventListener("click", (event) => {
    if (selectionButton.classList.contains("on")) {
      editButton.textContent= "수정"; 
    } else {
      editButton.textContent= "수정완료";
    }
    selectionButton.classList.toggle("on");
  });

  // 유저 닉네임 수정 
  editButton.addEventListener("click", (event) => {
    inputNickname.classList.toggle("on"); 
    const nickname = inputNickname.value;
    currentNickname.innerHTML = nickname;
  });

  // 지역 수정 
  selectLocation.addEventListener("click", (event) => {
    if (event.target.nodeName === "BUTTON") {
      currentLocation.textContent = `${event.target.textContent}`;
    }
    event.preventDefault();
    selectLocation.classList.toggle("on");
  });

  // 스택 태그 유무 확인
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
  // 클릭 시 스택 추가
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
  // 태그 클릭 시 제거
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
  showLocationOptions(); 
  addLocationOptions();  
  addStackType(); 
  editUserProfileInfo();
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
  saveButton.addEventListener("click", async (event) => {
    const profileData = {
      nickname: currentNickname.textContent, 
      user_location: currentLocation.textContent, 
      fav_stack: favStackList
    } 
    console.log(profileData);
    const baseURL = "http://localhost:5000/users/edit";
      const request = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer${Auth.getToken()}`,
        },
        body: JSON.stringify(profileData),
      });
      const result = await request.json();
      console.log(result.message); 

      if (result.message === "Internal Server Error") {
        console.log("mypage update error");
      } if (result.result === "ok") {
        window.location.href = "http://127.0.0.1:5500/Likelion-Cool-Piece-Frontend/assets/html/index.html"; 
      }
    
  })
}
sendUserData(); 
