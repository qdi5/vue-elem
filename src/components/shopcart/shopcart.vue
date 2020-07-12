<template>
  <!-- 底部购物车 begin -->
  <div class="shop-cart-wrapper flex-h flex-v-center" @click="isShowShopCart = !isShowShopCart">
    <div class="shop-cart-left flex-h flex-v-center">
      <div class="shop-cart-icon-wrapper">
        <div class="shop-cart-icon-outside flex-h flex-v-center flex-h-center">
          <div class="shop-cart-icon-inner flex-h flex-v-center flex-h-center" :class="{highlight: totalCounter}">
            <div v-show="totalCounter" class="goods-number">{{ totalCounter }}</div>
            <i class="shop-cart-icon icon-shopping_cart"></i>
          </div>
        </div>
      </div>
      <div class="price" :class="{highlight: totalPrice}">
         &yen;{{ totalPrice }}
      </div>
    </div>
    <div class="border-1px-l shop-cart-center">
      另需配送费&yen;{{ deliveryPrice }}元
    </div>
    <div class="shop-cart-right" @click.stop="sum" v-html="calcText" :class="payClass"></div>
    <!-- 购物车清单 -->
    <comm-transition name="fade">
      <shop-list v-show="isShowShopCart" @close="isShowShopCart=false" :selectFood="selectFood"></shop-list>
    </comm-transition>
    <div class="ball-container">
      <div v-for="(ball, index) in balls" :key="index">
        <transition
          @before-enter="beforeDrop"
          @enter="dropping"
          @after-enter="afterDrop"
          :css="false"
        >
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
        
      </div>
    </div>
  </div>
  <!-- 底部购物车 end -->
  
</template>

<script>
import CommTransition from 'common/components/CommTransition'
import ShopList from 'components/shoplist/shoplist'
export default {
  props: {
    // 保存被选择的食物的数组
    selectFood: {
      type: Array,
      default () {
        return []
      }
    },
    // 配送费用
    deliveryPrice: {
      type: Number
    },
    // 起送价
    minPrice: {
      type: Number
    }
  },
  data () {
    return {
      isShowShopCart: false,
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ]
    }
  },
  created () {
    this.dropBall = []
  },
  methods: {
    sum () {
      alert(`合计：${this.totalPrice}元`)
    },
    // 小球下落的方法
    drop (el) {
      //  找出一个小球，并将它显示
      this.balls.some(ball => {
        if (ball) {
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBall.push(ball)
            return true
          }
        }
      })
    },
    // 这里的el是正在过渡的小球dom元素
    beforeDrop (el) {
      console.log('before-drop')
      //  小球的初始位置
      let ball = this.dropBall[this.dropBall.length - 1]
      let rect = ball.el.getBoundingClientRect()
      let x = rect.left - 23
      let y = -(window.innerHeight - rect.top - 16)
      el.style.display = ''
      el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
      let inner = el.getElementsByClassName('inner-hook')[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
    },
    dropping (el, done) {
      // 触发浏览器重绘
      this.xxx = document.body.clientHeight

      el.style.transform = el.style.webkitTransform = 'translate3d(0,0,0)'
      let inner = el.getElementsByClassName('inner-hook')[0]
      inner.style.transform = inner.webkitTransform = 'translate3d(0,0,0)'
      el.addEventListener('transitionend', done)
    },
    afterDrop (el) {
      const ball = this.dropBall.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  },
  computed: {
    // 总价
    totalPrice: function () {
      let sum = 0
      this.selectFood.forEach(food => {
        sum += food.price * food.counter
      })
      return sum
    },
    // 总数量
    totalCounter: function () {
      let num = 0
      this.selectFood.forEach(food => {
        num += food.counter
      })
      return num
    },
    calcText: function () {
      if (this.totalPrice === 0) {
        return '&yen;' + this.minPrice + '起送'   
      } else if (this.totalPrice < this.minPrice) {
        return '还差' + (this.minPrice - this.totalPrice) + '元起送'
      } else {
        return '去结算'
      }
    },
    payClass: function () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  components: {
    CommTransition,
    ShopList
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/styles/mixin/mixin.styl';
.shop-cart-wrapper
  position: fixed
  left: 0
  right: 0
  bottom: 0
  width: 100%
  height: (94 / 2)px
  padding-left: ((36 - 22) / 2)px
  font-size: 16px
  font-weight: bold
  color: rgba(255, 255, 255, 0.4)
  background-color: #141d27
  box-sizing: border-box
.shop-cart-left
  .price
    padding: 0 12px
    &.highlight
      font-weight: bolder
      color: #fff
.shop-cart-center
  flex: 1
  font-weight: normal
  padding-left: 12px
  font-size: 12px
  &:before {
      setLeftLine(rgba(255, 255, 255, 0.6))
      margin-top: -5px
      margin-bottom: -5px
    }
.shop-cart-right
  box-sizing: border-box
  width: (210/2)px
  height: 100%
  padding: 0 8px
  font-size: 12px
  line-height: (94 / 2)px
  text-align: center
  background-color: #2B333B
  &.enough
    background: #00b43c;
    color: #fff;
.shop-cart-icon-outside
  position: relative
  margin-top: -11px
  width: 56px
  height: 56px
  background-color: #141d27
  border-radius: 50%
.shop-cart-icon-inner
  position: relative
  width: 44px
  height: 44px
  border-radius: 50%
  color: rgba(255, 255, 255, 0.4)
  background-color: #2B343C
  &.highlight
    color: #fff
    background-color: rgb(0, 160, 220)
  .shop-cart-icon
    font-size: 24px
  .goods-number
    position: absolute
    top: -5px;
    right: -11px;
    width: 24px
    height: 16px
    line-height: 16px
    font-size: 9px
    font-weight: bold
    border-radius: 12px
    text-align: center
    color: #ffffff
    background-color: rgb(240, 20, 20)
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
.ball-container
  .ball  
    position: fixed
    left: 23px
    bottom: 16px
    transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
    background: green
    z-index: 200
    .inner
      width: 16px
      height: 16px
      background: red
      border-radius: 50%
      transition: all .4s linear

</style>

