import SpinnerSrc from "../assets/image/loading_spinner.gif";
export default class Spinner {
  constructor($target) {
    this.spinner = document.createElement('div');
    this.spinner.style.cssText = `
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `;
    const spinnerGif = document.createElement('img');
    spinnerGif.src = SpinnerSrc;
    spinnerGif.style.cssText = 'width: 50px; height: 50px;'
    this.spinner.appendChild(spinnerGif);
    $target.appendChild(this.spinner);
  }

  On() {
    this.spinner.style.display = 'block';
  }

  Off() {
    this.spinner.style.display = 'none';
  }
}