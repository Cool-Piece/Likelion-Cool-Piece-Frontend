import Auth from './auth';

export default class CommentModel {
  constructor() {
    this.detailPageID = localStorage.getItem('detailPageId');
  }

  // notify: 아직 로그인 연동 안해놔서 userId 는 제 id를 임의로 사용합니다
  async addComment(description) {
    if (description.length < 4) {
      alert('최소 4글자 이상 입력해주세요');
      return;
    }

    const result = await fetch(
      `http://localhost:5000/users/comment/${this.detailPageID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer${Auth.getToken()}`
        },
        body: JSON.stringify({
          userId: "61cfd18ee412cc9d58e5c77b",
          description
        }),
      }
    )
    .then(res => res.json())
    .then(res => res);
    
    // notify: 테스트하실때 활용해주세요
    console.log("addComment 결과 => ", result);
  }

  // TODO: 유저 로그인 정보를 통해 해당 이벤트를 걸어줘야함
  // 아직 테스트 불가 (단, 로직은 같음)
  async editComment(description, id) {
    const result = await fetch(
      `http://localhost:5000/users/comment/${this.detailPageID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer${Auth.getToken()}`,
        },
        body: JSON.stringify({
          userId: "61cfd18ee412cc9d58e5c77b",
          description,
          commentId: id
        }),
      }
    );
  }

  async deleteComment(id) {
    const result = await fetch(
      `http://localhost:5000/users/comment/${this.detailPageID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer${Auth.getToken()}`,
        },
        body: JSON.stringify({
          userId: "61cfd18ee412cc9d58e5c77b",
          commentId: id
        }),
      }
    );
  }

  getComment() {
    return this.data;
  }
}