const VueZoom = {
  render(h) {
    return h(
      'div',
      {
        style: this.containerStyles,
        on: {
          mousemove: this.onMouseMove,
          mouseenter: this.onMouseEnter,
          mouseleave: this.onMouseLeave,
          touchstart: this.onTouchStart,
          touchmove: this.onTouchMove,
          touchend: this.onTouchEnd,
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
        (typeof scale === 'number' && !isNaN(scale)) ||
        (typeof scale === 'string' && /^\d+(px)?$/.test(scale)),
    },
    touch: {
      type: Boolean,
      default: false,
    }
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

      if (typeof scale !== 'number' || isNaN(scale)) {
        scale = 1.5;
      }

      return scale;
    },
    computedOrigin() {
      const { x = 0, y = 0, width, height } = this.container;

      const originX = Math.round((Math.min(Math.max(x, 0), width) / width) * 1000) / 10;
      const originY = Math.round((Math.min(Math.max(y, 0), height) / height) * 1000) / 10;

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
    onMouseLeave() {
      this.isEnabled = false;
    },
    onTouchStart(e) {
      e.preventDefault();

      if (!this.touch) {
        return;
      }

      this.isEnabled = true;
      this.container.width = e.target.clientWidth;
      this.container.height = e.target.clientHeight;
    },
    onTouchEnd(e) {
      e.preventDefault();

      if (!this.touch) {
        return;
      }

      this.isEnabled = false;
    },
    onTouchMove(e) {
      e.preventDefault();

      if (!this.touch) {
        return;
      }

      this.container.x = e.touches[0].pageX - e.touches[0].target.offsetLeft;
      this.container.y = e.touches[0].pageY - e.touches[0].target.offsetTop;
    }
  },
};

export { VueZoom };
