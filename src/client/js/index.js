import "regenerator-runtime";
import "../scss/styles.scss";
import Category from "./category.js";
import FloatingButton from "./floatingButton.js";
import InitButton from "./initButton.js";
import Card from "./card.js";
import Search from './search.js';
import NavMenu from './nav.js';
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
      onFilter: (filterData) => this.$card.onFilter(filterData),
    });

    this.$card = new Card({
      $target: this.$target.querySelector(".studyList"),
      initFilterData: this.$category.getSelectedCategory(),
    });

    this.$search = new Search({
      $target: document.querySelector(".searchBar-input"),
      onSearch: (keyword) => this.$card.onSearch(keyword),
    });

    const floatingButton = new FloatingButton().getButton();
    floatingButton.className = "floatingButton";
  }
}

new Main(document.querySelector(".main-wrap"));

// const sendToken = async () => {
//   const tokenBaseUrl = "https://github.com/login/oauth/access_token";
//   const options = {
//     client_id: process.env.GITHUB_KEY,
//     client_secret: process.env.GITHUB_SECRET,
//     code: new URL(window.location.href).searchParams.get("code"),
//   };

//   const tokenParams = new URLSearchParams(options).toString();
//   const tokenRequestUrl = `${tokenBaseUrl}?${tokenParams}`;
  const test = await fetch(tokenBaseUrl);

  const result = await fetch("http://localhost:5000/users/github/callback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: new URL(window.location.href).searchParams.get("code"),
    }),
  });

//   const userData = await result.json();
//   console.log(userData, "json????/");
// };

// sendToken();
