export class ListingVacancyMapBlock {
  constructor(className) {
    this.el = document.querySelector(className);

    if (!this.el) return;

    ymaps.ready(this.yandexMapInit);
  }
  yandexMapInit() {
    const map = new ymaps.Map('yandex-map', {
      center: [55.773674, 37.67109],
      zoom: 17,
    });

    //---------------------------------------------------------------
    // М.Видео. Одна иконка
    const markMVideo = new ymaps.Placemark(
      [55.773674, 37.67109],
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: '../../images/listing/map/mvideo-icon.png',
        iconImageSize: [42, 66],
      }
    );

    map.geoObjects.add(markMVideo);

    //--------------------------------------------------------------
    // М.Видео. Несколько меток.
    const mvideoMark1 = new ymaps.Placemark([55.77395, 37.67262]);
    const mvideoMark2 = new ymaps.Placemark([55.773221, 37.673137]);
    const mvideoMark3 = new ymaps.Placemark([55.772568, 37.672053]);
    const mvideoMark4 = new ymaps.Placemark([55.772241, 37.670142]);

    let mvideoCollection = new ymaps.GeoObjectCollection(
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: '../../images/listing/map/mvideo-icon.png',
        iconImageSize: [42, 66],
      }
    );

    mvideoCollection
      .add(mvideoMark1)
      .add(mvideoMark2)
      .add(mvideoMark3)
      .add(mvideoMark4);

    map.geoObjects.add(mvideoCollection);

    //------------------------------------------------------------------------
    // Эльдорадо. Несколько иконок. Вывод в цикле
    const eldoradoMarks = [
      [55.774824, 37.671345],
      [55.774951, 37.669619],
      [55.774289, 37.669145],
      [55.774291, 37.667745],
    ];

    let eldoradoCollection2 = new ymaps.GeoObjectCollection(
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: '../../images/listing/map/eldorado-icon.png',
        iconImageSize: [42, 66],
      }
    );

    for (let i = 0; i < eldoradoMarks.length; i++) {
      eldoradoCollection2.add(new ymaps.Placemark(eldoradoMarks[i]));
    }
    map.geoObjects.add(eldoradoCollection2);

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
    const markEldorado = new ymaps.Placemark(
      [55.774824, 37.671345],

      {},
      {
        iconLayout: 'default#image',
        iconImageHref: '../../images/listing/map/eldorado-icon.png',
        iconImageSize: [42, 66],
      }
    );

    map.geoObjects.add(markEldorado);

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
