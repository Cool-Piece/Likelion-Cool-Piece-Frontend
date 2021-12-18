import { fetchCategory } from './api';

export default class CategoryData {
  #data = [];

  constructor(){
    this.#setState([
      "JavaScript",
      "NodeJs",
      "NextJs",
      "HTML5",
      "CSS3",
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

  // async #fetchData(){
  //   return await fetchCategory()
  //   .then(res => {
  //     this.#setState(res);
  //   })
  // }
}