import CommentModel from './commentModel';

export default class Comment {
  data;
  constructor({ $target, initData }) {
    this.$target = $target;
    this.$comments = $target.querySelector(".comment-lists");
    this.CommentModel = new CommentModel();
    this.initAddEvent();
    this.setState(initData);
  }

  initAddEvent() {
    const enrollButton = this.$target.querySelector(".enrollment");
    const commentInput = this.$target.querySelector(".comment-box");
    enrollButton.addEventListener("click", () => {
      this.addComment(commentInput.value);
    });
  }

  addComment(description) {
    this.CommentModel.addComment(description);
    // TODO: 서버 받은 결과값에 맞춰서 댓글 리렌더링 작업
  }

  editCommit() {
    // TODO: 로그인 연동후 댓글 수정 작업
  }

  deleteCommit() {
    // TODO: 로그인 연동후 댓글 삭제 작업
  }

  setState(nextState) {
    this.data = nextState;
    this.render();
  }

  render() {
    this.$comments.innerHTML = this.data
      .map((comment) => {
        return `
        <li class="comment-item" id=${comment.id}>
          <section class="comment-header">
            <div class="user-info">
              <div class="image-wrap">
                <img src=${comment.user.avatar_url} alt="${comment.creator}의 프로필 이미지입니다.">
              </div>
              <p>${comment.user.creator}</p>
              <p>${comment.createdAt}</p>
            </div>
            <div class="comment-control">
              <a href="#">수정</a>
              <a href="#">삭제</a>
            </div>
          </section>
          <section class="user-comment">${comment.description}</section>
        </li>
      `;
      })
      .join("");
  }
}