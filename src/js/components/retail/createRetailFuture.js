import { SmothScrollingToTargetBlock } from '../../helpers/smoothScrolling';
export class CreateRetailFutureComponent {
  constructor(className) {
    this.el = document.querySelector(className);

    if (!this.el) return;

    this.scrollButton = this.el.querySelector('.retail__preview-button');
    this.header;
    this.targetBlock;
    this.smothScroll = new SmothScrollingToTargetBlock();

    this.scrollButton.addEventListener(
      'click',
      this.scrollToNextBlock.bind(this)
    );
  }
  registerParameters(header, targetBlock) {
    this.header = header;
    this.targetBlock = targetBlock;
  }

  scrollToNextBlock() {
    this.smothScroll.scrollToTargetBlock(this.targetBlock.el, this.header);
  }
}
