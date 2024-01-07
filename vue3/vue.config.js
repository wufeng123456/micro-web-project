const path = require('path')
const packageJson = require('./package.json')
const port = 9002

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  publicPath: 'http://localhost:9002',
  devServer: {
    hot: true,
    allowedHosts: "all",
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${packageJson.name}`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${packageJson.name}`,
    },
  }
}
