import { fetchCard } from "./api.js";

export default class CardModel {
  #data = [];

  constructor() {
    this.#setState(dummyData);
  }

  #setState(nextState) {
    this.#data = nextState;
  }

  getCardData() {
    return this.#data;
  }
}

const dummyData = [
  {
    title: "빡고수 한별님의 스터디",
    creator: "멋피스",
    createdAt: "2021-12-18",
    total: 6,
    start_date: "2021-12-20",
    due_date: "2021-12-25",
    participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
    skills: ["JavaScript"],
  },
  {
    title: "빡고수 지윤님의 스터디",
    creator: "멋피스",
    createdAt: "2021-12-18",
    total: 6,
    start_date: "2021-12-20",
    due_date: "2021-12-25",
    participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
    skills: ["JavaScript", "CSS"],
  },
  {
    title: "무뇌 김준호의 스터디",
    creator: "멋피스",
    createdAt: "2021-12-18",
    total: 6,
    start_date: "2021-12-20",
    due_date: "2021-12-25",
    participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
    skills: ["React", "NodeJS"],
  },
  {
    title: "빡고수 한별님의 스터디2",
    creator: "멋피스",
    createdAt: "2021-12-18",
    total: 6,
    start_date: "2021-12-20",
    due_date: "2021-12-25",
    participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
    skills: ["React", "NextJS"],
  },
  {
    title: "빡고수 한별님의 스터디3",
    creator: "멋피스",
    createdAt: "2021-12-18",
    total: 6,
    start_date: "2021-12-20",
    due_date: "2021-12-25",
    participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
    skills: ["VueJS", "CSS", "HTML"],
  },
  {
    title: "빡고수 지윤님의 스터디2",
    creator: "멋피스",
    createdAt: "2021-12-18",
    total: 6,
    start_date: "2021-12-20",
    due_date: "2021-12-25",
    participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
    skills: ["CSS", "JavaScript", "Vuex"],
  },
  {
    title: "빡고수 지윤님의 스터디3",
    creator: "멋피스",
    createdAt: "2021-12-18",
    total: 6,
    start_date: "2021-12-20",
    due_date: "2021-12-25",
    participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
    skills: ["JavaScript", "React", "Redux", "Redux-saga"],
  },
  {
    title: "청강 달인 김준호의 스터디",
    creator: "멋피스",
    createdAt: "2021-12-18",
    total: 6,
    start_date: "2021-12-20",
    due_date: "2021-12-25",
    participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
    skills: ["NextJS"],
  }
]