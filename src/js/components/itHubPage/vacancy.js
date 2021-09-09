export class Vacancy {
  constructor(el) {
    this.el = el;
    this.flyout = document.querySelector('.flyout');
    this.flyoutSideBar = this.flyout.querySelector('.flyout__side-bar');
    this.flyOutContentBar = this.flyout.querySelector('.vacancy');

    this.init();
    this.closeFlyout();
    this.resizeFlyout();
  }

  init() {
    this.el.addEventListener('click', vacancyClickHandler.bind(this));
  }

  openFlyout() {
    this.flyout.classList.add('flyout__active');
    document.body.style.overflow = 'hidden';
    this.setHeightFlyoutSideBar();
    this.flyout.scrollTop = 0;

    setTimeout(() => {
      this.flyoutSideBar.style.background = 'rgba(0, 0, 0, 0.8)';
    }, 300);
  }

  closeFlyout() {
    this.flyout.addEventListener('click', (event) => {
      if (
        event.target.classList.contains('vacancy__header-head-link-main') ||
        event.target.classList.contains('flyout__side-bar')
      ) {
        event.preventDefault();
        this.flyoutSideBar.style.background = 'transparent';
        document.body.style.overflow = 'visible';

        setTimeout(() => {
          this.flyout.classList.remove('flyout__active');
        }, 300);
      }
    });
  }

  setHeightFlyoutSideBar() {
    this.flyoutSideBar.style.height = this.flyOutContentBar.clientHeight + 'px';
    setTimeout(() => {
      // this.flyout.style.background = '#ffffff';
      this.flyoutSideBar.style.background = 'rgba(0, 0, 0, 0.8)';
    }, 300);
  }

  resizeFlyout() {
    window.addEventListener('resize', () => {
      this.setHeightFlyoutSideBar();
    });
  }
}

function vacancyClickHandler(event) {
  if (event.target.classList.contains('profession__job-title')) {
    event.preventDefault();
    this.openFlyout();
  }
}
