export class RetailInternshipBlock {
  constructor(className) {
    this.el = document.querySelector(className);

    if (!this.el) return;

    this.mvideoFromInternshipPage = Array.from(
      this.el.querySelectorAll('.mvideo')
    );
    this.eldoradoFromInternshipPage = Array.from(
      this.el.querySelectorAll('.eldorado')
    );
  }
}
