export class VideoPlayer {
  constructor(el) {
    this.el = el;
    this.video = this.el.querySelector('.find__video');
    this.videoBlock = this.el.querySelector('.find__block-video');
    this.videoContainer = this.el.querySelector('.find__video-container');
    this.controllsBlock = this.el.querySelector('.find__video-play-box');
    this.videoDesktopContainer = this.el.querySelector(
      '.find__video-slides-container'
    );
    this.videoRow = this.el.querySelector('.find__video-slides-row');
    this.buttonNext = this.el.querySelector('.find__arrow-next');
    this.videoSlides = this.el.querySelectorAll('.find__video-slide');
    this.videoControl = this.el.querySelector('.find__video-control');
    this.soundControl = this.el.querySelector('.find__sound-control');
    this.prevewImage = this.el.querySelector('.find__video-preview');
    this.prevewText = this.el.querySelector('.find__video-title');

    // mobile items
    this.mobileVideoSlides = Array.from(
      this.el.querySelectorAll('.find__video-slide-mobile')
    );

    // Swiper;
    this.desktopSlider = new Swiper('.desktop-slider', {
      slidesPerView: 'auto',
      loop: true,
    });

    this.mobileSlider = new Swiper('.mobile-slider', {
      slidesPerView: 'auto',
      spaceBetween: 16,
      loop: true,
    });

    this.init();
    this.addClickDesktopSwiper();
    this.setDesktopSliderPrevew();
    this.resizePrevewImage();
  }

  init() {
    this.el.addEventListener('mousedown', videoBlockClickHandler.bind(this));
  }

  addClickDesktopSwiper() {
    this.desktopSlider.on('click', (event) => {
      this.selectVideo(event.clickedSlide);
      this.setDesktopSliderPrevew();
    });
  }

  setDesktopSliderPrevew() {
    const slides = Array.from(this.el.querySelectorAll('.find__video-slide'));
    const activeSlide = slides.find((slide) =>
      slide.classList.contains('find__video-slide-active')
    );
    const prevewImage = activeSlide.dataset.image;
    const prevewText = activeSlide.dataset.prevew;

    this.prevewImage.style.width = document.documentElement.clientWidth + 'px';
    this.prevewImage.src = prevewImage;
    this.prevewText.textContent = prevewText;
  }

