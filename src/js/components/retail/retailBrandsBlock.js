export class RetailBrandsBlock {
  constructor(className) {
    this.el = document.querySelector(className);

    if (!this.el) return;

    // Блок навигации
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

    this.mvideoBrand = 0;
    this.eldoradoBrand = 1;
    this.activeBrand = this.mvideoBrand;

    this.navigationButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (button.dataset.name === 'mvideo') {
          this.activeBrand = this.mvideoBrand;
        } else {
          this.activeBrand = this.eldoradoBrand;
        }
      });
    });

    // Слайдер
    this.brandSliderContainer = this.el.querySelectorAll(
      '.brands__content-slider'
    );
    this.brandSliderLine = this.el.querySelectorAll(
      '.brands__content-slider-row'
    );
    this.slides = this.el.querySelectorAll('.brands__content-slider-item');
    this.slideImages = this.el.querySelectorAll(
      '.brands__content-slider-item-image'
    );
    this.brandSliderButtonsContainer = this.el.querySelectorAll(
      '.brands__content-slider-button-container'
    );
    this.sliderButtonNext = this.el.querySelectorAll(
      '.brands__content-slider-button-next'
    );
    this.sliderButtonPrev = this.el.querySelectorAll(
      '.brands__content-slider-button-prev'
    );
    this.percendsValue = 100;

    this.sliderDirection;
    // this.startSliderLinePosition;
    // this.currentSliderLinePosition;

    // Temp
    // this.startSwipe = this.startSwipe.bind(this);
    // this.stopSwipe = this.stopSwipe.bind(this);
    // this.moveSlider = this.moveSlider.bind(this);
    // this.setSliderLinePosition = this.setSliderLinePosition.bind(this);

    window.addEventListener('load', this.brandSliderInit.bind(this));
    window.addEventListener('resize', this.brandSliderInit.bind(this));

    // this.brandSliderLine.addEventListener('pointerdown', this.startSwipe);
    // window.addEventListener('pointerup', this.stopSwipe);

    // Переключение табов
    this.brandsTabs = [];
    this.mvideoFromBrandsPage = Array.from(this.el.querySelectorAll('.mvideo'));
    this.eldoradoFromBrandsPage = Array.from(
      this.el.querySelectorAll('.eldorado')
    );

    this.switchSlide(this.activeBrand);
  }
  // Кнопки навигации
  switchNavigationButton(event) {
    if (event.target.classList.contains('brands__navigation-button')) {
      this.navigationButtons.forEach((button) => {
        button.classList.remove('brands__navigation-button-active');
      });
      event.target.classList.add('brands__navigation-button-active');
    }

    this.switchTabs();
    this.switchSlide();
  }

  // Слайдер
  switchSlide() {
    this.sliderButtonNext[this.activeBrand].addEventListener(
      'click',

      this.showNextSlide.bind(this)
    );
    this.sliderButtonPrev[this.activeBrand].addEventListener(
      'click',
      this.showPrevSlide.bind(this)
    );

    this.brandSliderLine[this.activeBrand].addEventListener(
      'transitionend',
      this.deleteSliderRowTranslate.bind(this)
    );

    setTimeout(() => {
      this.brandSliderInit();
    }, 300);
  }

  brandSliderInit() {
    this.brandSliderLine[this.activeBrand].style.width =
      this.brandSliderContainer[this.activeBrand].getBoundingClientRect()
        .width *
        this.slides.length +
      'px';

    this.slides.forEach(
      (slide) =>
        (slide.style.width =
          this.brandSliderContainer[this.activeBrand].getBoundingClientRect()
            .width + 'px')
    );

    this.slideImages.forEach((image) => {
      image.style.width =
        this.brandSliderContainer[this.activeBrand].getBoundingClientRect()
          .width + 'px';
      image.style.height = 'auto';
    });
  }

  showNextSlide() {
    const step =
      this.percendsValue /
        (this.slides.length / this.brandSliderContainer.length) +
      '%';
    this.sliderDirection = 'next';

    if (
      this.brandSliderContainer[this.activeBrand].style.justifyContent ===
      'flex-end'
    ) {
      this.brandSliderLine[this.activeBrand].append(
        this.brandSliderLine[this.activeBrand].firstElementChild
      );
    }

    this.brandSliderContainer[this.activeBrand].style.justifyContent =
      'flex-start';
    this.brandSliderLine[
      this.activeBrand
    ].style.transform = `translateX(-${step})`;
  }

  showPrevSlide() {
    const step =
      this.percendsValue /
        (this.slides.length / this.brandSliderContainer.length) +
      '%';
    if (this.sliderDirection === 'next' || !this.sliderDirection) {
      this.sliderDirection = 'prev';
      this.brandSliderLine[this.activeBrand].prepend(
        this.brandSliderLine[this.activeBrand].lastElementChild
      );
    }

    this.brandSliderContainer[this.activeBrand].style.justifyContent =
      'flex-end';
    this.brandSliderLine[
      this.activeBrand
    ].style.transform = `translateX(${step})`;
  }

  deleteSliderRowTranslate() {
    if (this.sliderDirection === 'prev') {
      this.brandSliderLine[this.activeBrand].prepend(
        this.brandSliderLine[this.activeBrand].lastElementChild
      );
    } else if (this.sliderDirection === 'next') {
      this.brandSliderLine[this.activeBrand].append(
        this.brandSliderLine[this.activeBrand].firstElementChild
      );
    }

    this.brandSliderLine[this.activeBrand].style.transition = 'none';
    this.brandSliderLine[this.activeBrand].style.transform = 'translate(0)';

    setTimeout(() => {
      this.brandSliderLine[this.activeBrand].style.transition = '0.3s';
    });
  }

  // startSwipe(event) {
  //   this.startSliderLinePosition = event.pageX;
  //   this.brandSliderLine.style.transition = '0s';
  //   window.addEventListener('pointermove', this.moveSlider);
  // }

  // stopSwipe(event) {
  //   window.removeEventListener('pointermove', this.moveSlider);
  //   this.brandSliderLine.style.transition = '0.3s';
  // }

  // moveSlider(event) {
  //   this.currentSliderLinePosition = event.pageX;
  //   const offset =
  //     this.currentSliderLinePosition - this.startSliderLinePosition;

  //   this.setSliderLinePosition(offset);
  // }

  // setSliderLinePosition(shift) {
  //   this.brandSliderLine.style.transform = `translate3d(${shift}px, 0, 0)`;
  // }

  // Переключение табов
  getAllBrandsTabs(tabs) {
    this.brandsTabs = tabs;
  }

  switchTabs() {
    let currentMvideoTabs = [];
    let currentEldoradoTabs = [];

    this.brandsTabs.forEach((tab) => {
      tab.name === 'mvideo'
        ? currentMvideoTabs.push(...tab.elements)
        : currentEldoradoTabs.push(...tab.elements);
    });

    if (this.activeBrand === this.mvideoBrand) {
      currentMvideoTabs.forEach((item) => (item.style.opacity = '0'));
      currentEldoradoTabs.forEach((item) => (item.style.opacity = '0'));
      setTimeout(() => {
        currentMvideoTabs.forEach((item) => {
          item.classList.remove('hide');
          item.style.opacity = '1';
        });
        currentEldoradoTabs.forEach((item) => {
          item.classList.add('hide');
        });
      }, 300);
    }

    if (this.activeBrand === this.eldoradoBrand) {
      currentMvideoTabs.forEach((item) => (item.style.opacity = '0'));
      currentEldoradoTabs.forEach((item) => (item.style.opacity = '0'));

      setTimeout(() => {
        currentMvideoTabs.forEach((item) => {
          item.classList.add('hide');
        });
        currentEldoradoTabs.forEach((item) => {
          item.classList.remove('hide');
          item.style.opacity = '1';
        });
      }, 300);
    }
  }
}
