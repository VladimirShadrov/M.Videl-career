import { RetailPosition } from './retailPositionBlock';
import { retailPosition } from '../../index';
import { RetailQuote } from './retailQuote';
import { retailQuote } from '../../index';
import { RetailInternship } from './retailInternship';
import { retailIntern } from '../../index';
import { RetailAdvantages } from './retailAdvantages';
import { retailAdvantages } from '../../index';
import { RetailFooter } from './retailFooter';
import { retailFooter } from '../../index';

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

    this.activeBrand = 0;

    this.navigationButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (button.dataset.name === 'mvideo') {
          this.activeBrand = 0;
        } else {
          this.activeBrand = 1;
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
    this.mvideo = this.el.querySelectorAll('.mvideo');
    this.eldorado = this.el.querySelectorAll('.eldorado');
    this.positionSection = new RetailPosition(retailPosition);
    this.quoteSection = new RetailQuote(retailQuote);
    this.internshipSection = new RetailInternship(retailIntern);
    this.retailAdvantages = new RetailAdvantages(retailAdvantages);
    this.retailFooter = new RetailFooter(retailFooter);

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
    this.positionSection.switchBrand(this.activeBrand);
    this.quoteSection.switchTab(this.activeBrand);
    this.internshipSection.changeIcon(this.activeBrand);
    this.retailAdvantages.changeBrandColor(this.activeBrand);
    this.retailFooter.showActiveBrandTitle(this.activeBrand);
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
    const step = 100 / (this.slides.length / 2) + '%';
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
    const step = 100 / (this.slides.length / 2) + '%';
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
  switchTabs() {
    if (this.activeBrand === 0) {
      this.mvideo.forEach((item) => (item.style.opacity = '0'));
      this.eldorado.forEach((item) => (item.style.opacity = '0'));

      setTimeout(() => {
        this.mvideo.forEach((item) => {
          item.classList.remove('hide');
          item.style.opacity = '1';
        });
        this.eldorado.forEach((item) => {
          item.classList.add('hide');
          item.style.opacity = '1';
        });
      }, 300);
    }

    if (this.activeBrand === 1) {
      this.mvideo.forEach((item) => (item.style.opacity = '0'));
      this.eldorado.forEach((item) => (item.style.opacity = '0'));

      setTimeout(() => {
        this.mvideo.forEach((item) => {
          item.classList.add('hide');
          item.style.opacity = '1';
        });
        this.eldorado.forEach((item) => {
          item.classList.remove('hide');
          item.style.opacity = '1';
        });
      }, 300);
    }
  }
}
