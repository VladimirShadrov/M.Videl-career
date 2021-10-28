export class RetailAdvantages {
  constructor(el) {
    this.el = el;

    if (!this.el) return;

    this.advantagesNumbers = this.el.querySelectorAll(
      '.retail__advantages-number'
    );
  }
  changeBrandColor(currentBrend) {
    if (currentBrend === 0) {
      this.advantagesNumbers.forEach((number) => {
        number.style.color = '#E31235';
      });
    } else {
      this.advantagesNumbers.forEach((number) => {
        number.style.color = '#76BC21';
      });
    }
  }
}
