export class RetailQuoteBlock {
  constructor(className) {
    this.el = document.querySelector(className);

    if (!this.el) return;

    this.mvideoFromQuoteBlock = Array.from(this.el.querySelectorAll('.mvideo'));
    this.eldoradoFromQuoteBlock = Array.from(
      this.el.querySelectorAll('.eldorado')
    );
  }
}
