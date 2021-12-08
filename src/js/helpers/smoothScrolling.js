export class SmothScrollingToTargetBlock {
  constructor(targetBlock, header) {
    this.targetBlock = targetBlock;
    this.header = header;
  }
  scrollToTargetBlock() {
    const offset = 16;
    const mobileScreenWidth = 479;
    let headerHeight = this.header.clientHeight + offset;

    if (window.innerWidth <= mobileScreenWidth) {
      headerHeight = offset;
    }
    const topOffset = this.targetBlock.offsetTop - headerHeight;

    let interval = setInterval(() => {
      document.scrollingElement.scrollTop += 10;

      if (document.scrollingElement.scrollTop >= topOffset) {
        clearInterval(interval);
      }
    }, 1);
  }
}
