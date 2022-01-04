import "../scss/styles.scss";
import Auth from './auth';
import NavBar from './navbar';
import { stackType, locations } from "./studyDatas";

const editButton = document.querySelector(".mypage-form .button-edit");  

// 유저 닉네임 
const controlNickname = document.querySelector(".input-name");  
const currentNickname = document.querySelector(".input-name .nickname-label"); 
const inputNickname = document.querySelector(".profile-data-container .nickname");   

// 유저 지역 
const controlLocation = document.querySelector(".button-location"); 
const selectLocation = document.querySelector(".selections-location");
const currentLocation = document.querySelector(".user-location dd"); 

// 유저 기술 태그
const selectionButton = document.querySelector(".mypage-form .profile-data-container .fav-select-box .select-box");  
const selectionStacks = document.querySelector(".mypage-form .profile-data-container .fav-select-box .selection-stack");  
const favTag = document.querySelector(".mypage-form .profile-data-container .tags.stack-type"); 

// 닉네임 변경 
function handleNickname() {
  editButton.addEventListener("click", (event) => {
    inputNickname.classList.toggle("on");   
    editButton.textContent = "변경하기"; 
    let nickname = inputNickname.value; 
    currentNickname.innerHTML = nickname;
  });  
};

// 지역 추가
function addLocation() {
  locations.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    li.classList.add("locations");
    button.textContent = item;
    button.classList.add("location");
    selectLocation.appendChild(li).appendChild(button);
  })
}

function handleLocation(){
  editButton.addEventListener("click", (event) => {
    controlLocation.classList.toggle("on");  
  });
  controlLocation.addEventListener("click", (event) => {
    selectLocation.classList.add("on"); 
  });
} 

function updateLocation() {
  selectLocation.addEventListener("click", (event) => {
    if (event.target.nodeName === "BUTTON") {
      currentLocation.textContent = `${event.target.textContent}`
    }
    selectLocation.classList.toggle("on"); 
  })
}


// 태그 관련 
//  스택 리스트 추가
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
function handleTagSelect(){
  editButton.addEventListener("click", (event) => { 
    selectionButton.classList.toggle("on"); 
  });
  selectionButton.addEventListener("click", (event) => {
    selectionStacks.classList.toggle("on"); 
  })

// 중복 확인
selectionStacks.addEventListener("click", (event) => {
  let flag = true; 
  favStackList.forEach((tag) => {
    if (event.target.textContent === tag){
      flag = false; 
    }
  }); 
// 태그 추가
    if (flag) {
      if(event.target.nodeName === "BUTTON"){
        let li = document.createElement("li");  
        favTag.appendChild(li); 
        li.textContent = `${event.target.textContent}`;
        favStackList.push(event.target.textContent); 
      }
    }
        event.preventDefault();
        selectionStacks.classList.remove("on");
    }); 

    // 스택 유형 태그 제거
    favTag.addEventListener("click", (event) => {
    let removeTag;
    if (event.target.nodeName === "LI") {
    event.target.remove();
    removeTag = favStackList.indexOf(event.target.textContent);
    favStackList.splice(removeTag, 1);
  }
});
}

handleNickname(); 
addLocation(); 
handleLocation(); 
updateLocation(); 
addStackType(); 
handleTagSelect(); 


  //  유저 마이페이지 데이터 
  let userMypageData = {
    nick_name: currentNickname.innerHTML,  
    fav_stack: favStackList, 
    location: currentLocation.textContent, 
  }; 
  console.log(userMypageData); 

const authCheck = async () => {
  const userData = await Auth.getUserData();
  if (!userData.isLoggedIn) {
    window.location.href = "./index.html";
  }
  new NavBar({
    $target: document.querySelector(".navbar-list"),
    userData: userData.isLoggedIn ? userData : null,
  });
};
authCheck();