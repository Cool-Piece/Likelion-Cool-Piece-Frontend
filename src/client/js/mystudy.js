import "regenerator-runtime";
import "../scss/styles.scss";
import Auth from "../js/auth";

const myStudyList = document.querySelector(".study-list"); 





// TODO 
// 1. 유저 데이터 (참여한 스터디) 가져오기  
// 유저데이터 가져오기 
async function getUserData() {
  const token = Auth.getToken();
  const request = await fetch("http://localhost:5000/:id", {
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

//유저 참여 스터디 데이터 가져오기.. 
// const baseURL = "http://localhost:5000/:id";
// const response = await fetch(baseURL, {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(createStudyDatas),
// });
// const result = await response.json();
// console.log(result.message); 

function renderStudyCard() { 
  // 2. 참여중인 스터디 카드 동적 생성 

  // 3. 스터디 카드에 해당 정보 넣어주기
}
