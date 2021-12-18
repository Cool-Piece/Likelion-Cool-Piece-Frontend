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
  }

  getButton() {
    return this.#floatingButton;
  }
}