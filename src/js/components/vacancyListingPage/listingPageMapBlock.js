export class ListingVacancyMapBlock {
  constructor(mapBlockClassName, listBlockClassName, viewSwitcher) {
    this.mapBlock = document.querySelector(mapBlockClassName);
    this.listBlock = document.querySelector(listBlockClassName);
    this.mapToListSwitcherContainer = document.querySelector(viewSwitcher);

    if (!this.mapBlock && !this.listBlock && !this.mapToListSwitcherContainer)
      return;

    this.shopsListContainer = this.mapBlock.querySelector(
      '.isting-metro__shops-list-container'
    );
    this.vacanciesInShopContainer = this.mapBlock.querySelector(
      '.isting-metro__single-shop-container'
    );
    this.shopListMVideo = this.mapBlock.querySelectorAll(
      '.listing-metro__shops-list.mvideo > .listing-metro__shop'
    );

    this.shopListEldorado = this.mapBlock.querySelectorAll(
      '.listing-metro__shops-list.eldorado > .listing-metro__shop'
    );

    if (!this.mapBlock && !this.listBlock && !this.mapToListSwitcher) return;

    this.checkboxContainer = this.mapBlock.querySelector(
      '.listing-metro__select-shop-container'
    );
    this.switchingButtons = this.mapToListSwitcherContainer.querySelectorAll(
      '.listing-top__filter-list-item'
    );
    this.mvideoBrand = this.mapBlock.querySelectorAll('.mvideo');
    this.eldoradoBrand = this.mapBlock.querySelectorAll('.eldorado');
    this.buttonBackToShopsList = this.mapBlock.querySelector(
      '.listing-metro__link-to-shops'
    );
    this.buttonBackToShopsListMobile = this.mapBlock.querySelector(
      '.listing-metro__link-to-shops-mobile'
    );

    this.switchingButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.clearActiveClass(
          this.switchingButtons,
          'listing-top__filter-list-item-active'
        );
        button.classList.add('listing-top__filter-list-item-active');

        button.dataset.name === 'list'
          ? this.showVacanciesList()
          : this.showVacanciesOnMap();
      });
    });

    this.checkboxContainer.addEventListener(
      'click',
      this.switchBrand.bind(this)
    );

    this.shopListMVideo.forEach((shop) => {
      shop.addEventListener('click', () => {
        this.shopsListContainer.classList.add('hide');
        this.vacanciesInShopContainer.classList.remove('hide');
      });
    });

    this.shopListEldorado.forEach((shop) => {
      shop.addEventListener('click', () => {
        this.shopsListContainer.classList.add('hide');
        this.vacanciesInShopContainer.classList.remove('hide');
      });
    });

    this.buttonBackToShopsList.addEventListener('click', (event) => {
      event.preventDefault();
      this.shopsListContainer.classList.remove('hide');
      this.vacanciesInShopContainer.classList.add('hide');
    });

    this.buttonBackToShopsListMobile.addEventListener('click', (event) => {
      event.preventDefault();
      this.shopsListContainer.classList.remove('hide');
      this.vacanciesInShopContainer.classList.add('hide');
    });

    this.yandexMaps = ymaps.ready(this.yandexMapInit);
  }
  clearActiveClass(array, className) {
    array.forEach((item) => item.classList.remove(className));
  }

  showVacanciesList() {
    this.mapBlock.classList.add('transparent');

    setTimeout(() => {
      this.listBlock.classList.remove('hide');
      this.mapBlock.classList.add('hide');
    }, 300);

    setTimeout(() => this.listBlock.classList.remove('transparent'), 50);
  }

  switchBrand(event) {
    if (event.target.dataset.name && event.target.dataset.name === 'mvideo') {
      document.querySelector('.eldorado-input').checked = false;
      this.mvideoBrand.forEach((shop) => shop.classList.remove('hide'));
      this.eldoradoBrand.forEach((shop) => shop.classList.add('hide'));
    }

    if (event.target.dataset.name && event.target.dataset.name === 'eldorado') {
      document.querySelector('.mvideo-input').checked = false;
      this.eldoradoBrand.forEach((shop) => shop.classList.remove('hide'));
      this.mvideoBrand.forEach((shop) => shop.classList.add('hide'));
    }
  }

  showVacanciesOnMap() {
    this.listBlock.classList.add('transparent');

    setTimeout(() => {
      this.listBlock.classList.add('hide');
      this.mapBlock.classList.remove('hide');
    }, 300);

    setTimeout(() => this.mapBlock.classList.remove('transparent'), 50);
  }

  yandexMapInit() {
    const map = new ymaps.Map('yandex-map', {
      center: [55.773674, 37.67109],
      zoom: 17,
    });

    //---------------------------------------------------------------
    // М.Видео. Одна иконка
    // const markMVideo = new ymaps.Placemark(
    //   [55.773674, 37.67109],
    //   {},
    //   {
    //     iconLayout: 'default#image',
    //     iconImageHref: '../../images/listing/map/mvideo-icon.png',
    //     iconImageSize: [42, 66],
    //   }
    // );

    // map.geoObjects.add(markMVideo);

    //--------------------------------------------------------------
    // М.Видео. Несколько меток.
    // const mvideoMark1 = new ymaps.Placemark([55.77395, 37.67262]);
    // const mvideoMark2 = new ymaps.Placemark([55.773221, 37.673137]);
    // const mvideoMark3 = new ymaps.Placemark([55.772568, 37.672053]);
    // const mvideoMark4 = new ymaps.Placemark([55.772241, 37.670142]);

    // let mvideoCollection = new ymaps.GeoObjectCollection(
    //   {},
    //   {
    //     iconLayout: 'default#image',
    //     iconImageHref: '../../images/listing/map/mvideo-icon.png',
    //     iconImageSize: [42, 66],
    //   }
    // );

    // mvideoCollection
    //   .add(mvideoMark1)
    //   .add(mvideoMark2)
    //   .add(mvideoMark3)
    //   .add(mvideoMark4);

    // map.geoObjects.add(mvideoCollection);

    //------------------------------------------------------------------------
    // Эльдорадо. Несколько иконок. Вывод в цикле
    const eldoradoMarks = [
      [55.774824, 37.671345],
      [55.774951, 37.669619],
      [55.774289, 37.669145],
      [55.774291, 37.667745],
    ];

    let eldoradoShops = new ymaps.GeoObjectCollection(
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: '../../images/listing/map/eldorado-icon.png',
        iconImageSize: [42, 66],
      }
    );

    for (let i = 0; i < eldoradoMarks.length; i++) {
      eldoradoShops.add(new ymaps.Placemark(eldoradoMarks[i]));
    }
    map.geoObjects.add(eldoradoShops);

    //---------------------------------------------------------------------------------
    // М.Видео
    const mvideoMarks = [
      [55.77395, 37.67262],
      [55.773221, 37.673137],
      [55.772568, 37.672053],
      [55.772241, 37.670142],
      [55.773674, 37.67109],
    ];

    let mvidoeShops = new ymaps.GeoObjectCollection(
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: '../../images/listing/map/mvideo-icon.png',
        iconImageSize: [42, 66],
      }
    );

    for (let i = 0; i < mvideoMarks.length; i++) {
      mvidoeShops.add(new ymaps.Placemark(mvideoMarks[i]));
    }
    map.geoObjects.add(mvidoeShops);

    //--------------------------------------------------------------
    // Эльдорадо. Несколько меток. Вариант 2
    // const eldoradoMark1 = new ymaps.Placemark([55.774824, 37.671345]);
    // const eldoradoMark2 = new ymaps.Placemark([55.774951, 37.669619]);
    // const eldoradoMark3 = new ymaps.Placemark([55.774289, 37.669145]);
    // const eldoradoMark4 = new ymaps.Placemark([55.774291, 37.667745]);

    // let eldoradoCollection = new ymaps.GeoObjectCollection(
    //   {},
    //   {
    //     iconLayout: 'default#image',
    //     iconImageHref: '../../images/listing/map/eldorado-icon.png',
    //     iconImageSize: [42, 66],
    //   }
    // );

    // eldoradoCollection
    //   .add(eldoradoMark1)
    //   .add(eldoradoMark2)
    //   .add(eldoradoMark3)
    //   .add(eldoradoMark4);

    // map.geoObjects.add(eldoradoCollection);

    //--------------------------------------------------------------
    // Эльдорадо. Одна иконка
    // const markEldorado = new ymaps.Placemark(
    //   [55.774824, 37.671345],

    //   {},
    //   {
    //     iconLayout: 'default#image',
    //     iconImageHref: '../../images/listing/map/eldorado-icon.png',
    //     iconImageSize: [42, 66],
    //   }
    // );

    // map.geoObjects.add(markEldorado);

    //-----------------------------------
    // const icons = [
    //   [55.774824, 37.671345],
    //   [55.774951, 37.669619],
    //   [55.774289, 37.669145],
    // ];
    // let testPlace;

    // for (let i = 0; i < icons.length; i++) {
    //   testPlace = new ymaps.Placemark(icons[i]);
    //   map.geoObjects.add(testPlace);
    // }

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
  }
}
