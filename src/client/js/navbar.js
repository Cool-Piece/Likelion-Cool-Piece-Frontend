import Auth from './auth.js';
import { CARD_VIEW_TYPE, CARD_VIEW_TYPES } from './constant.js';

export default class NavBar {
  constructor({$target, userData}) {
    this.$target = $target;
    this.user = userData;

    document.querySelector('#logo').addEventListener('click', () => {
      let url = window.location.href.split("/");
      url = url.slice(0, url.length-1);
      url.push('index.html');
      url = url.join("/");
      window.location.href = url;
    })

    this.render();
  }

  render() {
    this.$target.innerHTML = `
      <li data-link="interview"><a>면접</a></li>
      <li data-link="study"><a>스터디</a></li>
      <li data-link="project"><a>프로젝트</a></li>
      <li><a>채팅</a></li>
      <li class="sign ${this.user ? 'logOn' : 'logOff'}">
        ${this.user ? `
          <div class="avatar_wrap">
            <img src=${this.user.avatar_url} alt="${this.user.username}의 프로필 사진입니다" />
          </div>
        ` : '<a href="./login.html">로그인</a>'}
        ${this.user ? `
          <ul class="navBar-userRoutes">
            <li><a href="./mypage.html">프로필</a></li>
            <li><a href="./create.html">스터디 생성</a></li>
            <li><a href="./#">스터디 현황</a></li>
            <li><a href="./#">내 작성 글</a></li>
            <li class="logoutBtn"><a>로그아웃</a></li>
          </ul>
        ` : ''}
      </li>
    `;

    if (this.user) {
      this.$target.querySelector('.logoutBtn').addEventListener('click', () => {
        Auth.logout();
      })
    }

    this.$target.addEventListener('click', event => {
      const li = event.target.closest('li');
      if (li?.contains(event.target) && li.dataset.link) {
        localStorage.setItem(CARD_VIEW_TYPE, li.dataset.link);
        
        let path = window.location.pathname.split('/');
        path[path.length-1] = 'index.html';
        path = path.join('/');
        window.location.pathname = path;
      } 
    })
  }
}