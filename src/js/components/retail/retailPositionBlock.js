export class RetailPosition {
  constructor(el) {
    this.el = el;

    if (!this.el) return;

    this.vacancyItems = [];
    this.mvideo = this.el.querySelectorAll('.mvideo');
    this.eldorado = this.el.querySelectorAll('.eldorado');

    this.el.addEventListener('mouseover', this.getVacancyItems.bind(this));
  }
  getVacancyItems(event) {
    if (event.target.classList.contains('retail__position-list-item')) {
      this.vacancyItems = this.el.querySelectorAll(
        '.retail__position-list-item'
      );
      this.showButtonMoreAboutDirection(this.vacancyItems);
    }
  }

  showButtonMoreAboutDirection(vacancyCollection) {
    vacancyCollection.forEach((item) => {
      item.addEventListener('mousemove', (event) => {
        const button = event.target.querySelector(
          '.retail__position-item-button'
        );
        button.style.top = event.layerY - 15 + 'px';
        button.style.left = event.layerX - 30 + 'px';
      });
    });
  }

  switchBrand(currentBrand) {
    if (currentBrand === 0) {
      this.mvideo.forEach((item) => item.classList.remove('hide'));
      this.eldorado.forEach((item) => item.classList.add('hide'));
    }

    if (currentBrand === 1) {
      this.mvideo.forEach((item) => item.classList.add('hide'));
      this.eldorado.forEach((item) => item.classList.remove('hide'));
    }
  }
}
