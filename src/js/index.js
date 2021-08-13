import '../styles/styles.scss';
import '../styles/header.scss';
import '../styles/createFuture.scss';
import '../styles/advantages.scss';
import '../styles/goal.scss';
import '../styles/profession.scss';

// Перенос изображений
require.context('../images', true, /\.(png|jpg|svg|gif)$/);
require.context('../fonts', true, /\.(ttf|woff|woff2)$/);
