import "../scss/styles.scss";
import Category from "./category.js";
import FloatingButton from "./floatingButton.js";
import Card from "./card.js";

const categoryComponent = new Category(document.querySelector(".categoryList"));

if(document.querySelector(".main-wrap section").scrollHeight > window.innerHeight - 359) {
  const floatingButton = new FloatingButton().getButton();
  floatingButton.className = "main_floatingButton";
  document.querySelector("body").appendChild(floatingButton);

  floatingButton.addEventListener('click', (e) => {
    if(e.currentTarget === floatingButton) {
      document.scrollingElement.scrollTo(0, 0);
    }
  })

  // Refactor: 성능 개선
  document.addEventListener('scroll', e => {
    if(document.scrollingElement.scrollTop === 0) floatingButton.style.visibility = 'hidden';
    else floatingButton.style.visibility = 'visible';
  });
}

const cardListComponent = new Card(document.querySelector(".studyList"));