import Auth from './auth';
import {getFetcher} from './api';

export default class CommentModel {
  constructor() {
    this.detailPageID = localStorage.getItem('detailPageId');
  }

  async addComment(content) {
    if (content.length < 4) {
      alert('최소 4글자 이상 입력해주세요');
      return;
    }

    const result = await fetch(
      `http://localhost:5000/users/comments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer${Auth.getToken()}`
        },
        body: JSON.stringify({
          content,
          studyId: this.detailPageID
        }),
      }
    ).then(res => {
      if(res.status === 201) {
        return res.json();
      } else {
        return new Error('댓글 추가 에러');
      }
    }).catch(err => console.error(err));

    if (result.message === "success to add comment") {
      return getFetcher(this.detailPageID);
    }
  }

  async editComment(contents, id) {
    const result = await fetch(
      `http://localhost:5000/users/comments/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer${Auth.getToken()}`,
        },
        body: JSON.stringify({
          contents,
          studyId: this.detailPageID
        }),
      }
    )

    if (result.status === 200) {
      return true;
    } else {
      console.error('댓글 수정 에러');
      return false;
    }
  }

  async deleteComment(id) {
    const result = await fetch(
      `http://localhost:5000/users/comments/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer${Auth.getToken()}`,
        },
        body: JSON.stringify({
          studyId: this.detailPageID
        }),
      }
    )
    
    if (result.status === 200) {
      return true;
    } else {
      console.error('댓글 삭제 에러');
      return false;
    }
  }

  getComment() {
    return this.data;
  }
}