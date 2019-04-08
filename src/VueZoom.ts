export default {
  render(h) {
    return h(
      'div',
      {
        style: this.containerStyles,
        on: {
          mousemove: this.onMouseMove,
          mouseenter: this.onMouseEnter,
          mouseleave: this.onMouseLeave,
        },
      },
      [h('div', { style: this.contentStyles }, [this.$slots.default])],
    );
  },
  props: {
    scale: {
      type: [String, Number],
      default: 1.5,
      validator: scale =>
        (typeof scale === 'number' && !Number.isNaN(scale)) ||
        (typeof scale === 'string' && /^\d+(px)?$/.test(scale)),
    },
  },
  data: () => ({
    isEnabled: false,
    container: {
      x: null,
      y: null,
      width: null,
      height: null,
    },
  }),
  computed: {
    containerStyles() {
      return {
        overflow: 'hidden',
      };
    },
    computedScale() {
      let scale = this.scale;

      if (typeof scale === 'string') {
        if (scale.indexOf('px') !== -1 && this.container.width != null) {
          scale = Number(scale.replace('px', '')) / this.container.width;
        } else {
          scale = Number(scale);
        }
      }

      if (typeof scale !== 'number' || Number.isNaN(scale)) {
        scale = 1.5;
      }

      return scale;
    },
    computedOrigin() {
      const { x = 0, y = 0, width, height } = this.container;

      const originX = Math.round((x / width) * 1000) / 10;
      const originY = Math.round((y / height) * 1000) / 10;

      return { originX, originY };
    },
    contentStyles() {
      const { originX, originY } = this.computedOrigin;
      const scale = this.isEnabled ? this.computedScale : 1;

      return {
        transition: 'transform 1s ease 0s',
        transform: `scale(${scale})`,
        'transform-origin': `${originX}% ${originY}%`,
      };
    },
  },
  methods: {
    onMouseMove(e) {
      this.container.x = e.offsetX;
      this.container.y = e.offsetY;
    },
    onMouseEnter(e) {
      this.isEnabled = true;
      this.container.width = e.target.clientWidth;
      this.container.height = e.target.clientHeight;
    },
    onMouseLeave(e) {
      this.isEnabled = false;
    },
  },
};
