<template>
  <div class="seller" ref="seller">
    <div class="scroll-body">
      <div class="seller-brief">
        <div class="seller-top flex-h border-1px-b">
          <div class="left">
            <h1 class="name">{{ seller.name }}</h1>
            <rating-star :size="36" :score="seller.score"></rating-star>
            <span class="rating-number">({{ seller.ratingCount }})</span>
            <span class="sale-number">月售{{ seller.sellCount }}单</span>
          </div>
          <div class="right">
            <i class="icon-favorite favorite-icon" :class="{ active: isFavorite }" @click="toggleFavorite"></i>
            <div class="collect">{{ isFavorite ? '已收藏' : '收藏' }}</div>
          </div>
        </div>
        <div class="seller-detail flex-h">
          <div class="character">
            <div class="first">起送价</div>
            <div><b>{{ seller.minPrice }}</b>元</div>
          </div>
          <div class="character border-1px-l">
            <div class="first">商家配送</div>
            <div><b>{{ seller.deliveryPrice }}</b>元</div>
          </div>
          <div class="character border-1px-l">
            <div class="first">平均配送时间</div>
            <div><b>{{ seller.deliveryTime }}</b>分钟</div>
          </div>
        </div>
      </div>
      <div class="split-area"></div>
      <div class="broadcast border-1px-b">
        <div class="title">公告与活动</div>
        <p class="text border-1px-b">
          {{ seller.bulletin }}
        </p>
        <ul class="promotion">
          <li class="border-1px-b" v-for="(item, index) in seller.supports" :key="index">
            <span class="bg-img decrease" :class="classMap[item.type]"></span>
            <span>{{ item.description }}</span>
          </li>
        </ul>
      </div>
      <div class="split-area"></div>
      <div class="seller-photos">
        <div class="title">商家实景</div>
        <div class="photos-wrap" ref="photoswrap">
          <div class="photo-scroll" ref="photoparent">
            <img v-for="(pic, index) in seller.pics" :src="pic" :key="index" alt="">
          </div>
        </div>
      </div>
      <div class="split-area"></div>
      <div class="seller-info">
        <div class="title">商家信息</div>
        <ul class="other-info">
          <li class="border-1px-t" v-for="(info, index) in seller.infos" :key="index">
            {{ info }}
          </li>
        </ul>
      </div>
    </div> 
  </div>
</template>

<script>
// @ is an alias to /src
import BScroll from 'better-scroll'
import RatingStar from 'components/rating-star/rating-star'
import { saveToLocal, loadFromLocal } from 'common/js/store'
export default {
  name: 'seller',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    const _this = this
    return {
      isFavorite: loadFromLocal(_this.seller.id, 'favorite', false)
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  mounted () {
    this.BScroll = new BScroll(this.$refs.seller, {
      click: true
    })
    this.photoScroll = new BScroll(this.$refs.photoswrap, {
      scrollX: true,
      scrollY: false
    })
  },
  methods: {
    toggleFavorite () {
      this.isFavorite = !this.isFavorite
      saveToLocal(this.seller.id, 'favorite', this.isFavorite)
    },
    calcPhotoparentWidth () {
      debugger
      const photoparent = this.$refs.photoparent
      const photoWidth = 120
      const margin = 6 
      const imgs = [...photoparent.querySelectorAll('img')]
      let totalWidth = 0
      imgs.forEach((item, index) => {
        if (index < imgs.length - 1) {
          totalWidth += photoWidth + margin
        } else {
          totalWidth += photoWidth
        }
      })
      photoparent.style.width = totalWidth + 'px'
    }
  },
  watch: {
    'seller': {
      handler () {
        debugger
        this.$nextTick().then(() => {
          this.calcPhotoparentWidth()
        })
      },
      immediate: true
    }
  },
  components: {
    RatingStar
  }
}
</script>

<style scoped lang="stylus">
@import '~common/styles/mixin/mixin.styl'
.seller {
  height: 100%;
  overflow: hidden;
}
/* 背景图片 */
img 
  display: inline-block
  max-width: 120px
.bg-img
  display: inline-block
  width: 16px
  height: 16px
  background-repeat: no-repeat
  background-size: 16px 16px
  vertical-align: top
.decrease 
  bg-image('~@/assets/images/decrease_3')
.discount
  bg-image('~@/assets/images/discount_3')
.special
  bg-image('~@/assets/images/special_3')
.invoice
  bg-image('~@/assets/images/invoice_3')
.guarantee
  bg-image('~@/assets/images/guarantee_3')
.title
  font-size: 14px
  color: rgb(7,17,27)
  line-height: 14px
.seller-brief
  padding: 18px
  .left
    flex: 1
    padding-bottom: 18px
    .name
      margin-top: 0
      margin-bottom: 8px
      font-size: 14px
      color: rgb(7,17,27)
      line-height: 14px
      
    .seller-rating
      margin-right: 8px
    .rating-number,
    .sale-number
      display: inline-block
      line-height: 15px
      vertical-align: top
    .rating-number
      font-size: 10px
      margin-right: 12px
    .sale-number
      font-size: 10px
  .right
    width: 50px;
    text-align: center
    .favorite-icon
      font-size: 24px
      color: #d4d6d9;
      &.active
        color: #f01414
    .collect
      font-size: 10px
      color: rgb(77,85,93)
      line-height: 10px
.seller-detail
  padding-top: 18px
  .character
    flex: 1
    font-size: 10px
    color: rgb(147,153,159)
    line-height: 10px
    text-align: center
    .first
      margin-bottom: 4px
    b
      font-size: 24px
      font-weight: 400
      color: rgb(7,17,27)
      line-height: 24px
.broadcast
  padding: 18px 18px 12px
  .text
    padding: 0 12px 16px
    font-size: 12px
    font-weight: 200
    color: rgb(240,20,20)
    line-height: 24px
  .promotion
    font-size: 0
    li
      padding: 16px 12px
      font-size: 12px
      font-weight: 200
      color: rgb(7,17,27)
      line-height: 16px
      .bg-img
        margin-right: 6px
      span
        display: inline-block
        vertical-align: top
.seller-photos
  padding: 18px 0 18px 18px
  .title
    margin-bottom: 12px
  .photos-wrap
    width: 100%
    overflow: hidden
    font-size: 0
    .photo-scroll
      display: flex
    img 
      display: inline-block
      width: 120px
      height: 90px
      margin-right: 6px
.seller-info
  padding: 18px
  .title
    margin-bottom: 12px
  .other-info
    font-size: 12px
    font-weight: 200
    color: rgb(7,17,27)
    line-height: 16px
    li
      padding: 16px 12px


</style>
