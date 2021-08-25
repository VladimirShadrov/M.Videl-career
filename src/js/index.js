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

import { Vacancy } from '../js/components/vacancy';

// Перенос изображений
require.context('../images', true, /\.(png|jpg|svg|gif)$/);
require.context('../fonts', true, /\.(ttf|woff|woff2)$/);

const profession = document.querySelector('.profession');

new Vacancy(profession);
