export default class InitButton {
  constructor({$target, initFilter, initCard}) {
    this.$target = $target;
    const button = document.createElement("button");
    button.textContent = "초기화하기!!!!";
    button.style.cssText = "border:none; margin-top: 10px;"
    button.addEventListener('click', () => {
      initFilter();
      initCard();
    })

    this.$target.appendChild(button);
  }
}