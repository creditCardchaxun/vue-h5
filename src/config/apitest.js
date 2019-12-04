import axios from 'axios';
var test = function(){
  // 首页接口
  axios.get('http://shengxi.iyunfish.com/index.php?m=api&c=pagehome')
// 授权
  // axios.get('http://shengxi.iyunfish.com/index.php?m=api&c=weixin&a=getAppidSecret')
  // axios.get('http://shengxi.iyunfish.com/index.php?m=api&c=weixin&a=callBack&code=')
}

export default {test}