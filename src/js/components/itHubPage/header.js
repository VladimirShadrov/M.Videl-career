export class Header {
  constructor(el) {
    this.el = el;

    if (this.el === null || this.el === undefined) return;

    this.headerSelect = this.el.querySelector('.it-header__directions');
    this.dropdowList = this.el.querySelector(
      '.it-header__directions-dropdown-list'
    );
    this.dropdownItems = this.el.querySelectorAll(
      '.it-header__directions-dropdown-item'
    );
    this.directionsValue = this.el.querySelector(
      '.it-header__directions-value'
    );

    // Слушатели событий
    this.headerSelect.addEventListener(
      'click',
      this.openOrCloseSelect.bind(this)
    );
    this.dropdownItems.forEach((item) =>
      item.addEventListener('click', this.closeSelect.bind(this))
    );
    this.directionsValue.textContent = `(${this.dropdownItems.length})`;
  }

  openSelect() {
    if (this.headerSelect.dataset.name === 'closed') {
      this.dropdowList.classList.add(
        'it-header__directions-dropdown-list-active'
      );

      setTimeout(() => {
        this.headerSelect.dataset.name = 'opened';
      }, 50);
    }
  }

  closeSelect() {
    if (this.headerSelect === null || this.headerSelect === undefined) return;

    if (this.headerSelect.dataset.name === 'opened') {
      this.dropdowList.classList.remove(
        'it-header__directions-dropdown-list-active'
      );

      setTimeout(() => {
        this.headerSelect.dataset.name = 'closed';
      }, 50);
    }
  }

  openOrCloseSelect() {
    this.openSelect();
    this.closeSelect();
  }
}
