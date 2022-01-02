import "../scss/styles.scss";
import DetailModel from './detailModel';
import Comment from './comment';
import bookmark from "../assets/image/bookmark_icon.png";

class Detail {
  constructor($target) {
    this.$target = $target;
    this.$info = $target.querySelector('.study-detail-info');
    this.detailModel = new DetailModel();
    this.detailModel.getData().then(res => {
      this.data = res;
      this.render();
      this.$comment = new Comment({
        $target: this.$target.querySelector('.study-detail-comment'),
        initData: this.data.comments
      })
    })
  }

  initEvents() {
    const joinButton = this.$target.querySelector(".join-study");
    const modal = document.querySelector(".modal");

    joinButton.addEventListener("click", () => {
      modal.classList.toggle("on");
    });

    modal.addEventListener("click", (event) => {
      const ok = "modal-button yes";
      const cancel = "modal-button no";

      if (event.target.className === ok) {
        //TODO:
        // 1. 페이지를 이동시켜주고
        // 2. 백엔드 db에 참여한다고 해줌.
      }

      if (event.target.className === cancel) {
        modal.classList.toggle("on");
      }
    });
  }

  render() {
    this.$info.innerHTML = `
      <header class="detail-title">
        <h2>${this.data.title}</h2>
        <div class="icon-box">
          <!-- notify: 하트 기능은 나중에 추가하겠습니다. 북마크부터 진행하겠습니다! -->
          <!-- <img class="heart-icon" alt="heart icon"> -->
          <!-- TODO: 북마크 데이터 받아서 렌더링해주기 -->
          <img src=${bookmark} alt="bookmark-icon">
        </div>
      </header>

      <div class="stack-container">
        <ul class="stack-boxs">
          ${this.data.skills.map((skill) => {
            return `<li>${skill}</li>`
          }).join('')}
        </ul>
        <button class="join-study">참여하기</button>
      </div>

      <dl class="study-info">
        <div>
          <dt>게시일</dt>
          <dd class="study-info createdAt">${this.data.createdAt}</dd>
        </div>

        <div>
          <dt>작성자</dt>
          <dd class="study-info creator">${this.data.creator}</dd>
          <dt>모집 인원</dt>
          <dd class="study-info participants">${
            this.data.participants.length
          } / ${this.data.total}</dd>
          <dt>진행기간</dt>
          <dd class="study-info term">
            <span>${this.data.start_date}</span> ~
            <span>${this.data.due_date}</span>
          </dd>
        </div>
      </dl>
      <hr>
      <section class="study-content"></section>
    `;

    this.$target.querySelector('.study-content').innerText = this.data.description;
    this.initEvents();
  }
}

new Detail(document.querySelector('.study-detail-container'));