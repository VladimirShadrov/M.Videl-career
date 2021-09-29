import '../styles/styles.scss';
import '../styles/header.scss';
import '../styles/createFuture.scss';
import '../styles/advantages.scss';
import '../styles/goal.scss';
import '../styles/profession.scss';
import '../styles/direction.scss';
import '../styles/upgrade.scss';
import '../styles/find.scss';
import '../styles/intern.scss';
import '../styles/footer.scss';
import '../styles/flyout.scss';
import '../styles/listing.scss';
import '../styles/form.scss';
import '../styles/direct-link.scss';
import '../styles/retail/listing-metro.scss';
import '../styles/retail/retail-main.scss';

import { Vacancy } from './components/itHubPage/vacancy';
import { Listing } from './components/vacancyListingPage/listing';
import { Advantages } from './components/itHubPage/advantages';
import { CareerUpgrade } from './components/itHubPage/upgrade';
import { VideoPlayer } from './components/itHubPage/videoPlayer';
import { Form } from './components/itHubPage/form';
import { RunningLine } from './components/itHubPage/runningLine';
import { Header } from './components/itHubPage/header';
import { ListingFilters } from './components/vacancyListingPage/listingFilters';

// Перенос изображений
require.context('../images', true, /\.(png|jpg|svg|gif)$/);
require.context('../fonts', true, /\.(ttf|woff|woff2)$/);

const itHubPage = document.querySelector('.it-hub');
const profession = document.querySelector('.profession');
const listingPage = document.querySelector('.listing');
const ourAdvantages = document.querySelector('.why-are-we');
const upgradeSection = document.querySelector('.upgrade');
const videoPlayerBlock = document.querySelector('.find');
const form = document.querySelector('.form');
const directLink = document.querySelector('.direct-link');
const goalBlock = document.querySelector('.goal');
const runningLine = document.querySelector('.find__title');
const headerIt = document.querySelector('.it-header');
const listingPageFilters = document.querySelector(
  '.listing-top__filters-wrapper'
);

new Vacancy(profession);
new Advantages(ourAdvantages);
new CareerUpgrade(upgradeSection);
new VideoPlayer(videoPlayerBlock);
new Form(form);
new RunningLine(runningLine);
const header = new Header(headerIt);
new Listing(listingPage);
new Form(form);
new ListingFilters(listingPageFilters);

document.body.addEventListener('click', (event) => {
  header.closeSelect();

  if (
    event.target.classList.contains('it-header__button') ||
    event.target.classList.contains('intern__header-link')
  ) {
    event.preventDefault();
    openApplicationForm();
  }

  if (event.target.classList.contains('create-future__button')) {
    event.preventDefault();
    smothScrollingToBlock(goalBlock);
  }

  if (event.target.classList.contains('goal__button')) {
    event.preventDefault();
    smothScrollingToBlock(profession);
  }
});

// Открыть анкету выбора вакансии
function openApplicationForm() {
  const form = document.querySelector('.form');

  form.classList.add('form-active');

  setTimeout(() => {
    document.body.style.overflow = 'hidden';
    form.firstElementChild.style.background = 'rgba(0, 0, 0, 0.8)';
  }, 300);
}

// Скролл до блока
function smothScrollingToBlock(block) {
  const topOffset = block.offsetTop;

  let interval = setInterval(() => {
    document.scrollingElement.scrollTop += 10;

    if (document.scrollingElement.scrollTop >= topOffset) {
      clearInterval(interval);
    }
  }, 1);
}
