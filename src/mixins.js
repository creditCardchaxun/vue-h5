/* eslint-disable no-console */
let MIXIN = {
  data() {
    return {
      myMixin: 'mixin'
    }
  },
  created() {
    
  },
  mounted() {},
  methods: {
    onBlurRepireIos() {
      this.beforeSlide = document.body.scrollTop || document.documentElement.scrollTop;
      // alert(this.beforeSlide)
    },
    //blur
    onFocusRepireIos() {
      window.scrollTo(0, this.beforeSlide);
      // alert(this.beforeSlide)
    },
  }
};
export default MIXIN;