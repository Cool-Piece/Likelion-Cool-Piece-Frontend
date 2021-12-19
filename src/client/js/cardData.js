import { fetchCard } from "./api.js";

const studyData = {
  title: "우리 소통잘하고 플젝 잘 끝내자 120명에 당당하게 서비스 선보이자",
  creator: "멋피스",
  createdAt: "2021-12-18",
  total: 6,
  start_date: "2021-12-20",
  due_date: "2021-12-25",
  skills: ["javascript", "html", "css"],
  participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
}

export default class CardModel {
  #data = [];

  constructor() {
    this.#setState(Array(10).fill().map((_, index) => {
      return {...studyData, id: index};
    }))
  }

  #setState(nextState) {
    this.#data = nextState;
  }

  getCardData() {
    return this.#data;
  }
}