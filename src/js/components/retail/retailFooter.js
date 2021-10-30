export class RetailFooter {
  constructor(className) {
    this.el = document.querySelector(className);

    if (!this.el) return;

    this.mvideoFromFooter = Array.from(
      this.el.querySelectorAll('.retail__footer-title-shop-mvideo')
    );
    this.eldoradoFromFooter = Array.from(
      this.el.querySelectorAll('.retail__footer-title-shop-eldorado')
    );
  }
}
