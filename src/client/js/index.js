import "regenerator-runtime";
import "../scss/styles.scss";
import Category from "./category.js";
import FloatingButton from "./floatingButton.js";
import InitButton from "./initButton.js";
import Card from "./card.js";
import Search from "./search.js";
import NavBar from "./navbar.js";
import Auth from "./auth.js";

class Main {
  $floatingButton = null;
  constructor({$target, userId}) {
    this.$target = $target;
    this.userId = userId;

    this.$initButton = new InitButton({
      $target: this.$target.querySelector(".initButton"),
      initFilter: () => this.$category.initialize(),
      initCard: () => this.$card.initialize(),
    });

    this.$category = new Category({
      $target: this.$target.querySelector(".categoryList"),
      onFilter: (filterData) => this.$card.onFilter(filterData),
    });

    this.$card = new Card({
      $target: this.$target.querySelector(".studyList"),
      initFilterData: this.$category.getSelectedCategory(),
      userId: this.userId
    });

    this.$search = new Search({
      $target: document.querySelector(".searchBar-input"),
      onSearch: (keyword) => this.$card.onSearch(keyword),
    });

    const floatingButton = new FloatingButton().getButton();
    floatingButton.className = "floatingButton";
  }
}

const main = async () => {
  const userData = await Auth.getUserData();
  new NavBar({
    $target: document.querySelector(".navbar-list"),
    userData: userData.isLoggedIn ? userData : null,
  });
  new Main({
    $target: document.querySelector(".main-wrap"),
    userData: userData.isLoggedIn ? userData.userId : null,
  });
};
main();
