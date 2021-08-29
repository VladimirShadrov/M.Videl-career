export class Listing {
  constructor(el) {
    this.el = el;

    this.dropdown = this.el.querySelector('.listing-top__dropdown-list');
    this.vacancyCounter = this.el.querySelector('.listing-top__counter');
    this.dropdownContainer = this.el.querySelector(
      '.listing-top__dropdown-container'
    );
    this.dropdownItem = this.el.querySelectorAll(
      '.listing-top__dropdown-list-item-value'
    );

    this.currentDirection = this.el.querySelector('.listing-top__where');
    this.vacancyValue = '';

    this.init();
    this.selectDirection();
  }

  init() {
    this.el.addEventListener('click', listingClickHandler.bind(this));
  }

  openDropdown() {
    this.dropdown.classList.remove('hide');
    this.dropdownContainer.classList.add(
      'listing-top__dropdown-container-active'
    );
  }

  closeDropdown() {
    this.dropdown.classList.add('hide');
    this.dropdownContainer.classList.remove(
      'listing-top__dropdown-container-active'
    );
  }

  selectDirection() {
    this.dropdownItem.forEach((item) => {
      item.addEventListener('click', (event) => {
        if (event.target === item) {
          this.vacancyValue = item.nextElementSibling.textContent;
          this.vacancyCounter.textContent = this.vacancyValue;
          this.currentDirection.textContent = item.innerText;
          this.closeDropdown();
        }
      });
    });
  }
}

function listingClickHandler(event) {
  if (event.target.classList.contains('listing-top__where')) {
    this.openDropdown();
  }
}
