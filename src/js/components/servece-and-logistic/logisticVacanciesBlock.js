import { VacancyBlockFunctional } from '../../helpers/vacancyBlockFunctional';

export class LogisticPageVacanciesBlock {
  constructor(className) {
    this.el = document.querySelector(className);

    if (!this.el) return;

    this.vacancyItemClassName = 'retail__position-list-item';
    this.vacancyButtonClassName = 'retail__position-item-button';
    this.flyout = document.querySelector('.flyout');

    if (this.el && this.flyout) {
      new VacancyBlockFunctional(
        this.el,
        this.vacancyItemClassName,
        this.vacancyButtonClassName,
        this.flyout
      );
    }
  }
}
