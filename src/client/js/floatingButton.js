import WrapImg from "../assets/image/floatingWrap.png"
import ArrowImg from "../assets/image/floatingArrow.png"


export default class FloatingButton {
  #floatingButton = null;

  constructor() {
    const floatingButton = document.createElement('div');
    
    const wrap = document.createElement('img');
    const arrow = document.createElement('img');
    wrap.src = WrapImg;
    arrow.src = ArrowImg;
    arrow.className = "floatingArrow";

    floatingButton.appendChild(wrap);
    floatingButton.appendChild(arrow);
    this.#floatingButton = floatingButton;

    this.#floatingButton.addEventListener("click", event => {
      if (event.currentTarget === this.#floatingButton) {
        document.scrollingElement.scrollTo(0, 0);
      }
    })

    document.querySelector("body").appendChild(this.#floatingButton);
    // Refactor: 성능 개선
    document.addEventListener('scroll', () => {
      if (document.scrollingElement.scrollTop === 0) {
        this.#floatingButton.style.visibility = 'hidden';
      } else {
        this.#floatingButton.style.visibility = 'visible';
      }
    });
  }

  getButton() {
    return this.#floatingButton;
  }
}
