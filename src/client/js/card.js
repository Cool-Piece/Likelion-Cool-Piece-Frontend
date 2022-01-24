import CardModel from './cardData';
import Spinner from './spinner';
import { 
  CARD_VIEW_TYPES,
  CARD_VIEW_TYPE,
  SEARCH_KEYWORD,
  CARD_VIEW_LAST_UPDATE,
  MAX_TIME
} from './constant';
import { formatDate, useFilterData, useSearchData } from './utils';

export default class Card {
  data;
  viewData;
  cardModel;
  viewType;
  searchData;
  navData;
  filterData;

  constructor({$target, initFilterData, userData = null}) {
    this.$target = $target;
    this.userData = userData
    this.userId = userData ? userData.userId : null;
    this.cardModel = new CardModel();
    this.spinner = new Spinner(this.$target);
    this.spinner.On();
    this.cardModel.getAllData().then(res => {
      this.spinner.Off();
      this.data = res;
      this.filterData = initFilterData;
      this.initAddEvents();
      this.initState();
    });
  }

  initialize() {
    this.viewType = CARD_VIEW_TYPES.DEFAULT;
    localStorage.setItem(CARD_VIEW_TYPE, CARD_VIEW_TYPES.DEFAULT);
    this.setState(this.data);
  }

  initAddEvents() {
    this.$target.addEventListener("click", event => {
      const studyItem = event.target.closest(".studyItem");
      if (studyItem?.contains(event.target)) {
        this.routeDetailPage(studyItem.id);
      }
    })
  }

  async initState() {
    let prevDate, currentDate, basedStateType;
    
    basedStateType = localStorage.getItem(CARD_VIEW_TYPE);
    if (!basedStateType) {
      basedStateType = CARD_VIEW_TYPES.DEFAULT;
      localStorage.setItem(CARD_VIEW_TYPE, CARD_VIEW_TYPES.DEFAULT);
    }

    prevDate = localStorage.getItem(CARD_VIEW_LAST_UPDATE);
    if (!prevDate) {
      prevDate = new Date();
    }
    currentDate = new Date();

    if (currentDate - prevDate >= MAX_TIME) {
      basedStateType = CARD_VIEW_TYPES.DEFAULT;
      localStorage.setItem(CARD_VIEW_TYPE, CARD_VIEW_TYPES.DEFAULT);
    }

    this.viewType = basedStateType;
    if (this.viewType === CARD_VIEW_TYPES.SEARCH) {
      const prevSearchKeyword = localStorage.getItem(SEARCH_KEYWORD);
      this.onSearch(prevSearchKeyword);
    } else if (this.viewType === CARD_VIEW_TYPES.DEFAULT) {
      this.onFilter();
    } else {
      const navData = await this.cardModel.getNavData(this.viewType);
      this.navData = navData;
      this.onFilter();
    }
  }

  routeDetailPage(id) {
    localStorage.setItem('detailPageId', id);
    let url = window.location.href.split('/');
    url[url.length-1] = 'detail.html';
    url = url.join('/');
    window.location.href = url;
  }

  onSearch(keyword) {
    this.viewType = CARD_VIEW_TYPES.SEARCH;
    localStorage.setItem(SEARCH_KEYWORD, keyword);
    localStorage.setItem(CARD_VIEW_TYPE, CARD_VIEW_TYPES.SEARCH);
    localStorage.setItem(CARD_VIEW_LAST_UPDATE, new Date());
    
    this.searchData = useSearchData(keyword, this.data);
    this.onFilter();
  }

  onFilter(filterData = null) {
    if (filterData) {
      this.filterData = filterData;
    }
    
    if (this.viewType === CARD_VIEW_TYPES.DEFAULT) {
      this.setState(useFilterData(this.filterData, this.data));
    } else if (this.viewType === CARD_VIEW_TYPES.SEARCH) {
      this.setState(useFilterData(this.filterData, this.searchData));
    } else {
      this.setState(useFilterData(this.filterData, this.navData));
    }
    localStorage.setItem(CARD_VIEW_LAST_UPDATE, new Date());
  }

  setState(nextState) {
    this.viewData = nextState;
    this.render();
  }

  render() {
    const viewSkillCnt = window.innerWidth <= 414 ? 3 : 4;
    const emptyElement = document.querySelector('.no_result');

    if (this.viewData.length) {
      emptyElement.style.display = 'none';
    } else {
      emptyElement.style.display = 'block';
    }
    
    this.$target.innerHTML = this.viewData.map(card => {
      const onBookmark = !this.userId ? false : (this.userData.bookmark.find(id => id === card._id) ? true : false);
      return `
        <li class="studyItem"
        title="클릭시 해당 스터디의 상세페이지로 이동합니다."
        id=${card._id
        }>
          <h3 class="studyItem-title">${card.title}</h3>
          <div class="studyItem-like">
            ${onBookmark
              ? `<i class="fas fa-bookmark bookmark-icon"></i>`
              : `<i class="far fa-bookmark bookmark-icon"></i>`
            }
          </div>
          <div class="studyItem-term">
            ${formatDate(card.start_date)} ~ 
            ${formatDate(card.due_date)}
          </div>
          <div class="studyItem-participants">
            ${card.participants.length}명 / 
            ${card.total}명
          </div>
          <ul class="studyItem-stacks">
            ${card.skills.slice(0, viewSkillCnt).map((skill) => {
                return `<li>${skill}</li>`;
              }).join("")}
            ${
              viewSkillCnt < card.skills.length
              ? `<span class="studyItem-stacks-hidden">
                +${card.skills.length - viewSkillCnt}
                </span>`
              : ""
            }
          </ul>
          <dl class="studyItem-creator">
            <dt>${card.creator.username}</dt>
            <dd>${new Date(card.createdAt).toLocaleDateString()}</dd>
          </dl>
        </li>
      `;
    }).join("");
  }
}
