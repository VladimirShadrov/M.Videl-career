export class Vacancy {
  constructor(el) {
    this.el = el;
    this.flyout = document.querySelector('.flyout');
    this.flyoutSideBar = this.flyout.querySelector('.flyout__side-bar');

    this.init();
    this.closeFlyout();
  }

  init() {
    this.el.addEventListener('click', vacancyClickHandler.bind(this));
  }

  openFlyout() {
    this.flyout.classList.add('flyout__active');
    window.scrollTo(0, 0);

    setTimeout(() => {
      this.flyout.style.background = '#ffffff';
      this.flyoutSideBar.style.background = 'rgba(0, 0, 0, 0.8)';
    }, 300);
  }

  closeFlyout() {
    this.flyout.addEventListener('click', (event) => {
      if (event.target.classList.contains('vacancy__header-head-link-main')) {
        this.flyout.style.background = 'transparent';
        this.flyoutSideBar.style.background = 'transparent';

        setTimeout(() => {
          this.flyout.classList.remove('flyout__active');
        }, 300);
      }
    });
  }
}

function vacancyClickHandler(event) {
  event.preventDefault();

  if (event.target.classList.contains('profession__job-title')) {
    this.openFlyout();
  }
}
