import { ItHubSlider } from '../../helpers/itHubSlider';

export class Advantages {
  constructor(el) {
    this.el = el;
    // this.slidesRow = this.el.querySelector('.why-are-we__slider-row');
    // this.slides = Array.from(this.el.querySelectorAll('.why-are-we__slide'));
    // this.slidesCounterField = this.el.querySelector(
    //   '.why-are-we__slide-number-mobile-value'
    // );
    // this.slidesTotalValueField = this.el.querySelector(
    //   '.why-are-we__slide-number-mobile-total'
    // );
    // this.slideWidht = 0;
    // this.currentSlideRowPosition = 0;
    // this.currentSlideNumber = 1;
    // this.slidesTotalValue = this.slides.length;
    // this.slidesTotalValueField.textContent = this.slides.length;
    this.buttonNext = this.el.querySelector(
      '.why-are-we__slide-main-button-next'
    );
    this.buttonPrev = this.el.querySelector(
      '.why-are-we__slide-main-button-prev'
    );
    this.buttonNextMobile = this.el.querySelector(
      '.why-are-we__slide-btn-next'
    );
    this.buttonPrevMobile = this.el.querySelector(
      '.why-are-we__slide-btn-prev'
    );
    this.sliderRow = this.el.querySelector('.why-are-we__slider-row');
    this.slides = this.el.querySelectorAll('.why-are-we__slide');

    console.log(this.slides);

    // this.btnNext = this.el.querySelector(
    //   '.why-are-we__slide-arrow.swiper-button-next'
    // );
    // this.btnPrev = this.el.querySelector(
    //   '.why-are-we__slide-arrow.swiper-button-prev'
    // );

    this.swiper = new Swiper(this.el.querySelector('.swiper'), {
      // navigation: {
      //   nextEl: '.why-are-we__slide-arrow.swiper-button-next',
      //   prevEl: '.why-are-we__slide-arrow.swiper-button-prev',
      // },
    });

    this.init();
    this.setDisabledClassSliderBtn();
    this.setOpacitySliderBtn();
    this.setSliderRowLength();
    this.setWidthSliderButtons();
  }

  init() {
    this.el.addEventListener('click', sliderClickHandler.bind(this));
  }

  setDisabledClassSliderBtn() {
    this.sliderRow.addEventListener('transitionend', () => {
      this.setOpacitySliderBtn();
      this.setWidthSliderButtons();
    });
  }

  setOpacitySliderBtn() {
    this.buttonPrevMobile.style.opacity = '1';
    this.buttonNextMobile.style.opacity = '1';
    this.buttonNext.style.width = '87px';
    this.buttonPrev.style.width = '87px';

    if (this.swiper.realIndex + 1 === this.swiper.slides.length) {
      this.buttonNextMobile.style.opacity = '0.35';
      this.setWidthSliderButtons();
    }

    if (this.swiper.realIndex === 0) {
      this.buttonPrevMobile.style.opacity = '0.35';
      this.setWidthSliderButtons();
    }
  }

  setWidthSliderButtons() {
    this.buttonNext.style.width = '87px';
    this.buttonPrev.style.width = '87px';

    if (this.swiper.realIndex === 0) {
      this.buttonPrev.style.width = '0';

      setTimeout(() => (this.buttonNext.style.width = '100%'), 300);
    }

    if (this.swiper.realIndex + 1 === this.swiper.slides.length) {
      this.buttonNext.style.width = '0';

      setTimeout(() => (this.buttonPrev.style.width = '100%'), 300);
    }
  }

  setSliderRowLength() {
    this.sliderRow.style.width = `${this.slides.length * 100}%`;
    this.slides.forEach((slide) => {
      slide.style.width = this.sliderRow.style.width / this.slides.length;
    });
  }
}

function sliderClickHandler(event) {
  if (event.target.dataset.name === 'next') {
    this.swiper.slideNext();
    this.setDisabledClassSliderBtn();
  }
  if (event.target.dataset.name === 'prev') {
    this.swiper.slidePrev();
    this.setOpacitySliderBtn();
  }
}
