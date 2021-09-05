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
    this.mobileVideoRow = this.el.querySelector(
      '.find__video-slides-row-mobile'
    );

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

  playMobileVideo() {
    this.mobilePrevew.style.opacity = 0;
    this.mobilePrevew.style.zIndex = -1;

    setTimeout(() => {
      this.mobileVideo.classList.remove('hide');
      this.mobileVideo.play();
      this.mobileButton.style.background =
        "url('../images/find-vacancies/pause.svg') left / contain no-repeat";
      this.mobileButton.dataset.name = 'pause';
    }, 300);
  }

  pauseMobileVideo() {
    this.mobileVideo.pause();
    this.mobileButton.style.background =
      "url('../images/find-vacancies/play-mobile.svg') left / contain no-repeat";

    setTimeout(() => (this.mobileButton.dataset.name = 'play'), 50);
  }

  stopVideo() {
    this.mobileVideo.classList.add('hide');
    this.mobilePrevew.style.opacity = 1;
    this.mobilePrevew.style.zIndex = 0;
    this.mobileProgress.style.width = '0';
    this.mobileButton.style.background =
      "url('../images/find-vacancies/play-mobile.svg') left / contain no-repeat";

    setTimeout(() => {
      this.mobileButton.dataset.name = 'play';
      this.mobileVideo.currentTime = '0';
    }, 50);
  }

  showProgressMobileVideo() {
    let interval = setInterval(() => {
      const progress =
        Math.floor(
          ((this.mobileVideo.currentTime + 0.0001) /
            this.mobileVideo.duration) *
            100
        ) + '%';

      this.mobileProgress.style.width = progress;

      if (this.mobileVideo.currentTime === this.mobileVideo.duration) {
        clearInterval(interval);
        this.stopVideo();
      }
    }, 10);
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

  if (event.target.classList.contains('find__video-slide-mobile-button')) {
    const currentVideoSlide = event.target.closest('.find__video-slide-mobile');
    this.mobileVideo = currentVideoSlide.querySelector(
      '.find__video-player-mobile'
    );
    this.mobilePrevew = currentVideoSlide.querySelector(
      '.find__video-slide-mobile-image'
    );
    this.mobileButton = currentVideoSlide.querySelector(
      '.find__video-slide-mobile-button'
    );
    this.mobileProgress = currentVideoSlide.querySelector(
      '.find__mobile-progress'
    );

    if (event.target.dataset.name === 'play') {
      this.playMobileVideo();
      this.showProgressMobileVideo();
    }

    if (event.target.dataset.name === 'pause') {
      this.pauseMobileVideo();
    }
  }
}
