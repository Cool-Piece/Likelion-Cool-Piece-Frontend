import "../scss/styles.scss";
import Category from "./category.js";
import FloatingButton from "./floatingButton.js";
import Card from "./card.js";

class Main {
  $floatingButton = null;
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

    const floatingButton = new FloatingButton().getButton();
    floatingButton.className = "main_floatingButton";
  }
}

new Main(document.querySelector('.main-wrap'))