import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mock from '@/utils/mock.js'
// import axios from 'axios';
import rem from './utils/rem.js';
// 微信授权登陆
import wxAuth from './utils/wxAuth.js'

import Config from './utils/axiosConfig.js'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@vant/touch-emulator';


Vue.use(Vant);
Vue.use(rem);
Vue.use(router);

window.$eventbus = new Vue()
// 动态改变页面标题  
// import VueWechatTitle from 'vue-wechat-title' //ios 有卡死的bug
// Vue.use(VueWechatTitle)
Vue.directive('wechat-title', function (el, binding) {
  var setWechatTitle = function (title, img) {
    if (title === undefined || window.document.title === title) {
      return
    }
    document.title = title
  }
  setWechatTitle(binding.value, el.getAttribute('img-set') || null)
})

import {
  Toast
} from 'vant';
Vue.use(Toast);
import {
  Popup
} from 'vant';
Vue.use(Popup);
// Vue.use(wxAuth);

// Vue.use(Config);
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://shengxi.iyunfish.com/index.php?m=api'
axios.defaults.timeout = 4000
Vue.config.productionTip = false

import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */ )

import VueI18n from 'vue-i18n'

Vue.use(VueI18n) //通过插件的形式挂载
store.commit('setDefaultLang')

let lanBase = localStorage.getItem('lanBase')
if (lanBase == null || lanBase == undefined) lanBase = 1;
// locale: lanBase==1?'zh-CN':'en-US', 
window.i18n = new VueI18n({
  locale: lanBase == '1' ? 'zh-CN' : 'en-US', // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./assets/lang/zh'), // 中文语言包
    'en-US': require('./assets/lang/en') // 英文语言包
  }
})

/* 
 *公共库引用
 */
import vconsole from 'vconsole';
// 打测试包添加vconsole
if (process.env.VUE_APP_BUILD_TYPE && process.env.VUE_APP_BUILD_TYPE === 'test') {
  new vconsole()
}
import jquery from 'jquery'
window.$ = jquery
import axios from 'axios'
window.$axios = axios


// // 微信授权
if (process.env.NODE_ENV === 'development' && !process.env.VUE_APP_BUILD_TYPE) {
  // 调试开发，替换这里token
  let testToken = 'IkwNffyjRtwG1Efflsqo7YtKeMl25AxGfaGbjyXr'
  // let userinfo={"id":"2","nickname":"","realname":"","avater":"","sex":"0","mobile":'18911793350',"type":"0","openid":"","siteid":"1"}
  axios.defaults.headers.common['systype'] = 1
  axios.defaults.headers.common['accesstoken'] = testToken
  localStorage.setItem('accessToken', testToken)
  // localStorage.setItem('userinfo', JSON.stringify(userinfo))
} else {
  wxAuth.initWX()
}

var ua = navigator.userAgent.toLowerCase();
var iswx = ''
if (ua.match(/MicroMessenger/i) == "micromessenger") {
  let web = navigator.userAgent;
  //android终端
  let isAndroid = web.indexOf('Android') > -1 || web.indexOf('Adr') > -1;
  //ios终端
  let isiOS = !!web.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isAndroid || isiOS) {
    console.log('手机展示')
    iswx = true
  } else {
    console.log('浏览器展示')
    iswx = false
  }
} else {
  // return false
  iswx = true
  console.log('不是微信环境')
}
Vue.prototype.iswx = iswx
window.$router = router
router.beforeEach((from, to, next) => {

  next()
})

router.afterEach((from, to) => {
  // document.documentElement.scrollTop=0
  
  window.$(document).scrollTop(0)
  var mobile = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(mobile)) {
    var iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    // 替换成站标favicon路径或者任意存在的较小的图片即可
    iframe.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')
    var iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback)
        document.body.removeChild(iframe)
        // next()
      }, 0)
    }
    iframe.addEventListener('load', iframeCallback)
    document.body.appendChild(iframe)
  }
})
new Vue({
  router,
  // isios,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')