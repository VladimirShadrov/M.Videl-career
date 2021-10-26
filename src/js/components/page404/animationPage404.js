export class Page404 {
  constructor(el) {
    this.el = el;

    if (!this.el) return;

    this.backgroundRow = this.el.querySelector('.page-404__background-row');
    this.backgroundSlides = this.el.querySelectorAll(
      '.page-404__background-item'
    );
  }
}
