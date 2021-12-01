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
import '../styles/main-page/main-page-stage.scss';
import '../styles/main-page/main-division.scss';
import '../styles/main-page/main-mission.scss';
import '../styles/main-page/main-video.scss';
import '../styles/main-page/main-awards.scss';
import '../styles/main-page/main-running-line.scss';
import '../styles/main-page/main-news.scss';
import '../styles/main-page/main-sustainability.scss';
import '../styles/main-page/main-stability.scss';
import '../styles/logistic/logistic-stage.scss';

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
import { ListingVacancyMapBlock } from './components/vacancyListingPage/listingPageMapBlock';

// Импорт классов страницы Розницы
import { CreateRetailFutureComponent } from './components/retail/createRetailFuture';
import { RetailMissionBlock } from './components/retail/retailMissionBlock';
import { RetailBrandsBlock } from './components/retail/retailBrandsBlock';
import { RetailPositionBlock } from './components/retail/retailPositionBlock';
import { RetailQuoteBlock } from './components/retail/retailQuote';
import { RetailInternshipBlock } from './components/retail/retailInternship';
import { RetailAdvantagesBlock } from './components/retail/retailAdvantages';
import { RetailFooter } from './components/retail/retailFooter';

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

new Vacancy(profession);
new Advantages(ourAdvantages);
new CareerUpgrade(upgradeSection);
new VideoPlayer(videoPlayerBlock);
new Form(form);
new RunningLine(runningLine);
const header = new Header(headerIt);
new Listing(listingPage);
new Form(form);
new ListingFilters('.listing-top__filters-wrapper');
new Page404(page404);
new ListingVacancyMapBlock(
  '.listing-metro__content-map',
  '.listing-metro__content-list',
  '.listing-top__filter-list-wrapper'
);

// Инициализация классов страницы Розницы
const retailCreateFuture = new CreateRetailFutureComponent('.retail__preview');
const retailMissionBlock = new RetailMissionBlock('.retail__mission');
const retailBrandsBlock = new RetailBrandsBlock('.brands');
const retailPositionBlock = new RetailPositionBlock('.retail__position');
const retailQuote = new RetailQuoteBlock('.retail__quote-container');
const retailInternshipBlock = new RetailInternshipBlock('.retail__internship');
const retailAdvantagesBlock = new RetailAdvantagesBlock('.retail__advantages');
const retailFooter = new RetailFooter('.retail__footer');

retailCreateFuture.registerParameters(headerIt, retailMissionBlock);
retailMissionBlock.registerParameters(retailBrandsBlock, headerIt);
retailBrandsBlock.getAllBrandsTabs([
  { name: 'mvideo', elements: retailBrandsBlock.mvideoFromBrandsPage },
  { name: 'eldorado', elements: retailBrandsBlock.eldoradoFromBrandsPage },
  { name: 'mvideo', elements: retailPositionBlock.mvideoFromPositionPage },
  { name: 'eldorado', elements: retailPositionBlock.eldoradoFromPositionPage },
  { name: 'mvideo', elements: retailQuote.mvideoFromQuoteBlock },
  { name: 'eldorado', elements: retailQuote.eldoradoFromQuoteBlock },
  {
    name: 'mvideo',
    elements: retailInternshipBlock.mvideoFromInternshipPage,
  },
  {
    name: 'eldorado',
    elements: retailInternshipBlock.eldoradoFromInternshipPage,
  },
  {
    name: 'mvideo',
    elements: retailAdvantagesBlock.mvideoFromRetailAdvantages,
  },
  {
    name: 'eldorado',
    elements: retailAdvantagesBlock.eldoradoFromRetailAdvantages,
  },
  { name: 'mvideo', elements: retailFooter.mvideoFromFooter },
  { name: 'eldorado', elements: retailFooter.eldoradoFromFooter },
]);

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
    smothScrollingToBlock(goalBlock, headerItPage);
  }

  if (event.target.classList.contains('goal__button')) {
    event.preventDefault();
    smothScrollingToBlock(profession, headerItPage);
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

// Отложенная загрузка изображений
const lazyImages = document.querySelectorAll('[data-src]');

function isIntersecting(target) {
  const docViewTop = window.pageYOffset;
  const docViewBottom = docViewTop + window.innerHeight;
  const elemTop = docViewTop + target.getBoundingClientRect().top;
  const elemBottom = elemTop + target.height;

  return (
    (elemTop <= docViewBottom && elemTop >= docViewTop) ||
    (elemBottom <= docViewBottom && elemBottom >= docViewTop)
  );
}

const checkImages = function () {
  lazyImages.forEach((target) => {
    if (
      isIntersecting(target) &&
      target.parentNode.classList.contains('loading')
    ) {
      target.src = target.getAttribute('data-src');
      // target.onload = () => {
      //   target.parentNode.classList.remove('loading');
      //   target.removeAttribute('data-src');
      // };
      target.parentNode.classList.remove('loading');
      target.removeAttribute('data-src');
    }
  });
};

// window.onload = checkImages;
// window.onscroll = checkImages;
window.addEventListener('scroll', checkImages);
window.addEventListener('DOMContentLoaded', checkImages);

// if (flyoutVacancy) {
//   flyoutVacancy.addEventListener('scroll', checkImages);
// }
