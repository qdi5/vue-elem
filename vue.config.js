const path = require('path')
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('utils', resolve('src/utils'))  
  }
}