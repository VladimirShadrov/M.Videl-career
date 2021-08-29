import { ItHubSlider } from '../../helpers/itHubSlider';

export class Advantages {
  constructor(el) {
    this.el = el;
    this.slidesRow = this.el.querySelector('.why-are-we__slider-row');
    this.slides = Array.from(this.el.querySelectorAll('.why-are-we__slide'));
    this.slidesCounterField = this.el.querySelector(
      '.why-are-we__slide-number-mobile-value'
    );
    this.slidesTotalValueField = this.el.querySelector(
      '.why-are-we__slide-number-mobile-total'
    );
    this.slideWidht = 0;
    this.currentSlideRowPosition = 0;
    this.currentSlideNumber = 1;
    this.slidesTotalValue = this.slides.length;
    this.slidesTotalValueField.textContent = this.slides.length;

    this.swiper = new Swiper(this.el.querySelector('.swiper'), {});

    this.slider = new ItHubSlider(
      this.currentSlideNumber,
      this.slides,
      this.currentSlideRowPosition,
      this.slidesRow,
      this.slidesCounterField
    );

    this.init();
  }

  init() {
    this.el.addEventListener('click', sliderClickHandler.bind(this));
  }
}

function sliderClickHandler(event) {
  if (event.target.dataset.name === 'next') {
    this.slider.showNextSlide();
    this.slider.setCurrentSlideNumber();
  }

  if (event.target.dataset.name === 'prev') {
    this.slider.showPreviousSlide();
    this.slider.setCurrentSlideNumber();
  }
}
