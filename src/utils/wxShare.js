import axios from 'axios'
// const domain = "http://shengxi.iyunfish.com/";


export const requestWxInit = (title, desc, imgUrl, link) => {
  let url = window.encodeURIComponent(window.location.href.split("#")[0]);
  // http://shengxi.iyunfish.com/index.php?m=api&c=wx_share&a=share
  //测试
  // http://shengxi-test.iyunfish.com/index.php?m=api&c=wx_share&a=share
  axios
    .get('http://shengxi-test.iyunfish.com/index.php?m=api&c=wx_share&a=share', {
      params: {
        'localurl': url,
      }
    }).then(res => {
      let respoens = res.data;
      // console.log('http的微信信息的res');
      // console.log(res.data);
      window.wx.config({
        debug: false,
        appId: respoens.appId,
        timestamp: respoens.timestamp,
        nonceStr: respoens.nonceStr,
        signature: respoens.signature,
        jsApiList: [
          "chooseImage",
          "uploadImage",
          "getLocalImgData",
          "downloadImage",
          "onMenuShareTimeline",
          "onMenuShareAppMessage"
        ]
      });

      window.wx.ready(function () {

        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
        var data1 = {
          title: title, // 分享标题（原标题为：直通2019篮球世界杯•万达牵手小球童全国招募，20190626更改）
          // link: api.wrapHref, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          link: link,
          imgUrl: imgUrl, // 分享图标
          success: function () { }
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
      })
      window.wx.error(() => {
        // eslint-disable-next-line no-console
        console.log('error')
      })
      window.wx.checkJsApi({
        jsApiList: ['onMenuShareTimeline', "onMenuShareAppMessage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
          // eslint-disable-next-line no-console
          console.log(res);
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        }
      });
      // console.log('respones', respoens)
    })
}