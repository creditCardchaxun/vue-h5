var config

let configTest = {
  BASEURL: 'http://shengxi.iyunfish.com' || process.env.BASE_URL,
  shareIcon: 'https://wanda-h5.bdideal.com/shengxi-test/icon/fx.png',
  shareLink: 'http://wanda-h5.bdideal.com/shengxi-test/index.html',
  shareTitle: 'baseLIVING精品居舍',
  shareContent:'为城市社群打造充满灵感的生活空间',
  sysType: 1
}

let configProduction = {
  BASEURL: 'http://shengxi.iyunfish.com' || process.env.BASE_URL,
  shareIcon: 'https://wanda-h5.bdideal.com/shengxi/icon/fx.png',
  shareLink: 'http://wanda-h5.bdideal.com/shengxi/index.html',
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