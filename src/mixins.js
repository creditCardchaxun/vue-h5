/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import config from '@/config/config.js'
import {
  WXsdk
} from "@/utils/wxShare"
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
      console.log('触发Focus')
      console.log(this.beforeSlide)
      // window.scrollTo(0, this.beforeSlide);
      window.scrollTo(0, this.beforeSlide);
    },
    onFocusRepireIos() {
      console.log('触发blur')
      console.log(this.beforeSlide)
      this.beforeSlide = document.body.scrollTop || document.documentElement.scrollTop;
      console.log('blur赋值之后')
      console.log(this.beforeSlide)
    },
    openServe() {
      console.log('测试客服');
      // http://wxapi.itaojin.cn/weixin/action/toggle/transfer/${appId}/${userId}?checkToken=e8ae0f7dc2254090b618665340ec6dcd2ebf3d99d5ee4062a035e6c91003d0ef&flag=true
      var info = null
      if (localStorage.getItem('userinfo')) {
        var api = this.$store.state.serviceInfo
        info = JSON.parse(localStorage.getItem('userinfo'))
        if (api) {
          api = api.replace(/appid/, info.appid)
          api = api.replace(/openid/, info.openid)
          console.log(api)
          // 暂时注释掉客服跳转
          // window.location.href = api
          // setTimeout(() => {
            // eslint-disable-next-line no-undef
            WeixinJSBridge.call('closeWindow')
          // })
        }
      }
    },
    previewImg(img, imgArr) {
      WXsdk.previewImg(img, imgArr)
    },
    objectToArr(arr, name) {
      var newArr = []
      arr.forEach((ele) => {
        newArr.push(ele[name])
      })
      return newArr
    },
    splicejing(str) {
      var reg = /[^#]/g

      var kl = str.match(reg).join('')
      return kl
    },
    getQueryStringByName(name) {
      var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
      if (result == null || result.length < 1) {
        return "";
      }
      return result[1];
    }
  },
  beforeRouteLeave(to, from, next) {
    // WXsdk.getShare(config.shareTitle, config.shareContent, config.shareIcon, config.shareLink)
    next()
  },
};
export default MIXIN;