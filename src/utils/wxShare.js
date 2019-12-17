/* eslint-disable no-console */
import axios from 'axios'
import configCommon from '@/config/config.js'

class _WXsdk {
  constructor() {
    this.jsApiList = [
      "chooseImage",
      "uploadImage",
      "getLocalImgData",
      "downloadImage",
      "onMenuShareTimeline",
      "onMenuShareAppMessage",
      "getLocation",
      "openLocation",
      "hideMenuItems",
      "previewImage"
    ]
  }

  _init() {
    let url = window.encodeURIComponent(window.location.href.split("#")[0]);
    return new Promise((resolve) => {
      axios
        .get(configCommon.BASEURL + '/index.php?m=api&c=wx_share&a=share', {
          params: {
            'localurl': url,
          }
        }).then(res => {
          let respoens = res.data;
          console.log('res微信的结果');
          console.log(res);
          resolve(respoens)
          // console.log('http的微信信息的res');
          // console.log(res);
          window.wx.config({
            debug: false,
            appId: respoens.appId,
            timestamp: respoens.timestamp,
            nonceStr: respoens.nonceStr,
            signature: respoens.signature,
            jsApiList: this.jsApiList
          });
          window.wx.error(() => {
            // eslint-disable-next-line no-console
            console.log('error')
          })
          window.wx.checkJsApi({
            jsApiList: this.jsApiList, // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function (res) {
              // eslint-disable-next-line no-console
              console.log(res);
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
          });
        })
    })

  }

  // 分享
  getShare(title, desc, imgUrl, link) {
    this._init().then(() => {
      window.wx.ready(function () {

        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
        var data1 = {
          title: title, // 分享标题（原标题为：直通2019篮球世界杯•万达牵手小球童全国招募，20190626更改）
          // link: api.wrapHref, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          link: link,
          imgUrl: imgUrl, // 分享图标
          success: function () {}
        }

        // window.wx.onMenuShareTimeline(tar.shapeShareTimeline(data1));
        window.wx.onMenuShareTimeline(data1);

        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
        var data2 = {
          title: title, // 分享标题
          desc: desc, // 分享描述
          // link: api.wrapHref, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          link: link,
          imgUrl: imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户点击了分享后执行的回调函数
          }
        }

        // window.wx.onMenuShareAppMessage(tar.shapeShareAppMessage(data2));
        window.wx.onMenuShareAppMessage(data2);

        window.wx.showMenuItems({
          menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'] // 要显示的菜单项，所有menu项见附录3
        });
      })
    })
  }

  // 获取地理位置
  getLocation() {
    return new Promise((resolve) => {
      this._init().then(() => {
        window.wx.ready(() => {
          window.wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              resolve(res)
              // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              // var speed = res.speed; // 速度，以米/每秒计
              // var accuracy = res.accuracy; // 位置精度
            }
          });
        })
      })
    })
  }

  // 使用微信内置地图查看位置接口
  openLocation(position, locationName) {
    if (!position) {
      return
    }

    if (typeof position !== "object") {
      throw new Error('position是一个对象，有latitude和longitude属性')
    }
    var latitude = Number(parseFloat(position.latitude))
    var longitude = Number(parseFloat(position.longitude))
    console.log('精度韦德');
    console.log(latitude);
    console.log(typeof latitude);

    this._init().then(() => {
      window.wx.ready(() => {
        window.wx.openLocation({
          latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
          longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
          name: locationName || '', // 位置名
          address: locationName || '', // 地址详情说明
          scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log('定位的错误信息');
            console.log(res)
          }
        })
      })
    })
  }

  // 至显示发送到盆友圈，和朋友
  jinzhi() {
    this._init().then(() => {
      console.log('隐藏代码')
      window.wx.ready(() => {
        window.wx.hideMenuItems({
          menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:favorite', 'menuItem:share:facebook', 'menuItem:share:QZone', 'menuItem:copyUrl', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari']
        })
      })
    })
  }

  // 预览图片
  previewImg(img, imgArr) {
    this._init().then(() => {
      window.wx.ready(() => {
        window.wx.previewImage({
          current: img, // 当前显示图片的http链接
          urls: imgArr || [] // 需要预览的图片http链接列表
        });
      })
    })
  }
}

let WXsdk = new _WXsdk()
WXsdk.jinzhi()

export {
  WXsdk
}