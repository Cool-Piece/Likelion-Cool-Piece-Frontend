export default class Search {
  #onSearch = null;

  constructor({$target, onSearch}) {
    this.$target = $target;
    this.#onSearch = onSearch;
    this.initEvent();
  }

  initEvent() {
    this.$target.addEventListener("keydown", event => {
      if(event.key === "Enter") {
        const searchData = this.$target.value;
        if(this.#validateSearch(searchData)) {
          this.#onSearch(searchData);
          this.$target.value = "";
        }
      }
    })
  }

  #validateSearch(value) {
    if (value.length < 2) {
      alert("최소 2글자 이상의 키워드를 입력해주세요.");
      return false;
    } else {
      return true;
    }
  }
}