import "../scss/styles.scss";
import DetailModel from "./detailModel";
import Comment from "./comment";
import Auth from "./auth";
import NavBar from "./navbar";
import { formatDate } from './utils';
import { BASE_URL } from './api';

class Detail {
  constructor({$target, userData = null}) {
    this.$target = $target;
    this.userData = userData;
    this.userId = userData ? userData.userId : null;
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
    const bookmark = this.$target.querySelector(".bookmark-icon");

    joinButton.addEventListener("click", () => {
      if (!this.userId) {
        window.location.href = './login.html';
      } else {
        const isJoin = this.data.participants.find(id => id === this.userId);
        if (isJoin) {
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
        const result = await fetch(`${BASE_URL}/study/join`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer${Auth.getToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({studyId: localStorage.getItem('detailPageId')})
        });
        console.log(result)
        if (result.status === 200) {
          alert('참여 되었습니다.');
          window.location.reload();
        } else {
          console.error('스터디 참여 에러');
        }
      }

      if (event.target.className === cancel) {
        modal.classList.toggle("on");
      }
    });

    bookmark.addEventListener('click', async () => {
      if (bookmark.classList.contains('far')) {
        if (!this.userId) {
          window.location.href = './login.html';
        }
        
        const result = await fetch(`${BASE_URL}/users/bookmark`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer${Auth.getToken()}`,
          },
          body: JSON.stringify({
            studyId: (localStorage.getItem("detailPageId")),
          }),
        });

        if (result.status === 201) {
          this.$target.querySelector(
            ".icon-box"
          ).innerHTML = `<i class="fas fa-bookmark bookmark-icon"></i>`;
        } else {
          console.error('북마크 등록 에러');
        }
      } else {
        alert('북마크 해제 기능은 추가될 예정입니다!');
      }
    })
  }

  render() {
    const pageId = localStorage.getItem('detailPageId');
    const isJoin = this.data.participants.find(id => id === this.userId);
    const onBookmark = !this.userId ? false : (this.userData.bookmark.find(id => id === pageId) ? true : false);
    
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
        <div class="study-control">
          ${
            isJoin
              ? `<button class="join-study">참여 중</button>`
              : `<button class="join-study">참여하기</button>`
          }
          ${
            this.userId && this.userId === this.data.creator._id
            ? `<button class="edit-study"><a href="./edit.html">수정하기</a></button>`
            : ''
          }
        </div>
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
    userData: userData.isLoggedIn ? userData : null
  });
}

detail();