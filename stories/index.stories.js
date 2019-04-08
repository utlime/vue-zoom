/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';

import VueZoom from '../dist/VueZoom';
import image from './image.svg';

storiesOf('VueZoom', module).add('with image', () => ({
  components: { VueZoom },
  data: () => ({ image }),
  template: '<vue-zoom><img :src="image" /></vue-zoom>',
}));

/* eslint-enable react/react-in-jsx-scope */
