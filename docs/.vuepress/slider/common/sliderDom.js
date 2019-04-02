export default {
  props: {
    options: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function () {
        return {}
      }
    }
  },
  name: 'sliderDom',
  data () {
    return {
      data: {
        currentPage: this.options.currentPage || 0
      },
      config: {
        pageWidth: '',
        pageHeight: '',
        sliderLength: 0,
        renderTime: '',
        loop: this.options.loop || false,
        loopedSlides: this.options.loopedSlides || 1,
        pagination: this.options.pagination === undefined ? true : this.options.pagination,
        virtual: this.options.virtual === undefined ? false : this.options.virtual,
        $sliderItem: '',
        $sliderItemReal: ''
      }
    }
  },
  methods: {
    renderDom (item) {
      let that = this
      // 防抖函数
      if (this.config.renderTime) {
        clearTimeout(this.config.renderTime)
      }
      this.config.sliderLength += 1
      // fade添加z-index
      if (that.config.sliderLength >= 1 && that.options.effect === 'fade') {
        if (item.previousSibling) {
          item['style']['z-index'] = 99 - that.config.sliderLength
        } else {
          item['style']['z-index'] = 99 + that.config.sliderLength
        }
      }
      this.config.renderTime = setTimeout(() => {
        that.config.renderTime = undefined
        that.$emit('hasRenderDom', that.data)
        // 存节点
        that.config.$sliderItem = that.$el.querySelectorAll(':scope > .slider-touch > .slider-wrapper > .slider-item')
        that.config.$sliderItemReal = Array.prototype.slice.call(that.config.$sliderItem).filter((item) => {
          return item.className.indexOf('slider-copy') === -1
        })
        that.$nextTick(() => {
          that.slide(that.data.currentPage, 'animationnone')
        })
      }, 0)
    }
  }
}