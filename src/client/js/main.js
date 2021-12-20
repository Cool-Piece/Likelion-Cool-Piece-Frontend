import "../scss/styles.scss";
import Category from "./category.js";
import FloatingButton from "./floatingButton.js";
import Card from "./card.js";

class Main {

  constructor($target) {
    this.$target = $target;

    this.$category = new Category({
      $target: this.$target.querySelector(".categoryList"),
      onFilter: (filterData) => this.$card.onFilter(filterData)
    });
  
    this.$card = new Card({
      $target: this.$target.querySelector(".studyList"),
      initRenderData: this.$category.getSelectedCategory()
    });

  }

  // TODO: 플로팅버튼 Fix 수정
  // addFloatingButton() {
  //   if(document.querySelector(".main-wrap section").scrollHeight > window.innerHeight - 359) {
  //     const floatingButton = new FloatingButton().getButton();
  //     floatingButton.className = "main_floatingButton";
  //     document.querySelector("body").appendChild(floatingButton);
    
  //     floatingButton.addEventListener('click', () => {
  //       if(e.currentTarget === floatingButton) {
  //         document.scrollingElement.scrollTo(0, 0);
  //       }
  //     })
    
  //     // Refactor: 성능 개선
  //     document.addEventListener('scroll', () => {
  //       if(document.scrollingElement.scrollTop === 0) floatingButton.style.visibility = 'hidden';
  //       else floatingButton.style.visibility = 'visible';
  //     });
  //   }
  // }
}

new Main(document.querySelector(".main-wrap"));