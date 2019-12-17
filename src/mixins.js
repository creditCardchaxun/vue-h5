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
    },
    onFocusRepireIos() {
      window.scrollTo(0, this.beforeSlide);
    },
    openServe() {
      console.log('测试客服');
      // http://wxapi.itaojin.cn/weixin/action/toggle/transfer/${appId}/${userId}?checkToken=e8ae0f7dc2254090b618665340ec6dcd2ebf3d99d5ee4062a035e6c91003d0ef&flag=true
      var info = null
      if (localStorage.getItem('userinfo')) {
        var api = this.$store.state.serviceInfo
        info = JSON.parse(localStorage.getItem('userinfo'))
        if(api){
          api = api.replace(/appid/,info.appid)
          api =  api.replace(/openid/,info.openid)
          console.log(api)
          window.location.href = api
          setTimeout(()=>{
            // eslint-disable-next-line no-undef
            WeixinJSBridge.call('closeWindow')
          })
        }
      }
    }
  }
};
export default MIXIN;