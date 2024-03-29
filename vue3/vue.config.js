const path = require('path');

const packageName = 'vue3'

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 9002;

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
        '@': resolve('src'),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      // filename: 'vue3.js',
      library: `${packageName}`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    },
  },
};
