import { FlyoutFunctional } from '../../helpers/flyout';

export class LogisticPageFlyout {
  constructor(className) {
    this.flyout = document.querySelector(className);

    if (!this.flyout) return;

    if (this.flyout) {
      this.flyoutInstance = new FlyoutFunctional(this.flyout);
      this.videoContainer = this.flyout.querySelector(
        '.vacancy__video-container'
      );

      this.flyoutInstance.resizeFlyout();
      this.flyoutInstance.flyOutInit();
      this.flyoutInstance.newsSliderInit();
    }
  }
}
