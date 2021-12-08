// При инициализации в конструктор класса нужно передать:
// -Корневой элемент;
// -Имя класса элемента вакансии;
// -Имя класса кнопки "Больше о направлении", которая находится внутри элемента вакансии
// -Флайаут

import { FlyoutFunctional } from '../helpers/flyout';

export class VacancyBlockFunctional {
  constructor(el, vacancyItemClassName, vacancyButtonClassName, flyout) {
    this.el = el;
    this.vacancyItemClassName = vacancyItemClassName;
    this.vacancyButtonClassName = vacancyButtonClassName;
    this.flyout = flyout;
    this.vacancyItems = [];

    this.flyoutInstance = new FlyoutFunctional(this.flyout);

    this.el.addEventListener('mouseover', this.getVacancyItems.bind(this));
  }
  getVacancyItems(event) {
    if (event.target.classList.contains(this.vacancyItemClassName)) {
      this.vacancyItems = this.el.querySelectorAll(
        '.' + this.vacancyItemClassName
      );
      this.showButtonMoreAboutDirection(this.vacancyItems);
    }
  }

  showButtonMoreAboutDirection(vacancyList) {
    const buttonOffsetY = 15;
    const buttonOffsetX = 30;

    vacancyList.forEach((vacancyItem) => {
      vacancyItem.addEventListener('mousemove', (event) => {
        const button = event.target.querySelector(
          '.' + this.vacancyButtonClassName
        );
        button.style.top = event.layerY - buttonOffsetY + 'px';
        button.style.left = event.layerX - buttonOffsetX + 'px';
      });
    });

    this.vacancyItems.forEach((vacancyItem) =>
      vacancyItem.addEventListener('click', this.openFlyout.bind(this))
    );
  }

  openFlyout() {
    this.flyoutInstance.openFlyout();

    if (this.flyout.classList.contains('flyout__active')) {
      this.flyoutInstance.playFlyoutVideo();
    }
  }
}
