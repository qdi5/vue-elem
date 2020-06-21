<template>
  <div class="shop-cart-list-wrapper" @click.stop="">
     <div class="shop-cart-list">
       <div class="shop-cart-top flex-h flex-v-center justify">
         <div class="shop-cart-title">购物车</div>
         <div class="clear">清空</div>
       </div>
       <ul class="goods-items-wrapper">
         <li v-for="(food, index) of selectFood" class="goods-item flex-h flex-v-center justify" :class="{'border-1px-b': index !== selectFood.length - 1}" :key="index">
          <div class="goods-name">
            {{ food.name }}
          </div>
          <div class="handle-wrapper">
            <span class="price">&yen; {{ food.price }}</span>
            <div></div>
          </div>
        </li>
       </ul>
     </div>
     <div class="shop-cart-list-mask" @click="handleMask"></div>
  </div>
</template>

<script>
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
  methods: {
    handleMask () {
      this.$emit('close')
    }
  },
  components: {

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
    padding: 0 18px
  .goods-item
    height: (96/2)px
    margin: 0
    padding: 12px 0
    box-sizing: border-box
.handle-wrapper
  .price
    color: rgb(240, 20, 20)
    margin: 0 12px 0 18px
.shop-cart-list-mask
  fixed-element(-1, 0)
  background-color: rgba(7, 17, 27, 0.6)
  filter:blur(10px)
</style>