  resizePrevewImage() {
    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth >= 761) {
        this.prevewImage.style.width =
          document.documentElement.clientWidth + 'px';
      }
    });
  }

  cleanScreen() {
    this.controllsBlock.classList.add('find__video-play-box-active');
    this.videoDesktopContainer.classList.add(
      'find__video-slides-container-active'
    );
    this.buttonNext.classList.add('find__arrow-next-active');
  }

  setFullScreenHeight() {
    this.videoBlock.classList.add('find__block-video-active');
    this.videoContainer.classList.add('find__video-container-active');
    this.videoContainer.lastElementChild.style.display = 'none';
    this.video.style.display = 'block';

    this.video.play();
  }

  hideVideo() {
    this.video.style.display = 'none';
  }

  showControllsOnScreen() {
    this.videoBlock.classList.remove('find__block-video-active');
    this.videoContainer.classList.remove('find__video-container-active');
    this.controllsBlock.classList.remove('find__video-play-box-active');
    this.videoDesktopContainer.classList.remove(
      'find__video-slides-container-active'
    );
    this.buttonNext.classList.remove('find__arrow-next-active');
    this.videoContainer.lastElementChild.style.display = 'block';
  }

  scrollToVideoBlock() {
    const topOffset = this.videoBlock.getBoundingClientRect().top;

    window.scrollBy({
      top: topOffset,
      behavior: 'smooth',
    });
  }

  selectVideo(eventObject) {
    const desktopSlides = this.el.querySelectorAll('.find__video-slide');

    desktopSlides.forEach((slide) => {
      slide.classList.remove('find__video-slide-active');
    });

    const currentVideo = eventObject.dataset.name;

    eventObject.classList.add('find__video-slide-active');

    eventObject.lastElementChild.style.width = this.video.currentTime;

    this.video.firstElementChild.src = currentVideo;
    this.stopDesktopVideo();
  }

  stopDesktopVideo() {
    this.hideVideo();
    this.showControllsOnScreen();
    this.video.load();
    this.videoControl.style.background =
      "url('./images/find-vacancies/pause.svg') center / contain no-repeat";

    setTimeout(() => (this.videoControl.dataset.name = 'pause'), 100);
  }

  putOnPause() {
    this.video.pause();
    this.videoDesktopContainer.classList.remove(
      'find__video-slides-container-active'
    );
    this.buttonNext.classList.remove('find__arrow-next-active');
    this.videoContainer.lastElementChild.style.display = 'none';
    this.videoControl.style.background =
      "url('./images/find-vacancies/play-control.svg') center / contain no-repeat";
    this.setVideoProgress();

    setTimeout(() => {
      this.videoControl.dataset.name = 'play';
      this.video.dataset.name = 'play';
    }, 100);
  }

  playVideoContinue() {
    this.cleanScreen();
    this.scrollToVideoBlock();
    this.videoControl.style.background =
      "url('./images/find-vacancies/pause.svg') center / contain no-repeat";
    this.videoContainer.lastElementChild.style.display = 'none';
    this.video.play();

    setTimeout(() => {
      this.videoControl.dataset.name = 'pause';
      this.video.dataset.name = 'pause';
    }, 100);
  }

  turnOfSound() {
    this.video.muted = true;
    this.soundControl.textContent = 'Включить звук';
    setTimeout(() => (this.soundControl.dataset.name = 'turn-on'), 100);
  }

  turnOnSound() {
    this.video.muted = false;
    this.soundControl.textContent = 'Выключить звук';
    setTimeout(() => (this.soundControl.dataset.name = 'turn-of'), 100);
  }

  setVideoProgress() {
    let interval = setInterval(() => {
      const progress =
        Math.floor(
          ((this.video.currentTime + 0.0001) / this.video.duration) * 100
        ) + '%';
      const activeItem = this.el.querySelector('.find__video-slide-active');
      activeItem.lastElementChild.style.width = progress;

      if (this.video.currentTime === this.video.duration) {
        clearInterval(interval);
        this.stopDesktopVideo();
        activeItem.lastElementChild.style.width = progress;
      }
    }, 100);
  }

  playMobileVideo(prevew, video, button) {
    prevew.style.opacity = 0;
    prevew.style.zIndex = -1;

    setTimeout(() => {
      video.classList.remove('hide');
      video.play();
      button.style.background =
        "url('../images/find-vacancies/pause.svg') left / contain no-repeat";
      button.dataset.name = 'pause';
      video.dataset.name = 'pause';
    }, 300);
  }

  pauseMobileVideo(video, button) {
    video.pause();
    button.style.background =
      "url('../images/find-vacancies/play-mobile.svg') left / contain no-repeat";

    setTimeout(() => {
      button.dataset.name = 'play';
      video.dataset.name = 'play';
    }, 50);
  }

  stopMobileVideo(video, prevew, progress, button) {
    video.classList.add('hide');
    video.pause();
    prevew.style.opacity = 1;
    prevew.style.zIndex = 0;
    progress.style.width = '0';
    button.style.background =
      "url('../images/find-vacancies/play-mobile.svg') left / contain no-repeat";

    setTimeout(() => {
      button.dataset.name = 'play';
      video.dataset.name = 'play';
      video.currentTime = '0';
    }, 50);
  }

  showProgressMobileVideo(video, progress, prevew, button) {
    let interval = setInterval(() => {
      const currentProgress =
        Math.floor(((video.currentTime + 0.0001) / video.duration) * 100) + '%';

      progress.style.width = currentProgress;

      if (video.currentTime === video.duration) {
        clearInterval(interval);
        this.stopMobileVideo(video, prevew, progress, button);
      }
    }, 10);
  }

  swichMobileVideoPlayer() {
    const videoSlides = Array.from(
      this.el.querySelectorAll('.find__video-slide-mobile')
    );
    const activeSlide = videoSlides.find((slide) =>
      slide.classList.contains('active-video')
    );
    const inactiveSlides = videoSlides.filter(
      (slide) => !slide.classList.contains('active-video')
    );

    inactiveSlides.forEach((slide) => {
      let video = slide.querySelector('.find__video-player-mobile');
      let prevew = slide.querySelector('.find__video-slide-mobile-image');
      let button = slide.querySelector('.find__video-slide-mobile-button');
      let progress = slide.querySelector('.find__mobile-progress');
      this.stopMobileVideo(video, prevew, progress, button);
    });

    activeSlide.addEventListener('click', (event) => {
      const mobileVideo = activeSlide.querySelector(
        '.find__video-player-mobile'
      );
      const mobilePrevew = activeSlide.querySelector(
        '.find__video-slide-mobile-image'
      );
      const mobileButton = activeSlide.querySelector(
        '.find__video-slide-mobile-button'
      );
      const mobileProgress = activeSlide.querySelector(
        '.find__mobile-progress'
      );

      if (
        (event.target === mobileButton &&
          event.target.dataset.name === 'play') ||
        (event.target.classList.contains('find__video-player-mobile') &&
          event.target.dataset.name === 'play')
      ) {
        this.playMobileVideo(mobilePrevew, mobileVideo, mobileButton);
        this.showProgressMobileVideo(
          mobileVideo,
          mobileProgress,
          mobilePrevew,
          mobileButton
        );
      }

      if (
        (event.target === mobileButton &&
          event.target.dataset.name === 'pause') ||
        (event.target.classList.contains('find__video-player-mobile') &&
          event.target.dataset.name === 'pause')
      ) {
        this.pauseMobileVideo(mobileVideo, mobileButton);
      }
    });
  }
}

