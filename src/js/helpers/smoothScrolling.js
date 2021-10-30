export class SmothScrollingToTargetBlock {
  constructor() {}
  scrollToTargetBlock(targetBlock, header) {
    const offset = 16;
    const mobileScreenWidth = 479;
    let headerHeight = header.clientHeight + offset;

    if (window.innerWidth <= mobileScreenWidth) {
      headerHeight = offset;
    }
    const topOffset = targetBlock.offsetTop - headerHeight;

    let interval = setInterval(() => {
      document.scrollingElement.scrollTop += 10;

      if (document.scrollingElement.scrollTop >= topOffset) {
        clearInterval(interval);
      }
    }, 1);
  }
}
