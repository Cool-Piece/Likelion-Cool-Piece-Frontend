import "../scss/styles.scss";
import Category from "./category.js";
import FloatingButton from "./floatingButton.js";
import InitButton from "./initButton.js";
import Card from "./card.js";
import Search from './search.js';
import {BASE_URL} from './api.js'

class Main {
  $floatingButton = null;
  constructor($target) {
    this.$target = $target;

    this.$initButton = new InitButton({
      $target: this.$target.querySelector(".initButton"),
      initFilter: () => this.$category.initialize(),
      initCard: () => this.$card.initialize(),
    });

    this.$category = new Category({
      $target: this.$target.querySelector(".categoryList"),
      onFilter: (filterData) => this.$card.onFilter(filterData)
    });
  
    this.$card = new Card({
      $target: this.$target.querySelector(".studyList"),
      initFilterData: this.$category.getSelectedCategory()
    });

    this.$search = new Search({
      $target: document.querySelector(".searchBar-input"),
      onSearch: (keyword) => this.$card.onSearch(keyword)
    })

    const floatingButton = new FloatingButton().getButton();
    floatingButton.className = "floatingButton";
  }
}

new Main(document.querySelector('.main-wrap'));