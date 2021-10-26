import { retailBrands } from '../../index';
import { smothScrollingToBlock } from '../../index';
import { headerItPage } from '../../index';

export class RetailMission {
  constructor(el) {
    this.el = el;

    if (!this.el) return;

    this.missionButton = this.el.querySelector('.retail__mission-button');

    this.missionButton.addEventListener(
      'click',
      this.scrollToBrandsBlock.bind(this)
    );
  }
  scrollToBrandsBlock() {
    smothScrollingToBlock(retailBrands, headerItPage);
  }
}
