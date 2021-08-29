export class ItHubSlider {
  constructor(slideNumber, slides, slideRowPosition, row, slideCounter) {
    this.currentSlideNumber = slideNumber;
    this.slides = slides;
    this.currentSlideRowPosition = slideRowPosition;
    this.slidesRow = row;
    this.slidesCounterField = slideCounter;
  }

  showNextSlide() {
    if (this.currentSlideNumber <= this.slides.length) {
      const activeSlide = this.slides.find((item) => {
        return item.classList.contains('swiper-slide-active');
      });

      const currentIndes = +activeSlide.attributes[
        'aria-label'
      ].textContent.slice(0, 1);

      this.currentSlideNumber = +this.slides[currentIndes].attributes[
        'aria-label'
      ].textContent.slice(0, 1);

      let slideWidht = parseFloat(activeSlide.style.width);

      this.currentSlideRowPosition = currentIndes * slideWidht;
      this.slidesRow.style.transition = 'transform 0.3s';
      this.slidesRow.style.transform = `translate3d(${
        -this.currentSlideRowPosition + 'px'
      }, 0px, 0px)`;

      this.slides.forEach((slide) => {
        slide.classList.remove('swiper-slide-active');
      });

      this.slides[currentIndes].classList.add('swiper-slide-active');
    }
  }

  showPreviousSlide() {
    if (this.currentSlideNumber >= 1) {
      const activeSlide = this.slides.find((item) => {
        return item.classList.contains('swiper-slide-active');
      });

      const currentIndes = +activeSlide.attributes[
        'aria-label'
      ].textContent.slice(0, 1);

      this.currentSlideNumber = +this.slides[currentIndes - 2].attributes[
        'aria-label'
      ].textContent.slice(0, 1);

      let slideWidht = parseFloat(activeSlide.style.width);

      this.currentSlideRowPosition = (currentIndes - 2) * slideWidht;
      this.slidesRow.style.transition = 'transform 0.3s';
      this.slidesRow.style.transform = `translate3d(${
        -this.currentSlideRowPosition + 'px'
      }, 0px, 0px)`;

      this.slides.forEach((slide) => {
        slide.classList.remove('swiper-slide-active');
      });

      this.slides[currentIndes - 2].classList.add('swiper-slide-active');
    }
  }

  setCurrentSlideNumber() {
    this.slidesCounterField.textContent = this.currentSlideNumber;
  }
}
