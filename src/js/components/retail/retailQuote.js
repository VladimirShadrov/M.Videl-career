export class RetailQuote {
  constructor(el) {
    this.el = el;

    if (!this.el) return;

    this.mvideo = this.el.querySelector('.mvideo');
    this.eldorado = this.el.querySelector('.eldorado');
  }
  switchTab(currentBrand) {
    if (currentBrand === 0) {
      this.mvideo.classList.remove('hide');
      this.eldorado.classList.add('hide');
    }

    if (currentBrand === 1) {
      this.mvideo.classList.add('hide');
      this.eldorado.classList.remove('hide');
    }
  }
}
