import { smothScrollingToBlock } from '../../index';
import { retailMissionBlock } from '../../index';
import { headerItPage } from '../../index';

export class CreateRetailFutureComponent {
  constructor(el) {
    this.el = el;

    if (!this.el) return;

    this.scrollButton = this.el.querySelector('.retail__preview-button');

    this.scrollButton.addEventListener(
      'click',
      this.scrollToNextBlock.bind(this)
    );
  }
  scrollToNextBlock() {
    smothScrollingToBlock(retailMissionBlock, headerItPage);
  }
}
