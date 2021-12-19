import CardModel from './cardData';

export default class Card {
  #data = [];
  #cardModel = null;

  constructor($target) {
    this.$target = $target;
    this.#cardModel = new CardModel();
    this.#data = this.#cardModel.getCardData();
    
    this.#initAddEvents();
    this.#render();
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
    // TODO: host + path 로 routing!
  }

  #render() {
    this.$target.innerHTML = this.#data.map(card => {
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