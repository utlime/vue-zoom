# vue-zoom
vue zoom component

# installing
`npm i @utlime/vue-zoom`

# simple example
```vue 
<template>
  <vue-zoom>
    <img ... />
  </vue-zoom>
</template>
<script>
import { VueZoom } from '@utlime/vue-zoom';

export default {
  components: { VueZoom },
};
</script>
```

# prop scale
scale property can has the follow values:
- number, relative zoom value to component with, e.g. 1.5(default value)

`<vue-zoom :scale="2">...</vue-zoom>`
- string, fixed zoom value, e.g. 600px

`<vue-zoom scale="600px">...</vue-zoom>`


# more examples
[storybook](https://utlime.github.io/vue-zoom/)
