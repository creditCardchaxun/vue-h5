var config

let configTest = {
  BASEURL: 'http://shengxi-test.iyunfish.com/' || process.env.BASE_URL,
  shareIcon: 'https://wanda-h5.bdideal.com/shengxu-test/icon/fx.png',
  shareLink: 'http://wanda-h5.bdideal.com/shengxu-test/index.html',
  shareTitle: 'baseLIVING精品居舍',
  shareContent:'为城市社群打造充满灵感的生活空间',
  sysType: 1
}

let configProduction = {
  BASEURL: 'https://web-api.base-china.com/' || process.env.BASE_URL,
  shareIcon: 'https://wanda-h5.bdideal.com/shengxu/icon/fx.png',
  shareLink: 'http://wanda-h5.bdideal.com/shengxu/index.html',
  shareTitle: 'baseLIVING精品居舍',
  shareContent:'为城市社群打造充满灵感的生活空间',
  sysType: 1
}

config = configTest

if ((process.env.VUE_APP_BUILD_TYPE && process.env.VUE_APP_BUILD_TYPE === 'test')) {
  config = configTest
}
if ((process.env.VUE_APP_BUILD_TYPE && process.env.VUE_APP_BUILD_TYPE === 'production')) {
  config = configProduction
}
// export default

export default config