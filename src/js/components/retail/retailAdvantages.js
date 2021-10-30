export class RetailAdvantagesBlock {
  constructor(className) {
    this.el = document.querySelector(className);

    if (!this.el) return;

    this.mvideoFromRetailAdvantages = Array.from(
      this.el.querySelectorAll('.mvideo')
    );
    this.eldoradoFromRetailAdvantages = Array.from(
      this.el.querySelectorAll('.eldorado')
    );
  }
}
