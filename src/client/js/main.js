import "../scss/styles.scss";
import Category from "./category.js";
import FloatingButton from "./floatingButton.js";

const categoryComponent = new Category(document.querySelector(".categoryList"));

if(document.querySelector(".main-wrap section").scrollHeight > window.innerHeight - 359) {
  const floatingButton = new FloatingButton().getButton();
  floatingButton.className = "main_floatingButton";
  document.querySelector("body").appendChild(floatingButton);
  
  // Refactor: 성능 개선
  document.addEventListener('scroll', e => {
    if(document.scrollingElement.scrollTop === 0) floatingButton.style.visibility = 'hidden';
    else floatingButton.style.visibility = 'visible';
  });
}
