export class Form {
  constructor(el) {
    this.el = el;
    this.dropdown = this.el.querySelector('.form__dropdown');
    this.dropdownText = this.el.querySelector('.form__dropdown-result');
    this.dropdownList = this.el.querySelector('.form__dropdown-list');
    this.dropdownItems = this.el.querySelectorAll('form__dropdown-list-item');

    this.init();
  }

  init() {
    this.el.addEventListener('click', formClickHandler.bind(this));
  }

  closeForm() {
    this.el.classList.remove('form-active');
  }

  openDropdown(event) {
    event.target.lastElementChild.classList.remove('hide');
  }

  closeDropdown(event) {
    event.target.lastElementChild.classList.add('hide');
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
    this.closeForm();
  }

  if (event.target.classList.contains('form__dropdown')) {
    this.openDropdown(event);
  }

  if (event.target.classList.contains('form__dropdown-list-item')) {
    this.selectDropdownItem(event);
  }
}
