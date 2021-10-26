export class RetailBrands {
  constructor(el) {
    this.el = el;

    if (!this.el) return;

    // Навигация
    this.navigationContainer = this.el.querySelector(
      '.brands__navigation-container'
    );
    this.navigationButtons = this.el.querySelectorAll(
      '.brands__navigation-button'
    );

    this.navigationContainer.addEventListener(
      'click',
      this.switchNavigationButton.bind(this)
    );

    // Слайдер
    this.brandSliderContainer = this.el.querySelector(
      '.brands__content-slider'
    );
    this.brandSliderLine = this.el.querySelector('.brands__content-slider-row');
    this.slides = this.el.querySelectorAll('.brands__content-slider-item');
    this.slideImages = this.el.querySelectorAll(
      '.brands__content-slider-item-image'
    );
    this.brandSliderButtonsContainer = this.el.querySelector(
      '.brands__content-slider-button-container'
    );
    this.sliderButtonNext = this.el.querySelector(
      '.brands__content-slider-button-next'
    );
    this.sliderButtonPrev = this.el.querySelector(
      '.brands__content-slider-button-prev'
    );

    this.sliderWidth;
    this.sliderDirection;

    window.addEventListener('load', this.brandSliderInit.bind(this));
    window.addEventListener('resize', this.brandSliderInit.bind(this));
    this.sliderButtonNext.addEventListener(
      'click',
      this.showNextSlide.bind(this)
    );
    this.sliderButtonPrev.addEventListener(
      'click',
      this.showPrevSlide.bind(this)
    );

    this.brandSliderLine.addEventListener(
      'transitionend',
      this.deleteSliderRowTranslate.bind(this)
    );
  }
  switchNavigationButton(event) {
    if (event.target.classList.contains('brands__navigation-button')) {
      this.navigationButtons.forEach((button) =>
        button.classList.remove('brands__navigation-button-active')
      );
      event.target.classList.add('brands__navigation-button-active');
    }
  }

  brandSliderInit() {
    this.brandSliderLine.style.width =
      this.brandSliderContainer.getBoundingClientRect().width *
        this.slides.length +
      'px';

    this.slides.forEach(
      (slide) =>
        (slide.style.width =
          this.brandSliderContainer.getBoundingClientRect().width + 'px')
    );

    this.slideImages.forEach((image) => {
      image.style.width =
        this.brandSliderContainer.getBoundingClientRect().width + 'px';
      image.style.height = 'auto';
    });
  }

  showNextSlide() {
    const step = 100 / this.slides.length + '%';
    this.sliderDirection = 'next';

    if (this.brandSliderContainer.style.justifyContent === 'flex-end') {
      this.brandSliderLine.append(this.brandSliderLine.firstElementChild);
    }

    this.brandSliderContainer.style.justifyContent = 'flex-start';
    this.brandSliderLine.style.transform = `translateX(-${step})`;
  }

  showPrevSlide() {
    const step = 100 / this.slides.length + '%';
    if (this.sliderDirection === 'next' || !this.sliderDirection) {
      this.sliderDirection = 'prev';
      this.brandSliderLine.prepend(this.brandSliderLine.lastElementChild);
    }

    this.brandSliderContainer.style.justifyContent = 'flex-end';
    this.brandSliderLine.style.transform = `translateX(${step})`;
  }

  deleteSliderRowTranslate() {
    if (this.sliderDirection === 'prev') {
      this.brandSliderLine.prepend(this.brandSliderLine.lastElementChild);
    } else if (this.sliderDirection === 'next') {
      this.brandSliderLine.append(this.brandSliderLine.firstElementChild);
    }

    this.brandSliderLine.style.transition = 'none';
    this.brandSliderLine.style.transform = 'translate(0)';

    setTimeout(() => {
      this.brandSliderLine.style.transition = '0.3s';
    });
  }
}
