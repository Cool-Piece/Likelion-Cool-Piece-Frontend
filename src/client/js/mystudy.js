import "regenerator-runtime";
import "../scss/styles.scss";
import Auth from "./auth";
import NavBar from "./navbar";

export default class MyStudy {
  data;
  constructor($target) {
    this.$target = $target;
    this.$cardList = this.$target.querySelector(".study-list");
    
    // TODO: 북마크, 참여중인 스터디 데이터를 가져와주세요
    // 가져온 '스터디카드' 타입의 '배열' 데이터 fetchData를 setState에 넣어주시면 됩니다
    // this.setState(fetchData)
  }

  setState(nextState) {
    this.data = nextState;
    this.render();
  }

  render() {
    this.$cardList.innerHTML = this.data.map((card) => {
      return `
        <li class="study-card">
          <div class="main-info">
              <p class="study-title">${card.title}</p>
              <p class="study-date">
                ${formatDate(card.start_date)} ~ 
                ${formatDate(card.due_date)}
              </p>
          </div>
          <div class="study-status">
              <ul class="tag-list">
                ${card.skills.map((skill) => {
                  return `<li>${skill}</li>`;
                })}
              </ul>
              <!-- TODO: 참여기능 생기면 추가하기 -->
              <!-- <div class="sutdy-status">참여중</div> -->
          </div>
          </li>
      `;
    })
  }
}

const authCheck = async () => {
  const userData = await Auth.getUserData();
  if (!userData.isLoggedIn) {
    window.location.href = './login.html';
  }
  new NavBar({
    $target: document.querySelector(".navbar-list"),
    userData: userData.isLoggedIn ? userData : null,
  });
  new MyStudy(document.querySelector(".mystudy-wrap"));
};
authCheck();