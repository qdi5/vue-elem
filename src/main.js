/*
 * @Date: 2019-10-20 01:54:20
 * @LastEditors: wuzhe
 * @LastEditTime: 2020-09-09 22:50:20
 * @FilePath: \src\main.js
 * @Description: 
 */ 
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
