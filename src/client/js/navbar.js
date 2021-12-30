import Auth from './auth.js';

export default class NavBar {
  constructor({$target, isLoggedIn}) {
    this.$target = $target;
    this.isLogin = isLoggedIn;

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
      <li><a href="./#">면접</a></li>
      <li><a href="./#">스터디</a></li>
      <li><a href="./#">프로젝트</a></li>
      <li><a href="./#">채팅</a></li>
      <li class="sign ${this.isLogin ? 'logOn' : 'logOff'}">
        ${this.isLogin ? '로그아웃' : '<a href="./#">로그인</a>'}
        ${this.isLogin ? `
          <ul class="navBar-userRoutes">
            <li><a href="./#">프로필</a></li>
            <li><a href="./#">스터디 생성</a></li>
            <li><a href="./#">스터디 현황</a></li>
            <li><a href="./#">내 작성 글</a></li>
            <li class="logoutBtn"><a>로그아웃</a></li>
          </ul>
        ` : ''}
      </li>
    `;

    if (this.isLogin) {
      this.$target.querySelector('.logoutBtn').addEventListener('click', () => {
        Auth.logout();
      })
    }
  }
}