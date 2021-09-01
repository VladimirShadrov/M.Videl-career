import { ItHubSlider } from '../../helpers/itHubSlider';

export class CareerUpgrade {
  constructor(el) {
    this.el = el;
    this.slides = Array.from(
      this.el.querySelectorAll('.upgrade__middle-image-item')
    );
    this.slidesRow = this.el.querySelector('.upgrade__middle-image-row');

    this.currentSlideNumber = 1;
    this.currentSlideRowPosition = 0;

    this.swiper = new Swiper(this.el.querySelector('.swiper'), {});

    this.slider = new ItHubSlider(
      this.currentSlideNumber,
      this.slides,
      this.currentSlideRowPosition,
      this.slidesRow
    );

    this.init();
  }

  init() {
    this.el.addEventListener('click', sliderClickHandler.bind(this));
  }
}

function sliderClickHandler(event) {
  if (event.target.classList.contains('upgrade__arrow-prev')) {
    this.slider.showPreviousSlide();
  }

  if (event.target.classList.contains('upgrade__slider-next-arrow')) {
    this.slider.showNextSlide();
  }
}
