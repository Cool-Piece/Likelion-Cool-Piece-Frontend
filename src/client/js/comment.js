import CommentModel from './commentModel';
import { formatDate } from './utils';

export default class Comment {
  data;
  constructor({ $target, initData, userId }) {
    this.$target = $target;
    this.userId = userId;
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

    this.$comments.addEventListener('click', event => {
      const commentItem = event.target.closest(".comment-item");

      if (commentItem && commentItem.contains(event.target)) {
        const id = commentItem.id;
        if (event.target.classList.contains('edit')) {
          if (event.target.classList.contains('on')) {
            const editContent = commentItem.querySelector('.edit-comment').value;
            this.editCommit(commentItem, editContent, id);
          } else {
            event.target.classList.toggle('on');
            const userComment = commentItem.querySelector(".user-comment");
            const editComment = commentItem.querySelector(".edit-comment");
            const content = userComment.innerText;
            userComment.classList.toggle('on');
            editComment.classList.toggle('on');
            editComment.value = content;
          }
        } else if (event.target.classList.contains('delete')) {
          this.deleteCommit(id);
        }
      }
    })
  }

  async addComment(content) {
    try {
      if (!this.userId) {
        window.location.href = './login.html';
      }
      const comments = await this.CommentModel.addComment(content);
      if (comments) {
        this.$target.querySelector('.comment-box').value = "";
        this.setState(comments.studyInfo.comments);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async editCommit(element, content, id) {
    try {
      const result = await this.CommentModel.editComment(content, id);
      if (result) {
        const userComment = element.querySelector('.user-comment');
        const editComment = element.querySelector('.edit-comment');
        editComment.classList.toggle("on");
        userComment.classList.toggle("on");
        userComment.innerText = content;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCommit(id) {
    try {
      const result = await this.CommentModel.deleteComment(id);
      if (result) {
        this.setState(this.data.filter(comment => comment._id != id));
      }
    } catch (error) {
      console.error(error);
    }
  }

  setState(nextState) {
    this.data = nextState;
    this.render();
  }

  render() {
    this.$comments.innerHTML = this.data
      .map((comment) => {
        return `
        <li class="comment-item" id=${comment._id}>
          <section class="comment-header">
            <div class="user-info">
              <div class="image-wrap">
                <img src=${comment.creator.avatar_url} alt="${comment.creator.username}의 프로필 이미지입니다.">
              </div>
              <p>${comment.creator.username}</p>
              <p>${formatDate(comment.createdAt)}</p>
            </div>
            <div class="comment-control">
              ${
                this.userId && this.userId === comment.creator._id
                ? `
                  <span class="comment-control edit">수정</span>
                  <span class="comment-control delete">삭제</span>
                ` : ""
              }
            </div>
          </section>
          <section class="user-comment on">${comment.content}</section>
          <textarea class="edit-comment" minlength="1" maxlength="500"></textarea>
        </li>
      `;
      }).join("");    
  }
}