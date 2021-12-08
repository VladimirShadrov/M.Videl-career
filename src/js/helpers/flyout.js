export class FlyoutFunctional {
  constructor(flyout) {
    this.flyout = flyout;
    this.flyoutSideBar = this.flyout.querySelector('.flyout__side-bar');
    this.flyOutContentBar = this.flyout.querySelector('.vacancy');
    this.flyOutForm = this.flyout.querySelector('.vacancy__form');
    this.vacancyCopyLink = this.flyout.querySelector(
      '.vacancy__header-head-copy'
    );
    this.newsSlider;

    this.progressBar = this.flyout.querySelector('.vacancy__progress-bar');
    this.progressRadius = this.progressBar.r.baseVal.value;
    this.progressBarLength = 2 * Math.PI * this.progressRadius;

    this.progressBar.style.strokeDasharray = `${this.progressBarLength} ${this.progressBarLength}`;
    this.progressBar.style.strokeDashoffset = this.progressBarLength;
    this.video = this.flyout.querySelector('.vacancy__video-preview');
    this.videoContainer = this.flyout.querySelector(
      '.vacancy__video-container'
    );
    this.btnMuted = this.flyout.querySelector('.vacancy__video-sound-muted');
    this.btnLoud = this.flyout.querySelector('.vacancy__video-sound-loud');

    this.vacancyCopyLink.addEventListener('click', this.copyLink.bind(this));
  }

  openFlyout() {
    this.flyout.classList.add('flyout__active');
    this.flyOutContentBar.scrollTop = 0;

    setTimeout(() => {
      document.body.style.overflow = 'hidden';
    }, 200);

    setTimeout(() => {
      this.flyoutSideBar.style.background = 'rgba(0, 0, 0, 0.8)';
    }, 300);
  }

  flyOutInit() {
    this.flyout.addEventListener('click', (event) => {
      if (
        event.target.classList.contains('vacancy__header-head-link-main') ||
        event.target.classList.contains('flyout__side-bar')
      ) {
        this.closeFlyout(event);
      }

      if (event.target.classList.contains('vacancy__headline-link')) {
        event.preventDefault();
        this.scrollToForm(this.flyOutForm);
      }

      if (event.target.classList.contains('vacancy__news-btn-prev')) {
        this.newsSlider.slidePrev();
      }

      if (event.target.classList.contains('vacancy__news-btn-next')) {
        this.newsSlider.slideNext();
      }

      if (
        (event.target.classList.contains('vacancy__video-preview') &&
          this.videoContainer.dataset.name === 'muted') ||
        (event.target.classList.contains('vacancy__video-sound') &&
          this.videoContainer.dataset.name === 'muted')
      ) {
        this.video.muted = false;
        this.btnMuted.classList.add('hide');
        this.btnLoud.classList.remove('hide');
        this.videoContainer.dataset.name = 'loud';
      } else if (
        (event.target.classList.contains('vacancy__video-preview') &&
          this.videoContainer.dataset.name === 'loud') ||
        (event.target.classList.contains('vacancy__video-sound') &&
          this.videoContainer.dataset.name === 'loud')
      ) {
        this.video.muted = true;
        this.btnMuted.classList.remove('hide');
        this.btnLoud.classList.add('hide');
        this.videoContainer.dataset.name = 'muted';
      }
    });
  }

  closeFlyout(event) {
    event.preventDefault();
    this.flyoutSideBar.style.background = 'transparent';
    this.stopFlyoutVideo();

    setTimeout(() => {
      document.body.style.overflow = 'visible';
    }, 200);

    setTimeout(() => {
      this.flyout.classList.remove('flyout__active');
    }, 300);
  }

  scrollToForm(block) {
    const topOffset = block.offsetTop - 16;

    let interval = setInterval(() => {
      this.flyOutContentBar.scrollTop += 10;

      if (this.flyOutContentBar.scrollTop >= topOffset) {
        clearInterval(interval);
      }
    }, 1);
  }

  newsSliderInit() {
    if (this.flyout.clientWidth >= 671) {
      this.newsSlider = new Swiper('.newsSlider', {
        slidesPerView: 2.5,
        spaceBetween: 16,
        loop: true,
        breakpoints: {
          767: {
            slidesPerView: 2.7,
          },

          1024: {
            slidesPerView: 2.2,
          },
          1440: {
            slidesPerView: 2.7,
          },
        },
      });
    }
  }

  resizeFlyout() {
    window.addEventListener('resize', () => {
      if (this.flyout.clientWidth >= 671) {
        this.newsSliderInit();
      }
    });
  }

  async copyLink(event) {
    event.preventDefault();
    const link = document.URL;

    await navigator.clipboard.writeText(link);
  }

  setVideoProgress() {
    if (this.video.autoplay === true) {
      setInterval(() => {
        const progress = (this.video.currentTime / this.video.duration) * 100;
        let offset =
          this.progressBarLength - (progress / 100) * this.progressBarLength;
        this.progressBar.style.strokeDashoffset = offset;

        if (this.video.currentTime === this.video.duration) {
          this.video.currentTime = 0;
        }
      }, 50);
    }
  }

  playFlyoutVideo() {
    this.videoContainer.classList.remove('loading');
    this.video.src =
      'https://career.dev64.ru/wp-content/themes/career_theme/assets/images/flyout/flyout-intro/video/analytic-video-preview.mp4';
    this.video.setAttribute('autoplay', true);
    this.setVideoProgress();
  }

  stopFlyoutVideo() {
    this.video.pause();

    setTimeout(() => {
      this.video.removeAttribute('autoplay');
      this.videoContainer.classList.add('loading');
      this.videoContainer.dataset.name = 'muted';
      this.video.src =
        '/wp-content/themes/career_theme/assets/images/Lazy-loading/1x1.png';
      this.btnMuted.classList.remove('hide');
      this.btnLoud.classList.add('hide');
      this.video.muted = true;
    }, 300);
  }
}
