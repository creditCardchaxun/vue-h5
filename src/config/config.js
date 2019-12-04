var config

let configTest = {
  BASEURL: 'http://shengxi.iyunfish.com' || process.env.BASE_URL,
  shareIcon: 'https://wanda-h5.bdideal.com/blessing-test/static/img/v2/shareImg.png',
  shareLink: 'https://wanda-h5.bdideal.com/blessing-test/index.html',
  shareTitle: ['致敬70年光辉岁月！刚刚，我为她献上了最美的祝福', '今天，我把最美的话送给她', '我是第xxx位为新中国成立70周年送祝福的人'],
  sysType: 1
}

let configProduction = {
  BASEURL: 'http://shengxi.iyunfish.com' || process.env.BASE_URL,
  shareIcon: 'https://wanda-h5.bdideal.com/blessing/static/img/v2/shareImg.png',
  shareLink: 'https://wanda-h5.bdideal.com/blessing/index.html',
  shareTitle: ['致敬70年光辉岁月！刚刚，我为她献上了最美的祝福', '今天，我把最美的话送给她', '我是第xxx位为新中国成立70周年送祝福的人'],
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