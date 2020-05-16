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
      <div class="split-area"></div>
      <div class="goods-info">
        <h1 class="title">商品介绍</h1>
        <p class="goods-brief">
          一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足
        </p>
      </div>
      <div class="split-area"></div>
    </div>
    <div class="goods-comments">
      <h2 class="title">商品评价</h2>
      <div class="comments-header">
        <div class="flex-h comments-btn-group border-1px-b">
          <div class="comments-btn">全部 57</div>
          <div class="comments-btn recommend">推荐 47</div>
          <div class="comments-btn bad">吐槽 10</div>
        </div>
        <div class="filter border-1px-t">
          <i class="icon-check_circle"></i>只看有内容的评价
        </div>
      </div>
      <div class="comments-body border-1px-t">
        <div class="comment-item border-1px-b">
          <div class="head-wrap flex-h justify">
            <div class="time">2020-05-16 00:23</div>
            <div class="user">3******c <img class="avatar" src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png" alt=""> </div>
          </div>
          <p class="comment-content">
            <i class="icon icon-thumb_down"></i> 太少了，不够一个人吃
          </p>
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
.title
  margin-bottom: 6px
  font-size: 15px
  font-weight: 400

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
  position: relative
  width: 100%
  padding: 18px
  .food-name
    font-size: 14px
    font-weight: 700
    color: rgb(7, 17, 27)
    line-height: 14px
.sales-status
  font-size: 10px
  color: rgb(147,153,159)
  line-height: 14px
  .month-sales
    margin-right: 12px
.prices
  margin-top: 18px
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
  position:absolute;
  right:18px;
  bottom: 18px;
  .addcart-btn
    height: (48/2) px
    box-sizing: border-box
    padding: 6px 12px
    font-size: 10px
    color: rgb(255, 255, 255)
    line-height: 12px
    border-radius: 12px
    background-color: rgb(0, 160, 220)
    text-align: center    
.goods-info
  padding: 18px
  .goods-brief
    padding: 0 8px
    font-size: 12px
    font-weight: 200
    color: rgb(77,85,93)
    line-height: 24px
.goods-comments
  .comments-body
    padding: 0 18px
    .comment-item
        padding: 16px 0
        .head-wrap
          font-size: 10px
          color: rgb(147,153,159)
          line-height: 12px
          .user
              line-height: 12px
          .avatar
            display: inline-block
            width: 12px
            height: 12px
            border-radius: 50%
        .comment-content
          .icon
            font-size: 12px
            line-height: 24px
            color: rgb(147,153,159)
            
</style>
