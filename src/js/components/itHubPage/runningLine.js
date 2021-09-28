export class RunningLine {
  constructor(el) {
    this.el = el;

    if (this.el === null || this.el === undefined) return;

    this.runningLine = this.el.querySelector('.find__title-link');
    this.runningLineItemWidth;
    this.offset = 0;

    this.moveRunningLine();
    this.monitoringChatchingLinkWidth();
  }

  moveRunningLine() {
    window.addEventListener('load', () => {
      this.runningLineItemWidth = this.runningLine.lastElementChild.clientWidth;

      this.manageSpeedLine(1, 1);
    });
  }

  moveFirstElementToEnd(line) {
    line.lastElementChild.prepend();
  }

  manageSpeedLine(offset, speed) {
    setInterval(() => {
      this.offset += offset;
      this.runningLine.style.transform = `translateX(${this.offset}px)`;

      if (this.offset >= this.runningLineItemWidth) {
        this.moveFirstElementToEnd(this.runningLine);
        this.offset = 0;
      }
    }, speed);
  }

  monitoringChatchingLinkWidth() {
    window.addEventListener('resize', () => {
      this.runningLineItemWidth = this.runningLine.lastElementChild.clientWidth;
    });
  }
}
