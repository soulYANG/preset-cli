//vue.config.js
// const autoprefixer = require('autoprefixer');
// const pxtorem = require('postcss-px2rem');
module.exports = {
  // css: {
  //   loaderOptions: {
  //     // postcss: {
  //     //   plugins: [
  //     //     // autoprefixer(),
  //     //     // pxtorem({
  //     //     //   rootValue: 75, //基准值(计算公式：设计图宽度/10)，设计图尺寸为750X1134(iPhone6)，基准值为750/10=75
  //     //     //   propList: ['*']
  //     //     // })
  //     //   ]
  //     // }
  //   }
  // },

  //去掉ESlint
  lintOnSave:false,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/': {
    　　target: 'http://127.0.0.1:8080/',
    　　changeOrigin: true,
    　　pathRewrite: {
    　　　'^/': ''
    　　},
    　　ws: false
      }
    }
  }
}