export class Form {
  constructor(el) {
    this.el = el;
    this.dropdownItems = this.el.querySelectorAll('form__dropdown-list-item');
    this.sideBar = this.el.querySelector('.form__side-bar');
    this.dropdowns = Array.from(this.el.querySelectorAll('.form__dropdown'));
    this.dropdownLists = Array.from(
      this.el.querySelectorAll('.form__dropdown-list')
    );

    this.init();
  }

  init() {
    this.el.addEventListener('click', formClickHandler.bind(this));
  }

  closeForm() {
    this.sideBar.style.background = 'transparent';
    document.body.style.overflow = 'visible';

    setTimeout(() => {
      this.el.classList.remove('form-active');
    }, 300);
  }

  openDropdown(event) {
    this.closeDropdown();
    event.target.lastElementChild.classList.remove('hide');
  }

  closeDropdown() {
    this.dropdowns.forEach((dropdown) => {
      dropdown.lastElementChild.classList.add('hide');
    });
  }

  selectDropdownItem(event) {
    const currentDropdownItem = event.target;
    const selectedValue = currentDropdownItem.firstElementChild.innerText;
    const textField = currentDropdownItem.closest(
      '.form__dropdown-list'
    ).previousElementSibling;
    const checkIcon = currentDropdownItem.lastElementChild;

    textField.textContent = selectedValue;
    checkIcon.classList.add('form__dropdown-item-checked-active');

    setTimeout(() => {
      checkIcon.classList.remove('form__dropdown-item-checked-active');
      currentDropdownItem.closest('.form__dropdown-list').classList.add('hide');
    }, 50);
  }
}

function formClickHandler(event) {
  if (
    event.target.classList.contains('form__link-back') ||
    event.target.classList.contains('form__side-bar')
  ) {
    event.preventDefault();
    this.closeForm();
  }
  if (event.target.classList.contains('form__dropdown')) {
    this.openDropdown(event);
  }
  if (event.target.classList.contains('form__dropdown-list-item')) {
    this.selectDropdownItem(event);
  }
  if (
    event.target.closest('.form__content') &&
    !event.target.classList.contains('form__dropdown')
  ) {
    this.closeDropdown();
  }
}
