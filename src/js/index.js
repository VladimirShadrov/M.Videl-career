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

import { Vacancy } from './components/itHubPage/vacancy';
import { Listing } from './components/vacancyListingPage/listing';
import { Advantages } from './components/itHubPage/advantages';
import { CareerUpgrade } from './components/itHubPage/upgrade';

// Перенос изображений
require.context('../images', true, /\.(png|jpg|svg|gif)$/);
require.context('../fonts', true, /\.(ttf|woff|woff2)$/);

const itHubPage = document.querySelector('.it-hub');
const profession = document.querySelector('.profession');
const listingPage = document.querySelector('.listing');
const ourAdvantages = document.querySelector('.why-are-we');
const upgradeSection = document.querySelector('.upgrade');

if (itHubPage && itHubPage !== null && itHubPage !== undefined) {
  new Vacancy(profession);
  new Advantages(ourAdvantages);
  new CareerUpgrade(upgradeSection);
}

if (listingPage && listingPage !== null && listingPage !== undefined) {
  new Listing(listingPage);
}
