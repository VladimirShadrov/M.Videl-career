import { SmothScrollingToTargetBlock } from '../../helpers/smoothScrolling';
export class RetailMissionBlock {
  constructor(className) {
    this.el = document.querySelector(className);

    if (!this.el) return;

    this.missionButton = this.el.querySelector('.retail__mission-button');
    this.retailBrandsBlock;
    this.header;
    this.smothScroll = new SmothScrollingToTargetBlock();

    this.missionButton.addEventListener(
      'click',
      this.scrollToBrandsBlock.bind(this)
    );
  }
  registerParameters(targetBlock, header) {
    this.retailBrandsBlock = targetBlock;
    this.header = header;
  }

  scrollToBrandsBlock() {
    this.smothScroll.scrollToTargetBlock(
      this.retailBrandsBlock.el,
      this.header
    );
  }
}
