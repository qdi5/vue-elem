<template>
  <div class="shop-cart-list-wrapper" @click.stop="">
     <div class="shop-cart-list">
       <div class="shop-cart-top flex-h flex-v-center justify">
         <div class="shop-cart-title">购物车</div>
         <div class="clear" @click="clear">清空</div>
       </div>
       <div ref="shopcartlist" class="goods-items-wrapper">
         <ul>
           <li v-for="(food, index) of selectFood" class="goods-item flex-h flex-v-center justify" :class="{'border-1px-b': index !== selectFood.length - 1}" :key="index">
            <div class="goods-name">
              {{ food.name }}
            </div>
            <div class="handle-wrapper flex-h flex-v-center">
              <span class="price">&yen; {{ food.price * food.counter }}</span>
              <div class="operate-btns">
                <cart-control :number="food.counter" class="diy-cart-control" :data="food" @add="handleAdd" @decrease="handleDecrease"></cart-control>
              </div>
            </div>
          </li>
         </ul>
       </div>
     </div>
     <div class="shop-cart-list-mask" @click="handleMask"></div>
  </div>
</template>

<script>
import CartControl from 'components/cartcontrol/CartControl'
import BScroll from 'better-scroll'
export default {
  name: 'shoplist',
  props: {
    selectFood: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      
    }
  },
  mounted () {
    console.log('mounted')
    this.BScroll = new BScroll(this.$refs.shopcartlist, { click: true })
  },
  methods: {
    handleMask () {
      this.$emit('close')
    },
    handleAdd (food) {
      console.log('增加物品啦', food)
      if (!food.counter) {
        this.$set(food, 'counter', 1)
        this.selectFood.push(food)
      } else {
        food.counter++
      }
    },
    handleDecrease (food) {
      console.log('减少物品啦')
      if (food.counter > 0) {
        food.counter--
      }
      if (food.counter === 0) {
        this.selectFood.some((fd, index) => {
          let isSame = fd.name === food.name
          if (isSame) {
            this.selectFood.splice(index, 1)
          }
          return isSame
        })
      }
    },
    clear () {
      this.selectFood = []
    }
  },
  components: {
    CartControl
  },
  watch: {
    selectFood () {
      console.log('刷新BScroll咯')
      this.$nextTick().then(() => {
        this.BScroll && this.BScroll.refresh()
      })
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~common/styles/mixin/mixin.styl'
.shop-cart-list-wrapper
  position: absolute
  bottom: (94 / 2)px
  left: 0
  right: 0
  width: 100%
  color: rgb(7, 17, 27)
  background-color: #fff
  font-size: 14px
  z-index: -1
  overflow: hidden
.shop-cart-list
  position: relative
  background: #fff
  z-index: 11
  .shop-cart-top
    height: 40px
    padding: 0 18px
    border-bottom: 2px solid rgba(7, 17, 27, 0.1)
    font-size: 12px
    background-color: #f3f5f7
  .shop-cart-title
    font-size: 14px
    color: rgb(7, 17, 27)
    font-weight normal
  .clear
    color: rgb(0, 160, 220)
  .goods-items-wrapper
    max-height: 284px
    padding: 0 18px
    overflow: hidden
  .goods-item
    height: (96/2)px
    margin: 0
    box-sizing: border-box
.handle-wrapper
  height: 100%
  .price
    color: rgb(240, 20, 20)
    margin: 0 12px 0 18px
.shop-cart-list-mask
  fixed-element(-1, 0)
  background-color: rgba(7, 17, 27, 0.6)
  filter:blur(10px)
.operate-btns
  height: 36px
  position: relative
  min-width: 86px
.diy-cart-control
  right: 0
  bottom: 0
</style>
