import "../scss/styles.scss";
import heart from "../assets/image/heart_icon.png";
import bookmark from "../assets/image/bookmark_icon.png";

const heartIcon = document.querySelector(".heart-icon");
heartIcon.src = heart;

const bookmarkIcon = document.querySelector(".bookmark-icon");
bookmarkIcon.src = bookmark;

const joinButton = document.querySelector(".join-study");
const modal = document.querySelector(".modal");

const displayModal = () => {
  modal.classList.toggle("on");
};

const handleJoinStudy = (event) => {
  const ok = "modal-button yes";
  const cancel = "modal-button no";

  if (event.target.className === ok) {
    //TODO:
    // 1. 페이지를 이동시켜주고
    // 2. 백엔드 db에 참여한다고 해줌.
  }

  if (event.target.className === cancel) {
    displayModal();
  }
};

joinButton.addEventListener("click", displayModal);
modal.addEventListener("click", handleJoinStudy);