function videoBlockClickHandler(event) {
  if (event.target.classList.contains('find__video-play-button')) {
    event.preventDefault();
    this.cleanScreen();
    this.scrollToVideoBlock();

    setTimeout(() => this.setVideoProgress(), 50);
    setTimeout(() => this.setFullScreenHeight(), 300);
  }

  if (
    (event.target.classList.contains('find__video-control') &&
      event.target.dataset.name === 'pause') ||
    (event.target.classList.contains('find__video') &&
      this.video.dataset.name === 'pause')
  ) {
    this.putOnPause();
  }

  if (
    (event.target.classList.contains('find__video-control') &&
      event.target.dataset.name === 'play') ||
    (event.target.classList.contains('find__video') &&
      this.video.dataset.name === 'play')
  ) {
    this.playVideoContinue();
  }

  if (
    event.target.classList.contains('find__sound-control') &&
    event.target.dataset.name === 'turn-of'
  ) {
    this.turnOfSound();
  }

  if (
    event.target.classList.contains('find__sound-control') &&
    event.target.dataset.name === 'turn-on'
  ) {
    this.turnOnSound();
  }

  if (
    event.target.classList.contains('find__video-slide-mobile-button') &&
    !event.target
      .closest('.find__video-slide-mobile')
      .classList.contains('active-video')
  ) {
    const dublicates = Array.from(
      this.el.querySelectorAll('.swiper-slide-duplicate')
    );

    const slides = [...dublicates, ...this.mobileVideoSlides];

    slides.forEach((slide) => slide.classList.remove('active-video'));
    event.target
      .closest('.find__video-slide-mobile')
      .classList.add('active-video');

    this.swichMobileVideoPlayer();
  }

  if (event.target.classList.contains('find__arrow-next')) {
    this.desktopSlider.slideNext();
  }
}
