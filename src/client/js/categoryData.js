export default class CategoryData {
  #data = [];

  constructor(){
    this.#setState([
      "JavaScript",
      "NodeJS",
      "NextJS",
      "HTML",
      "CSS",
      "ReactJS",
      "Redux",
      "Redux-saga",
			"VueJS",
			"Vuex"
    ]);

    // TODO: 서버로 데이터 초기화
    // this.#setState(this.#fetchData());
  }

  #setState(nextData) {
    this.#data = nextData;
  }

  getData(){
    return this.#data;
  }
}