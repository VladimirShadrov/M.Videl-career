export class ListingFilters {
  constructor(className) {
    this.el = document.querySelector(className);

    if (this.el === null || this.el === undefined) return;

    this.professionFilter = this.el.querySelector(
      '.listing-top__profession-filter'
    );
    this.specializationFilter = this.el.querySelector(
      'input[name=tags-select-mode].listing__specialization-select'
    );
    this.levelFilter = this.el.querySelector(
      'input[name=tags-select-mode].listing__level-select'
    );
    this.cityFilter = this.el.querySelector(
      'input[name=tags-select-mode].listing__city-select'
    );
    this.showControls = this.el.querySelectorAll(
      '.listing-top__filter-list-item'
    );

    // Инициализация селекта выбора Профессии
    this.professionSelect = new Tagify(this.professionFilter, {
      whitelist: ['foo', 'bar', 'baz'],
      dropdown: {
        position: 'input',
        enabled: 0,
      },
    });

    // Инициализация селекта выбора Специализации
    this.specializationSelect = new Tagify(this.specializationFilter, {
      enforceWhitelist: true,
      mode: 'select',
      whitelist: ['Розничная продажа', 'Консультант', 'Кассир'],
      userInput: false,
    });

    // Инициализация селекта выбора Уровня
    this.levelSelect = new Tagify(this.levelFilter, {
      enforceWhitelist: true,
      mode: 'select',
      whitelist: ['Москва', 'Санкт-Петербург', 'Ростов-на-Дону'],
      userInput: false,
    });

    // Инициализация селекта выбора Города
    this.citySelect = new Tagify(this.cityFilter, {
      enforceWhitelist: true,
      mode: 'select',
      whitelist: ['Любая', 'Тимирязевская', 'Улица Горчакова'],
      userInput: false,
    });
  }
}
