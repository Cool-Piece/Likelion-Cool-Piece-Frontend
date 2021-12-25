export default class NavMenu {
  constructor($target) {
    this.$target = $target;
    
    // TODO: 로그인 여부 체크
    // isLogin: 로그인 여부 결과값
    this.isLogin = true;

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
            <li><a href="./#">로그아웃</a></li>
          </ul>
        ` : ''}
      </li>
    `
  }
}

new NavMenu(document.querySelector(".navbar-list"));