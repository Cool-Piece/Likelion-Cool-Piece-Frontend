
export default class CardModel {
  data = [];

  constructor() {
    this.setState(dummyData);
  }

  setState(nextState) {
    this.data = nextState;
  }

  getCardData() {
    return this.data;
  }
}

const dummyData = [
  {
    title: "백엔드마스터 한별님, 프론트마스터 지윤님에게 버스받으실 2명 구합니다.",
    creator: "멋피스",
    createdAt: "2021-12-18",
    total: 6,
    start_date: "2021-12-20",
    due_date: "2021-12-25",
    participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
    skills: ["JavaScript"],
    study_status: true,
    study_type: 'study'
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
    study_status: false,
    study_type: 'study'
  },
  {
    title: "무뇌 김준호의 프로젝트",
    creator: "멋피스",
    createdAt: "2021-12-18",
    total: 6,
    start_date: "2021-12-20",
    due_date: "2021-12-25",
    participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
    skills: ["ReactJS", "NodeJS"],
    study_status: true,
    study_type: 'project'
  },
  {
    title: "빡고수 한별님의 스터디2",
    creator: "멋피스",
    createdAt: "2021-12-18",
    total: 6,
    start_date: "2021-12-20",
    due_date: "2021-12-25",
    participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
    skills: ["ReactJS", "NextJS"],
    study_status: true,
    study_type: 'study'
  },
  {
    title: "빡고수 한별님의 프로젝트3",
    creator: "멋피스",
    createdAt: "2021-12-18",
    total: 6,
    start_date: "2021-12-20",
    due_date: "2021-12-25",
    participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
    skills: ["VueJS", "CSS", "HTML"],
    study_status: true,
    study_type: 'project'
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
    study_status: false,
    study_type: 'study'
  },
  {
    title: "빡고수 지윤님의 프로젝트3",
    creator: "멋피스",
    createdAt: "2021-12-18",
    total: 6,
    start_date: "2021-12-20",
    due_date: "2021-12-25",
    participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
    skills: ["JavaScript", "ReactJS", "Redux", "Redux-saga"],
    study_status: false,
    study_type: 'project'
  },
  {
    title: "청강 달인 김준호의 프로젝트",
    creator: "멋피스",
    createdAt: "2021-12-18",
    total: 6,
    start_date: "2021-12-20",
    due_date: "2021-12-25",
    participant: ["리액션 짱 박지윤", "면접선배 임관식 쩔어", "집중쩔어 김준호", "빡고수 별님"],
    skills: ["NextJS"],
    study_status: true,
    study_type: 'project'
  }
]
