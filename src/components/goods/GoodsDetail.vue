<template>
  <div class="goods-deatil-wrapper">
    <div class="goods-detail">
      <back-icon :clickAction="closeGoodsDetail"></back-icon>
      <div class="flex-h food-detail border-1px-b">
        <div class="food-img-wrapper">
          <img :src="food.image" alt="food.name">
        </div>
        <div class="food-content">
          <h3 class="food-name">{{ food.name }}</h3>
          <div class="sales-status">
            <span class="month-sales">月售{{ food.sellCount }}份</span>
            <span class="good-rate">好评率{{ food.rating }}%</span>
          </div>
          <div class="prices">
            <span class="sales-price">&yen;<span class="yen">{{ food.price }}</span> </span>
            <span class="origin-price" v-if="typeof food.oldPrice === 'number' && food.oldPrice >= 0">&yen;<span class="yen">{{ food.oldPrice }}</span></span>
          </div>
          <div class="addcart-btn-wrapper">
            <div class="addcart-btn">
              加入购物车
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackIcon from 'common/components/BackIcon.vue'

export default {
  props: {
    food: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {

    }
  },
  methods: {
    closeGoodsDetail () {
      this.$emit('close-goods-detail')
    }
  },
  components: {
    BackIcon
  }
}
</script>

<style scoped lang="stylus">
@import '~common/styles/mixin/mixin.styl'
.goods-deatil-wrapper
  fixed-element()
.food-img-wrapper
  width: 100%
  position: relative;
  padding-bottom: 100%
  height: 0
  img
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
.food-content
  padding: 18px 0 8px 18px
  font-size: 14px
  font-weight: 700
  color: rgb(7, 17, 27)
  line-height: 14px
.sales-status
  .month-sales
    margin-right: 12px
.prices
  .sales-price
    font-size: 10px
    font-weight: normal
    color: rgb(240, 20, 20)
    line-height: 24px
    margin-right: 7px
    .yen
      font-size: 14px
      font-weight: 700
  .origin-price
    font-size: 10px
    font-weight: normal
    color: rgb(147, 153, 159)
    line-height: 24px
    text-decoration: line-through
    .yen
      font-weight: 700
.addcart-btn-wrapper
  .addcart-btn
    width: (148/2) px
    height: (48/2) px
    box-sizing: border-box
    padding: 6px 12px
    font-size: 10px
    color: rgb(255, 255, 255)
    line-height: 12px
    border-radius: 12px
    background-color: rgb(0, 160, 220)
    text-align: center 
    
</style>
