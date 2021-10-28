export class RetailInternship {
  constructor(el) {
    this.el = el;

    if (!this.el) return;

    this.mvideoIcon = this.el.querySelector(
      '.retail__internship-shop-icon-mvideo'
    );
    this.eldoradoIcon = this.el.querySelector(
      '.retail__internship-shop-icon-eldorado'
    );
    this.mvideo = this.el.querySelector('.mvideo');
    this.eldorado = this.el.querySelector('.eldorado');
  }
  changeIcon(currentBrand) {
    if (currentBrand === 0) {
      this.mvideoIcon.classList.add('retail__internship-icon-active');
      this.mvideo.classList.remove('hide');
      this.eldoradoIcon.classList.remove('retail__internship-icon-active');
      this.eldorado.classList.add('hide');
    }

    if (currentBrand === 1) {
      this.mvideoIcon.classList.remove('retail__internship-icon-active');
      this.mvideo.classList.add('hide');
      this.eldoradoIcon.classList.add('retail__internship-icon-active');
      this.eldorado.classList.remove('hide');
    }
  }
}
