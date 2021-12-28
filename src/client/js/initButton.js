export default class InitButton {
  constructor({$target, initFilter, initCard}) {
    this.$target = $target;

    this.$target.addEventListener('click', () => {
      initFilter();
      initCard();
    })
  }
}
