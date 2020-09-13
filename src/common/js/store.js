/*
 * @Date: 2020-09-13 14:57:08
 * @LastEditors: wuzhe
 * @LastEditTime: 2020-09-13 15:32:01
 * @FilePath: \src\common\js\store.js
 * @Description: 
 */
// 保存商家页面的数据到localStorage
/**
 * 
 * @param {*} id: 商家id
 * @param {*} key: 键（标识）
 * @param {*} value: 值
 */
export function saveToLocal (id, key, value) {
  let seller = window.localStorage.__seller__
  // 缓存里没有，则赋值默认值
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__seller__ = JSON.stringify(seller)
}

// 从localStorage加载商家页面的数据
/**
 * 
 * @param {*} id: 商家id
 * @param {*} key: 键
 * @param {*} def: 默认值
 */
export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__
  // 不存在商家页面的缓存，直接返回默认值
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  // 商家id对应的数据不存在，直接返回默认值
  if (!seller) {
    return def
  }
  // 读取缓存里面key对应的值
  let ret = seller[key]
  return ret || def
}