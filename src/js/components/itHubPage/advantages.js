export class Advantages {
  constructor(el) {
    this.el = el;
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
    this.slides = Array.from(this.el.querySelectorAll('.why-are-we__slide'));

    this.swiper = new Swiper(this.el.querySelector('.swiper'), {});

    this.init();
    this.setDisabledClassSliderBtn();
    this.setOpacitySliderBtn();
    this.setSliderRowLength();
    this.setWidthSliderButtons();
    this.setSlidesCounter();
    this.setNumberCurrentSlideMobile();
  }

  init() {
    this.el.addEventListener('click', sliderClickHandler.bind(this));
  }

  setDisabledClassSliderBtn() {
    this.sliderRow.addEventListener('transitionend', () => {
      this.setOpacitySliderBtn();
      this.setWidthSliderButtons();
      this.setNumberCurrentSlideMobile();
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

  setSlidesCounter() {
    for (let i = 0; i < this.slides.length; i++) {
      let slideNumberField = this.slides[i].querySelector(
        '.why-are-we__slide-number'
      );
      let slidesValue = this.slides[i].querySelector(
        '.why-are-we__slide-value'
      );

      if (this.slides.length > 10) {
        slidesValue.textContent = `${this.slides.length}`;
      } else {
        slidesValue.textContent = `0${this.slides.length}`;
      }

      if (i + 1 < 10) {
        slideNumberField.textContent = `0${i + 1}`;
      } else {
        slideNumberField.textContent = `${i + 1}`;
      }
    }
  }

  setNumberCurrentSlideMobile() {
    let slideNumberField = this.el.querySelector(
      '.why-are-we__slide-number-mobile-value'
    );
    this.el.querySelector(
      '.why-are-we__slide-number-mobile-total'
    ).textContent = this.slides.length;
    const currentSlide = this.swiper.activeIndex;

    slideNumberField.textContent = currentSlide + 1;
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
