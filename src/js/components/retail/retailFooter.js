export class RetailFooter {
  constructor(el) {
    this.el = el;

    if (!this.el) return;

    this.mvideoTitle = this.el.querySelector(
      '.retail__footer-title-shop-mvideo'
    );
    this.eldoradoTitle = this.el.querySelector(
      '.retail__footer-title-shop-eldorado'
    );
  }
  showActiveBrandTitle(currentBrand) {
    if (currentBrand === 0) {
      this.mvideoTitle.classList.remove('hide');
      this.eldoradoTitle.classList.add('hide');
    }

    if (currentBrand === 1) {
      this.mvideoTitle.classList.add('hide');
      this.eldoradoTitle.classList.remove('hide');
    }
  }
}
