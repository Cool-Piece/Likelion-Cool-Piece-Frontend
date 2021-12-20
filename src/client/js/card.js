import CardModel from './cardData';

export default class Card {
  #data = [];
  #viewData = [];
  #cardModel = null;

  constructor({$target, initRenderData}) {
    this.$target = $target;
    this.#cardModel = new CardModel();
    this.#data = this.#cardModel.getCardData();    
    this.#initAddEvents();
    this.onFilter(initRenderData);
  }

  #initAddEvents() {
    this.$target.addEventListener("click", event => {
      const studyItem = event.target.closest(".studyItem");
      if (studyItem?.contains(event.target)) {
        this.#routeToPath(studyItem.id);
      }
    })
  }

  #routeToPath(path) {
    // TODO: route 처리하기
  }

  onFilter(filterData) {
    if (filterData.selectedItems.length == 0) {
      this.#setState(this.#data);
    } else {
      let result = [];

      this.#data.forEach(cardData => {
        let include = false;
        for(let cardSkill of cardData.skills) {
          if (filterData.selectedItems.includes(cardSkill)) {
            include = true;
            break;
          }
        }
        if (include) {
          result.push(cardData);
        }
      })
      
      this.#setState(result);
    }
  }

  #setState(nextState) {
    this.#viewData = nextState;
    this.#render();
  }

  #render() {
    this.$target.innerHTML = this.#viewData.map(card => {
      return `
        <li class="studyItem" title="클릭시 해당 스터디의 상세페이지로 이동합니다." id=${card.id}>
          <h3 class="studyItem-title">${card.title}</h3>
          <div class="studyItem-like">
            <!-- <img src="" alt="클릭시 해당 스터디를 관심목록에 추가합니다.">
            <img src="" alt="클릭시 해당 스터디를 관심목록에서 제거합니다."> -->
          </div>
          <div class="studyItem-term">${card.start_date} ~ ${card.due_date}(진행 기간)</div>
          <div class="studyItem-participants">${card.participant.length} / ${card.total}</div>
          <ul class="studyItem-stacks">
            ${card.skills.map(skill => {
              return `<li>${skill}</li>`
            }).join("")}
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