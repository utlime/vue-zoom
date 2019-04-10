/* eslint-disable react/react-in-jsx-scope, react/no-this-in-sfc */

import { storiesOf } from '@storybook/vue';

import { VueZoom } from '../src';
// @ts-ignore
import image from './image.svg';

storiesOf('VueZoom with image', module)
  .add('default scale(1.5)', () => ({
    components: { VueZoom },
    data: () => ({ image }),
    template: '<vue-zoom><img :src="image" /></vue-zoom>',
  }))
  .add('custom scale 3', () => ({
    components: { VueZoom },
    data: () => ({ image, scale: 3 }),
    template: '<vue-zoom :scale="scale"><img :src="image" /></vue-zoom>',
  }))
  .add('fixed scale 600px', () => ({
    components: { VueZoom },
    data: () => ({ image, scale: '600px' }),
    template: `
      <div style="width: 300px">
        <vue-zoom :scale="scale">
          <img :src="image" />
        </vue-zoom>
      </div>`,
  }));

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

storiesOf('VueZoom with text', module)
  .add('default scale(1.5)', () => ({
    components: { VueZoom },
    data: () => ({ text }),
    template: '<vue-zoom>{{ text }}</vue-zoom>',
  }))
  .add('custom scale 3', () => ({
    components: { VueZoom },
    data: () => ({ text, scale: 3 }),
    template: '<vue-zoom :scale="scale">{{ text }}</vue-zoom>',
  }))
  .add('fixed scale 600px', () => ({
    components: { VueZoom },
    data: () => ({ text, scale: '600px' }),
    template: `
      <div style="width: 300px">
        <vue-zoom :scale="scale">{{ text }}</vue-zoom>
      </div>`,
  }));

/* eslint-enable react/react-in-jsx-scope */
