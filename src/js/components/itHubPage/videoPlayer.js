export class VideoPlayer {
  constructor(el) {
    this.el = el;
    this.video = this.el.querySelector('.find__video');
    this.videoBlock = this.el.querySelector('.find__block-video');
    this.videoContainer = this.el.querySelector('.find__video-container');
    this.controllsBlock = this.el.querySelector('.find__video-play-box');
    this.videoRow = this.el.querySelector('.find__video-slides-row');
    this.buttonNext = this.el.querySelector('.find__arrow-next');
    this.videoSlides = this.el.querySelectorAll('.find__video-slide');
    this.videoControl = this.el.querySelector('.find__video-control');
    this.soundControl = this.el.querySelector('.find__sound-control');

    // mobile items
    this.mobileVideoSlides = Array.from(
      this.el.querySelectorAll('.find__video-slide-mobile')
    );

    // Swiper
    // this.desktopSlider = new Swiper('.desktop-slider', {});

    this.mobileSlider = new Swiper('.mobile-slider', {
      slidesPerView: 'auto',
      spaceBetween: 16,
      loop: true,
    });

    this.init();
  }

  init() {
    this.el.addEventListener('mousedown', videoBlockClickHandler.bind(this));
  }

  cleanScreen() {
    this.controllsBlock.classList.add('find__video-play-box-active');
    this.videoRow.classList.add('find__video-slides-row-active');
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
    this.videoRow.classList.remove('find__video-slides-row-active');
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

  selectVideo(event) {
    this.videoSlides.forEach((slide) => {
      slide.classList.remove('find__video-slide-active');
    });

    const currentVideo = event.target.dataset.name;

    event.target.classList.add('find__video-slide-active');
    this.hideVideo();
    this.video.firstElementChild.src = currentVideo;
    this.showControllsOnScreen();
    this.videoBlock.classList.add('find__block-video-active');

    this.video.load();
    this.videoControl.style.background =
      "url('./images/find-vacancies/pause.svg') center / contain no-repeat";

    setTimeout(() => (this.videoControl.dataset.name = 'pause'), 100);
  }

  putOnPause() {
    this.video.pause();
    this.videoRow.classList.remove('find__video-slides-row-active');
    this.buttonNext.classList.remove('find__arrow-next-active');
    this.videoContainer.lastElementChild.style.display = 'none';
    this.videoControl.style.background =
      "url('./images/find-vacancies/play-control.svg') center / contain no-repeat";
    this.setVideoProgress();

    setTimeout(() => (this.videoControl.dataset.name = 'play'), 100);
  }

  playVideoContinue() {
    this.cleanScreen();
    this.scrollToVideoBlock();
    this.videoControl.style.background =
      "url('./images/find-vacancies/pause.svg') center / contain no-repeat";
    this.videoContainer.lastElementChild.style.display = 'none';

    setTimeout(() => (this.videoControl.dataset.name = 'pause'), 100);
    this.video.play();
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
    const progress =
      Math.floor(
        ((this.video.currentTime + 0.0001) / this.video.duration) * 100
      ) + '%';
    const activeItem = this.el.querySelector('.find__video-slide-active');
    activeItem.lastElementChild.style.width = progress;
    return progress;
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
    }, 300);
  }

  pauseMobileVideo(video, button) {
    video.pause();
    button.style.background =
      "url('../images/find-vacancies/play-mobile.svg') left / contain no-repeat";

    setTimeout(() => (button.dataset.name = 'play'), 50);
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

      console.log(activeSlide);

      if (
        event.target === mobileButton &&
        event.target.dataset.name === 'play'
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
        event.target === mobileButton &&
        event.target.dataset.name === 'pause'
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

  if (event.target.classList.contains('find__video-slide')) {
    this.selectVideo(event);
  }

  if (
    event.target.classList.contains('find__video-control') &&
    event.target.dataset.name === 'pause'
  ) {
    this.putOnPause();
  }

  if (
    event.target.classList.contains('find__video-control') &&
    event.target.dataset.name === 'play'
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
}
