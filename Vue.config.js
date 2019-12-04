module.exports = {
  // 基本路径
  publicPath: './',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // 服务器端口号
  // devServer: {
  //   port: 1234,
  // },


}

// module.exports = {
//   devServer: {
//     open: true,
//     host: 'localhost',
//     port: 8080,
//     https: false,
//     hotOnly: false,
//     proxy: {
//       // 配置跨域
//       '/api': {
//         target: 'http://shengxi.iyunfish.com/index.php?m=api',
//         ws: true,
//         changOrigin: true,
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     },
//     before: app => {}
//   }
// };