import axios from 'axios'
import wxAuth from './wxAuth'
import configCommon from '@/config/config.js'

import Vue from 'vue'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import { Indicator } from 'mint-ui';
Vue.use(MintUI);

var wxinfoApi = 'http://shengxi-test.iyunfish.com/index.php?m=api&c=weixin&a=getAppidSecret'

// import Vue from 'vue'
// import { Toast } from 'vant';
// Vue.use(Toast);

// var wxinfoApi = configCommon.BASEURL + '/weixin/info'

// 创建axios实例
// const service = axios.create({
//   // baseURL: process.env.BASE_API, // api的base_url
//   timeout: 10000 // 请求超时时间
// })

// axios.defaults.baseURL = configCommon.BASEURL

// request拦截器
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
     // 加载动画
     Indicator.open();

    if (localStorage.getItem('accessToken')) {
      config.headers['accesstoken'] = localStorage.getItem('accessToken') // 让每个请求携带token--['ticket']为自定义key 请根据实际情况自行修改
      config.headers['systype'] = localStorage.getItem('lanBase') || 1 ||configCommon.sysType
    }

    if (!config.headers['Content-Type']) {
      if (config.url != '/upload') {
        // config.headers['Content-Type'] = 'application/json'
      }
    }

    return config
  },
  error => {
    // Do something with request error
    // eslint-disable-next-line no-console
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === '0000' || response.data.code === '4010' || response.data.code == 0 || !response.data.code) {
      // 1041 公司存在报错
      Indicator.close();
      return response

    } else {
      // response.status = 400
      if (response.data.code == 100100 || response.data.code == 100101) {
        // store.dispatch('getAuth')
        // alert('token失效')
         Indicator.close();
         wxAuth.init(configCommon.sysType, wxinfoApi)
      }else{
        Indicator.close();
        return response
        // Toast({
        //   message: response.data.data,
        //   position: 'center',
        //   duration: 2 * 1000
        // })
      }
      // return Promise.reject(new Error({
      //   response
      //  }))

    

    }
  },
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  err => {
    if (err && err.response) {
      if (err.response.data.code == 100100 || err.response.data.code == 100101) {
        wxAuth.init(configCommon.sysType, wxinfoApi)
      }
      switch (err.response.status) {
        case 400:
          err.message = `${err.response.data.msg}`
          break

        case 401:
          err.message = `${err.response.data.msg}`
          break

        case 403:
          err.message = `${err.response.data.msg}`
          break

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break

        case 405:
          err.message = `方法错误: ${err.response.data.msg}`
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = `服务器出了点小问题，请稍后再试。`
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break
      }
    }
    // Toast({
    //   message: err.message,
    //   position: 'center',
    //   duration: 3 * 1000
    // })
    // Toast.fail(err.message)

    // eslint-disable-next-line no-console
    console.log('❎❎', err)
    return Promise.reject(err)
  }
)