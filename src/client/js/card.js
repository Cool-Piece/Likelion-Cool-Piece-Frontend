import CardModel from './cardData';
import { 
  CARD_VIEW_TYPE_SEARCH,
  CARD_VIEW_TYPE_DEFAULT,
  CARD_VIEW_TYPE,
  SEARCH_KEYWORD,
  CARD_VIEW_LAST_UPDATE,
  MAX_TIME
} from './constant';
import { useFilterData, useSearchData } from './utils';

export default class Card {
  #data;
  #viewData;
  #cardModel;
  #viewType;
  #searchData;
  #filterData;

  constructor({$target, initFilterData}) {
    this.$target = $target;
    this.#cardModel = new CardModel();
    this.#data = this.#cardModel.getCardData();    
    this.#filterData = initFilterData;
    this.#initAddEvents();
    this.#initState();
  }

  initialize() {
    this.#viewType = CARD_VIEW_TYPE_DEFAULT;
    localStorage.setItem(CARD_VIEW_TYPE, CARD_VIEW_TYPE_DEFAULT);
    this.#setState(this.#data);
  }

  #initAddEvents() {
    this.$target.addEventListener("click", event => {
      const studyItem = event.target.closest(".studyItem");
      if (studyItem?.contains(event.target)) {
        this.#routeToPath(studyItem.id);
      }
    })
  }

  #initState() {
    let prevDate, currentDate, basedStateType;
    
    basedStateType = localStorage.getItem(CARD_VIEW_TYPE);
    if (!basedStateType) {
      basedStateType = CARD_VIEW_TYPE_DEFAULT;
      localStorage.setItem(CARD_VIEW_TYPE, CARD_VIEW_TYPE_DEFAULT);
    }

    prevDate = localStorage.getItem(CARD_VIEW_LAST_UPDATE);
    if (!prevDate) {
      prevDate = new Date();
    }
    currentDate = new Date();

    if (currentDate - prevDate >= MAX_TIME) {
      basedStateType = CARD_VIEW_TYPE_DEFAULT;
      localStorage.setItem(CARD_VIEW_TYPE, CARD_VIEW_TYPE_DEFAULT);
    }

    this.#viewType = basedStateType;
    if (this.#viewType === CARD_VIEW_TYPE_SEARCH) {
      const prevSearchKeyword = localStorage.getItem(SEARCH_KEYWORD);
      this.onSearch(prevSearchKeyword);
    } else {
      this.onFilter();
    }
  }

  #routeToPath(path) {
    // TODO: route 처리하기
  }

  onSearch(keyword) {
    this.#viewType = CARD_VIEW_TYPE_SEARCH;
    localStorage.setItem(SEARCH_KEYWORD, keyword);
    localStorage.setItem(CARD_VIEW_TYPE, CARD_VIEW_TYPE_SEARCH);
    
    this.#searchData = useSearchData(keyword, this.#data);
    this.onFilter();
  }

  onFilter(filterData = null) {
    if (filterData) {
      this.#filterData = filterData;
    }

    if (this.#viewType === CARD_VIEW_TYPE_DEFAULT) {
      this.#setState(useFilterData(this.#filterData, this.#data));
    } else {
      this.#setState(useFilterData(this.#filterData, this.#searchData));
    }
    localStorage.setItem(CARD_VIEW_LAST_UPDATE, new Date());
  }

  #setState(nextState) {
    this.#viewData = nextState;
    this.#render();
  }

  #render() {
    const viewSkillCnt = window.innerWidth <= 414 ? 3 : 4;

    this.$target.innerHTML = this.#viewData.map(card => {
      return `
        <li class="studyItem" title="클릭시 해당 스터디의 상세페이지로 이동합니다." id=${card.id}>
          <h3 class="studyItem-title">${card.title}</h3>
          <div class="studyItem-like">
            <!-- <img src="" alt="클릭시 해당 스터디를 관심목록에 추가합니다.">
            <img src="" alt="클릭시 해당 스터디를 관심목록에서 제거합니다."> -->
          </div>
          <div class="studyItem-term">${card.start_date} ~ ${card.due_date}</div>
          <div class="studyItem-participants">${card.participant.length}명 / ${card.total}명</div>
          <ul class="studyItem-stacks">
            ${card.skills.slice(0, viewSkillCnt).map(skill => {
              return `<li>${skill}</li>`
            }).join("")}
            ${viewSkillCnt < card.skills.length 
              ? (`<span class="studyItem-stacks-hidden">+${card.skills.length - viewSkillCnt}</span>`)
              : ""}
          </ul>
          <dl class="studyItem-creator">
            <dt>${card.creator}</dt>
            <dd>${card.createdAt}</dd>
          </dl>
        </li>
      `
    }).join("");
  }
}