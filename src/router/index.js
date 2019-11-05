import Vue from 'vue'
import VueRouter from 'vue-router'
const Ratings = () => import('@/views/ratings.vue')
const Seller = () => import('@/views/seller.vue')
const Goods = () => import('@/views/goods.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/goods'
  },
  {
    path: '/goods',
    name: 'goods',
    component: Goods
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: Ratings
  },
  {
    path: '/seller',
    name: 'seller',
    component: Seller
  }
]

const router = new VueRouter({
  routes
})

export default router
