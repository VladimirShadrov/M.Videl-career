import { SmothScrollingToTargetBlock } from '../../helpers/smoothScrolling';

export class FirstScreenBlock {
  constructor(className) {
    this.el = document.querySelector(className);

    if (!this.el) return;

    this.targetBlock = document.querySelector('.logistic-career');
    this.header = document.querySelector('.it-header');
    this.buttonLearnMore = this.el.querySelector('.logistic-stage__button');

    if (this.targetBlock && this.header) {
      const scrollFunctional = new SmothScrollingToTargetBlock(
        this.targetBlock,
        this.header
      );

      this.buttonLearnMore.addEventListener(
        'click',
        scrollFunctional.scrollToTargetBlock.bind(this)
      );
    }
  }
}
