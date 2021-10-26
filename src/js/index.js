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
import '../styles/retail/retail-preview.scss';
import '../styles/retail/retail-mission.scss';
import '../styles/retail/retail-why-us.scss';
import '../styles/retail/retail-brands.scss';
import '../styles/retail/retail-position.scss';
import '../styles/retail/retail-quote.scss';
import '../styles/retail/retail-internship.scss';
import '../styles/retail/retail-advantages.scss';
import '../styles/retail/retail-upgrade.scss';
import '../styles/retail/retail-footer.scss';
import '../styles/404-page/404-page.scss';

import { Vacancy } from './components/itHubPage/vacancy';
import { Listing } from './components/vacancyListingPage/listing';
import { Advantages } from './components/itHubPage/advantages';
import { CareerUpgrade } from './components/itHubPage/upgrade';
import { VideoPlayer } from './components/itHubPage/videoPlayer';
import { Form } from './components/itHubPage/form';
import { RunningLine } from './components/itHubPage/runningLine';
import { Header } from './components/itHubPage/header';
import { ListingFilters } from './components/vacancyListingPage/listingFilters';
import { Page404 } from './components/page404/animationPage404';

// Импорт классов страницы Розницы
import { CreateRetailFutureComponent } from './components/retail/createRetailFuture';
import { RetailMission } from './components/retail/retailMissionBlock';
import { RetailBrands } from './components/retail/retailBrandsBlock';

// Перенос изображений
require.context('../images', true, /\.(png|jpg|svg|gif)$/);
require.context('../fonts', true, /\.(ttf|woff|woff2)$/);

// Header - it page
export const headerItPage = document.querySelector('.it-header');

// Страница IT
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

// Страница 404
const page404 = document.querySelector('.page-404');

// Страница Розницы
const createFutureBlock = document.querySelector('.retail__preview');
export const retailMissionBlock = document.querySelector('.retail__mission');
export const retailBrands = document.querySelector('.brands');

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
new Page404(page404);

// Инициализация классов страницы Розницы
new CreateRetailFutureComponent(createFutureBlock);
new RetailMission(retailMissionBlock);

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
export function smothScrollingToBlock(block, header) {
  const offset = 16;
  let headerHeight = header.clientHeight + offset;

  if (window.innerWidth <= 479) {
    headerHeight = offset;
  }
  const topOffset = block.offsetTop - headerHeight;

  let interval = setInterval(() => {
    document.scrollingElement.scrollTop += 10;

    if (document.scrollingElement.scrollTop >= topOffset) {
      clearInterval(interval);
    }
  }, 1);
}
