/*
 * @Date: 2019-10-20 02:56:42
 * @LastEditors: wuzhe
 * @LastEditTime: 2020-06-19 00:14:11
 * @FilePath: \vue.config.js
 * @Description: 
 */ 
const path = require('path')
const vConsolePlugin = require("vconsole-webpack-plugin");
const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

function resolve (dir) {
  return path.resolve(__dirname, dir)
}
const env = process.env
console.log(`NODE_ENV:${env.NODE_ENV};\r\nVUE_APP_MODE：${env.VUE_APP_MODE}`)
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('utils', resolve('src/utils'))  
  },
  configureWebpack: config => {
    const dev = [
      new vConsolePlugin({
        filter: [],  // 需要过滤的入口文件
        enable: true
      })
    ]
    if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_MODE !== 'pc') {
      console.log('不是pc模式')
      config.plugins = [...config.plugins, ...dev]
    }
  },
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 3006,
    open: true,  // 自动启动浏览器
    hot: true, // 启动热更新
    before (app) {
      // 获取商家数据
      app.get('/api/seller', function (req, res) {
        res.json({
          errno: 0,
          data: seller
        })
      })
      
      // 获取商品数据
      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      
      // 获取评价数据
      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  }
}