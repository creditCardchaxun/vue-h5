// import config from '@/config/config.js'
import $ from 'jquery'
import axios from 'axios'
import configCommon from '@/config/config.js'

// 初始化微信用户授权  （获取token）fffxiugai
// var sysType = 1
// var wxinfoApi = config.BASEURL + '/weixin/info'
// var getAccessTokenByCodeApi = config.BASEURL + '/weixin/callback?code=


// 测试版

var wxinfoApi = configCommon.BASEURL + 'index.php?m=api&c=weixin&a=getAppidSecret'
var getAccessTokenByCodeApi = configCommon.BASEURL + 'index.php?m=api&c=weixin&a=callBack&code='
// var useidApi= configCommon.BASEURL + 'index.php?m=api&c=pagehome&a=getwx_user'

var accessToken
var userinfo
var config = {
  sysType: 1
}

function initWX() {
  if (localStorage.getItem('accessToken')) { // localstorge has token
    accessToken = localStorage.getItem('accessToken')
  } else if (getQueryString('code')) { // url has code
    let datas = getAccessTokenByCode(config.sysType, getAccessTokenByCodeApi + getQueryString('code'))
    accessToken = datas.accessToken // 该方法依赖Jq的ajax的同步请求
    userinfo = datas.userinfo
    localStorage.setItem('accessToken', accessToken)
    // localStorage.setItem('userinfo',JSON.stringify(userinfo))
    // getWxInfor(accessToken)
  } else {
    init(config.sysType, wxinfoApi) // 该方法依赖Jq的ajax的同步请求
  }
}

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

function init(sysType, getwxinfoApi) {
  window.localStorage.removeItem('accessToken')
  var wxinfo = getwxurl(config.sysType, getwxinfoApi)
  // "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf092bd87332086f2&redirect_uri=http%3A%2F%2Fwxlogin.maxrocky.com%2FweixinJTlipJnHRm%2Fshengxu-test%2Findex.html&response_type=code&scope=snsapi_userinfo&state=MQ==&connect_redirect=1#wechat_redirect"
  location.href = wxinfo.data.url
  return 1
}

function getwxurl(sysType, getwxinfoApi, state) {
  var res = ''
  var settings = {
    "async": false,
    "url": getwxinfoApi,
    "method": "GET",
  }

  $.ajax(settings).done(function (response) {
    res = response
  });

  // $.ajax({
  //   url: getwxinfoApi,
  //   headers:{'content-type':'applcation/Json'},
  //   type: 'get',
  //   async: false,
  //   data: {
  //     state: state
  //   },
  //   success: function (data) {
  //     var res=JSON.parse(data)
  //     // res = data
  //   }
  // })
  res.data.url = replaceState(res.data.url)
  // return JSON.parse(res)

  return res
}

// 如果有额外的分享参数，拼到参数中
function replaceState(url) {
  // "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf092bd87332086f2&redirect_uri=http%3A%2F%2Fwxlogin.maxrocky.com%2FweixinJTlipJnHRm%2Fshengxu-test%2Findex.html&response_type=code&scope=snsapi_userinfo&state=MQ==&connect_redirect=1#wechat_redirect"
  if (location.href.includes('shareId')) {
    var st = url.split('&')

    var sr = st.map((item) => {
      if (item.includes('redirect_uri')) {
        // let id = location.search.;
        // var reg = /(\d+)/
        // var id = location.search.match(reg)[0]
        var info = getQueryStringByName('shareId')
        return item = item + '?shareId=' + info
      } else {
        return item
      }
    })
    var newUrl = sr.join('&')
    return newUrl
  } else {
    return url
  }
}

function getQueryStringByName(name) {
  var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
  if (result == null || result.length < 1) {
    return "";
  }
  return result[1];
}



function getAccessTokenByCode(sysType, getAccessTokenByCodeApiCode, getwxinfoApi) {
  var res = ''
  $.ajax({
    url: getAccessTokenByCodeApiCode,
    type: 'get',
    async: false,
    success: function (data) {
      res = data
      console.log('取值成功', data)
    },
    error: function () {
      init(config.sysType, getwxinfoApi)
    }
  })
  return res.data
}

export default {
  init,
  initWX
}