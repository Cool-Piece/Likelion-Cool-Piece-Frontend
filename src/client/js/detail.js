import "../scss/styles.scss";
import DetailModel from "./detailModel";
import Comment from "./comment";
import Auth from "./auth";
import NavBar from "./navbar";
import { formatDate } from './utils';

class Detail {
  constructor({$target, userId = null}) {
    this.$target = $target;
    this.userId = userId;
    this.$info = $target.querySelector(".study-detail-info");
    this.detailModel = new DetailModel();
    this.detailModel.getData().then((res) => {
      this.data = res.studyInfo;
      this.render();
      this.$comment = new Comment({
        $target: this.$target.querySelector(".study-detail-comment"),
        initData: this.data.comments,
        userId: this.userId
      });
    });
  }

  initEvents() {
    const joinButton = this.$target.querySelector(".join-study");
    const modal = document.querySelector(".modal");

    joinButton.addEventListener("click", () => {
      if (!this.userId) {
        window.location.href = './login.html';
      } else {
        if (this.userId === this.data.creator._id) {
          alert('참여 중 입니다.');
          return;
        }
        modal.classList.toggle("on");
      }
    });

    modal.addEventListener("click", async (event) => {
      const ok = "modal-button yes";
      const cancel = "modal-button no";

      if (event.target.className === ok) {
        const result = await fetch(`http://localhost:5000/${localStorage.getItem('detailPageId')}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer${Auth.getToken()}`
          }
        });

        if (result.status === 201) {
          window.location.reload();
        }
      }

      if (event.target.className === cancel) {
        modal.classList.toggle("on");
      }
    });
  }

  render() {
    const isJoin = this.data.participants.find(id => id === this.userId);
    const onBookmark = this.data.creator.bookmark.find(id => id === this.userId);

    this.$info.innerHTML = `
      <header class="detail-title">
        <h2>${this.data.title}</h2>
        <div class="icon-box">
          <!-- notify: 하트 기능은 나중에 추가하겠습니다. 북마크부터 진행하겠습니다! -->
          <!-- <img class="heart-icon" alt="heart icon"> -->
          <!-- TODO: 북마크 데이터 받아서 렌더링해주기 -->
          <!-- <img src="" alt="bookmark-icon"> -->
          ${
            onBookmark
              ? `<i class="fas fa-bookmark bookmark-icon"></i>`
              : `<i class="far fa-bookmark bookmark-icon"></i>`
          }
        </div>
      </header>

      <div class="stack-container">
        <ul class="stack-boxs">
          ${this.data.skills
            .map((skill) => {
              return `<li>${skill}</li>`;
            })
            .join("")}
        </ul>
        ${
          isJoin
            ? `<button class="join-study">참여 중</button>`
            : `<button class="join-study">참여하기</button>`
        }
      </div>

      <dl class="study-info">
        <div class="study-info created">
          <dt>게시일</dt>
          <dd class="study-info createdAt">${formatDate(
            this.data.createdAt
          )}</dd>
        </div>

        <div class="study-info infos">
          <div>
            <dt>작성자</dt>
            <dd class="study-info creator">${this.data.creator.username}</dd>
          </div>
          <div>
            <dt>모집 인원</dt>
            <dd class="study-info participants">
              ${this.data.participants.length} / ${this.data.total}
            </dd>
          </div>
          <div>
          <dt>진행기간</dt>
          <dd class="study-info term">
            <span>${formatDate(this.data.start_date)}</span> ~
            <span>${formatDate(this.data.due_date)}</span>
          </dd>
          </div>
        </div>
      </dl>
      <hr>
      <section class="study-content"></section>
    `;

    this.$target.querySelector(".study-content").innerText =
      this.data.description;
    this.initEvents();
  }
}

async function detail() {
  const userData = await Auth.getUserData();
  new NavBar({
    $target: document.querySelector(".navbar-list"),
    userData: userData.isLoggedIn ? userData : null,
  });
  new Detail({
    $target: document.querySelector(".study-detail-container"),
    userId: userData.isLoggedIn ? userData.userId : null
  });
}

detail();