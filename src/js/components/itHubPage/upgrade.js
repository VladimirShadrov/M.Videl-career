export class CareerUpgrade {
  constructor(el) {
    this.el = el;
    this.slidesPrev = Array.from(
      this.el.querySelectorAll('.upgrade__slider-prev-image')
    );
    this.slidesMain = Array.from(
      this.el.querySelectorAll('.upgrade__middle-image-item')
    );
    this.slidesNext = Array.from(
      this.el.querySelectorAll('.upgrade__slider-next-item')
    );
    this.prevSliderRow = this.el.querySelector(
      '.upgrade__slider-prev-image-row'
    );
    this.mainSliderRow = this.el.querySelector('.upgrade__middle-image-row');
    this.nextSliderRow = this.el.querySelector('.upgrade__slider-next-row');

    this.currentSlideNumber = 1;
    this.currentSlideRowPosition = 0;

    this.prevSlider = new Swiper('.swiperUpgrage', {
      loop: true,
    });

    this.mainSlider = new Swiper('.mainSlider', {
      loop: true,
    });

    this.nextSlider = new Swiper('.nextSlider', {
      loop: true,
    });

    this.mainSlider.controller.control = this.prevSlider;
    this.nextSlider.controller.control = this.prevSlider;
    this.prevSlider.controller.control = this.nextSlider;

    this.init();
    this.watchResiazWindow();
    this.changeSliderControlls();
    this.setSliderRowLength();
  }

  init() {
    this.el.addEventListener('click', sliderClickHandler.bind(this));
  }

  watchResiazWindow() {
    window.addEventListener('resize', (event) => {
      this.changeSliderControlls();
    });
  }

  changeSliderControlls() {
    if (window.innerWidth <= 991) {
      this.nextSlider.controller.control = this.mainSlider;
      this.mainSlider.controller.control = this.nextSlider;
    } else {
      this.mainSlider.controller.control = this.prevSlider;
      this.nextSlider.controller.control = this.prevSlider;
      this.prevSlider.controller.control = this.nextSlider;
    }
  }

  setSliderRowLength() {
    this.prevSliderRow.style.width = `${this.slidesPrev.length * 100}%`;
    this.mainSliderRow.style.width = `${this.slidesMain.length * 100}%`;
    this.nextSliderRow.style.width = `${this.slidesNext.length * 100}%`;

    this.slidesPrev.forEach((slide) => {
      slide.style.width =
        this.prevSliderRow.style.width / this.slidesPrev.length;
    });
    this.slidesMain.forEach((slide) => {
      slide.style.width =
        this.mainSliderRow.style.width / this.slidesMain.length;
    });
    this.slidesNext.forEach((slide) => {
      slide.style.width =
        this.nextSliderRow.style.width / this.slidesNext.length;
    });
  }
}

function sliderClickHandler(event) {
  if (event.target.classList.contains('upgrade__arrow-prev')) {
    this.mainSlider.slidePrev();
  }

  if (event.target.classList.contains('upgrade__slider-next-arrow')) {
    this.mainSlider.slideNext();
  }
}
