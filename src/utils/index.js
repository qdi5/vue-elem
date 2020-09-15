/*
 * @Date: 2020-09-15 21:41:26
 * @LastEditors: wuzhe
 * @LastEditTime: 2020-09-15 22:20:11
 * @FilePath: \src\utils\index.js
 * @Description: 格式化时间
 */
export function formatDate (date, formatter = 'YYYY-MM-dd hh:mm') {
  const d = new Date(date)
  const m = {
    '(Y|y)+': d.getFullYear(),
    'M+': padZero(d.getMonth() + 1),
    'd+': padZero(d.getDay()),
    'h+': padZero(d.getHours()),
    'm+': padZero(d.getMinutes())
  }
  for (let k in m) {
    formatter = formatter.replace(new RegExp(k), m[k])
  }
  return formatter
}

/**
 * 
 * @param {*} str 目标字符串
 * @param {*} length 字符串总长度
 */
export function padZero (str, length) {
  str += ''
  if (!length) {
    length = 2
  }
  let remain = length - str.length
  while (remain--) {
    str = '0' + str
  }
  return str
}