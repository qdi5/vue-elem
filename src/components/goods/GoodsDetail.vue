<template>
  <div class="goods-detail-wrapper" ref="goodsdetail">
    <div class="scroll-body">
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
            <cart-control ref="cc" @sync="handleSync" class="cart-control-diy" @add="handleAdd" @decrease="handleDecrease" :number.sync="goodsNumber" :data="food"></cart-control>
            <comm-transition name="fade">
              <div class="addcart-btn-wrapper" v-show="goodsNumber === 0">
                <div class="addcart-btn" @click="addToCart($event)">
                  加入购物车
                </div>
              </div>
            </comm-transition>
          </div>
        </div>
        <div class="split-area"></div>
        <div class="goods-info">
          <h1 class="title">商品介绍</h1>
          <p class="goods-brief">
            {{ food.info }}
          </p>
        </div>
        <div class="split-area"></div>
      </div>
      <div class="goods-comments">
        <h2 class="title">商品评价</h2>
        <div class="comments-header">
          <div class="flex-h comments-btn-group border-1px-b">
            <div class="comments-btn" @click="filter='all'" :class="{ active: filter === 'all'}">全部 {{ food.ratings.length }}</div>
            <div class="comments-btn recommend" @click="filter='good'" :class="{ active: filter === 'good'}">推荐 {{ goodNumber }}</div>
            <div class="comments-btn bad" @click="filter='bad'" :class="{ active: filter === 'bad'}">吐槽 {{ badNumber }}</div>
          </div>
          <div class="filter border-1px-t">
            <i class="icon-check_circle" :class="{ on: onlyContent }" @click="onlyContent = !onlyContent"></i>只看有内容的评价
          </div>
        </div>
        <div class="comments-body border-1px-t">
          <div class="comment-item border-1px-b" v-for="rating in filterRatings" :key="rating.name">
            <div class="head-wrap flex-h justify">
              <div class="time">{{ rating.rateTime }}</div>
              <div class="user">{{ rating.username }}<img class="avatar" :src="rating.avatar" alt=""> </div>
            </div>
            <p class="comment-content">
              <i class="icon icon-thumb_down"></i>
              {{ rating.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackIcon from 'common/components/BackIcon.vue'
import BScroll from 'better-scroll'
import CartControl from 'components/cartcontrol/CartControl'
import CommTransition from 'common/components/CommTransition'
export default {
  props: {
    food: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      goodsNumber: this.food.counter || 0,
      isShow: false,
      onlyContent: true,
      filter: 'all'
    }
  },
  created () {
    console.log('food:\r\n', this.food)
  },
  mounted () {
    this.BScroll = new BScroll(this.$refs.goodsdetail, {
      click: true
    })
  },
  
  methods: {
    closeGoodsDetail () {
      this.$emit('close-goods-detail')
    },
    addToCart (event) {
      this.goodsNumber = 1
      this.handleAdd(this.food, event.target)
    },
    handleAdd (food, target) {
      console.log('增加物品啦', food, target)
      this.$parent.$parent._drop(target)
      if (!food.counter) {
        this.$set(food, 'counter', 1)
        debugger
        this.$parent.$parent.$data.selectFood.push(food)
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
        this.$parent.$parent.$data.selectFood.some((fd, index) => {
          let isSame = fd.name === food.name
          if (isSame) {
            this.$parent.$parent.$data.selectFood.splice(index, 1)
          }
          return isSame
        })
      }
    },
    handleSync (val) {
      this.goodsNumber = val
    }
  },
  computed: {
    goodNumber () {
      return this.food.ratings.filter(item => item.rateType === 0).length
    },
    badNumber () {
      return this.food.ratings.filter(item => item.rateType === 1).length
    },
    // 过滤评价
    filterRatings () {
      const ratings = this.food.ratings
      // 展示所有评价
      if (this.filter === 'all' && !this.onlyContent) {
        return ratings
      }
      return ratings.filter(item => {
        if (this.filter === 'all') {
          return item.text.trim() !== ''
        }
        let condition = this.filter === 'good' ? item.rateType === 0 : item.rateType === 1
        if (this.onlyContent) {
          return condition && item.text.trim() !== ''
        } else {
          return condition
        }
      })
    }
  },
  components: {
    BackIcon,
    CartControl,
    CommTransition
  }
}
</script>

<style scoped lang="stylus">
@import '~common/styles/mixin/mixin.styl'
.title
  margin-bottom: 6px
  font-size: 15px
  font-weight: 400

.goods-detail-wrapper
  fixed-element()
  bottom: 46px
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
.cart-control-diy
  position: absolute 
  right: 12px
  bottom: 12px
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
          font-size: 12px
          color: rgb(7,17,27)
          .icon
            line-height: 24px
            color: rgb(147,153,159)
            
</style>
