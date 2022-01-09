import "regenerator-runtime";
import "../scss/styles.scss";
import Auth from "./auth";
import NavBar from "./navbar";
import { BASE_URL } from './api';
import { formatDate } from './utils';
import Spinner from './spinner';

export default class MyStudy {
  data;
  constructor({ $target, userData }) {
    this.$target = $target;
    this.userData = userData;
    this.$cardList = this.$target.querySelector(".study-list");
    this.initEvent();
    this.spinner = new Spinner(this.$target.querySelector('.mystudy-section'));
    this.spinner.On();
    // TODO: 북마크, 참여중인 스터디 데이터를 가져와주세요
    // 가져온 '스터디카드' 타입의 '배열' 데이터 fetchData를 setState에 넣어주시면 됩니다
    // this.setState(fetchData)
    fetch(`${BASE_URL}/users/bookmark`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer${Auth.getToken()}`
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        return new Error('GET / 유저 북마크 에러');
      }
    })
    .then(res => {
      this.spinner.Off();
      this.setState(res.user.bookmark);
    })
    .catch(err => {
      console.error(err);
    })
  }

  initEvent() {
    document.querySelector('.study-list').addEventListener('click', (event) => {
      const card = event.target.closest('.study-card');
      if(card?.contains(event.target)) {
        localStorage.setItem('detailPageId', card.id)
        window.location.href = './detail.html';
      }
    })
  }

  setState(nextState) {
    this.data = nextState;
    this.render();
  }

  render() {
    this.$cardList.innerHTML = this.data.map((card) => {
      const onBookmark = this.userData.bookmark.find(id => id === card._id) ? true : false;
      return `
        <li class="study-card" id=${card._id}>
          <div class="main-info">
              <p class="study-title">${card.title}</p>
              <p class="study-date">
                ${formatDate(card.start_date)} ~ 
                ${formatDate(card.due_date)}
              </p>
          </div>
          <div class="study-status">
              <ul class="tag-list">
                ${card.skills.map((skill, idx) => {
                  if(idx>3) return '';
                  else return `<li>${skill}</li>`;
                }).join('')}
                ${card.skills.length > 4 ? `<span>+${card.skills.length - 4}</span>` : ''}
              </ul>
              <!-- TODO: 참여기능 생기면 추가하기 -->
              <div class="study-user-status">
                <div class="join-status">참여중</div>
                <div class="bookmark-status">
                  ${onBookmark
                    ? `<i class="fas fa-bookmark bookmark-icon"></i>`
                    : `<i class="far fa-bookmark bookmark-icon"></i>`
                  }
                </div>
              </div>
          </div>
          </li>
      `;
    }).join('');
  }
}

const authCheck = async () => {
  const userData = await Auth.getUserData();
  if (!userData.isLoggedIn) {
    window.location.href = './login.html';
  }
  new NavBar({
    $target: document.querySelector(".navbar-list"),
    userData
  });
  new MyStudy({
    $target: document.querySelector(".mystudy-wrap"),
    userData
  });
};
authCheck();