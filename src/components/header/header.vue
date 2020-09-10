<template>
  <header>
    <div class="header-content">
      <div>
        <div class="store flex-h" v-if="seller">
          <div class="store-img">
            <img :src="seller.avatar" alt="">
          </div>
          <ul class="store-brief-wrapper">
            <li class="name">
              <i class="icon brand"></i><span>{{ seller.name }}</span>
            </li>
            <li class="description"><span>{{ seller.description }}/{{ seller.deliveryTime }}分钟达到</span>
            </li>
            <li  class="support">
              <i class="icon" v-if="classMap && classMap.length && seller && seller.supports" :class="classMap[seller.supports[0].type]"></i>
              <span v-if="seller && seller.supports">{{ seller.supports[0].description }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="more-wrapper" @click="detailShow = true">
        <div class="more">
          <span v-if="seller&&seller.supports">{{ seller.supports.length }}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="notice-wrapper">
      <div class="flex-h flex-v-center nowrap notice">
        <i class="icon notice-icon"></i>
        <p v-if="seller" class="ellipsis bulletin">
          {{ seller.bulletin }}
        </p>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div v-if="seller" class="bg-layer" :style="'backgroundImage: url(' + seller.avatar +')'"></div>
    <transition name="fade">
      <div class="popup-wrapper" v-if="detailShow">
        <div class="popup">
          <div class="popup-header">
            <h1 class="title" v-if="seller">{{ seller.name }}</h1>
            <rating-star :size="36" class="rating-block"></rating-star>
          </div>
          <div class="discounts-info">
            <div class="flex-h flex-v-center theme-title">
              <span class="line border-1px-t"></span>
              <span class="text">优惠信息</span>
              <span class="line border-1px-t"></span>
            </div>
            <ul class="disounts-detail-wrapper">
              <template v-if="seller && seller.supports">
                <li class="disounts-detail" v-for="(discount, index) in seller.supports" :key="index">
                  <i class="icon discounts-icon" :class="classMap[discount.type]"></i>
                  <span class="ellipsis description">
                    {{ discount.description }}
                  </span>
                </li>
              </template>
            </ul>
          </div>
          <div class="shops-notice">
            <div class="flex-h flex-v-center theme-title">
              <span class="line border-1px-t"></span>
              <span class="text">商家公告</span>
              <span class="line border-1px-t"></span>
            </div>
            <p class="notice-content">
              {{ seller.bulletin }}
            </p>
          </div>
        </div>
        <div class="sticky-wrapper">
          <i class="icon icon-close" @click="detailShow=false"></i>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
import RatingStar from 'components/rating-star/rating-star'
export default {
  name: 'v-header',
  data () {
    return {
      detailShow: false
    }
  },
  props: {
    seller: {
      type: Object,
      default: () => {},
      required: true
    },
    classMap: {
      type: Array,
      required: true
    }
  },
  components: {
    'rating-star': RatingStar
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/styles/index.styl"
header
  position: relative
  height: ((48 + 128 + 36 + 56) / 2)px
  background-color: rgba(7,17,27,0.5)
  overflow: hidden
.header-content
  position: relative
.bg-layer
  position: absolute
  left: 0
  top: 0;
  width: 100%;
  height: 100%;
  color: rgba(7,17,27,0.5)
  filter: blur(10px)
  z-index: -1
.store
  margin-left: (48/2)px
  margin-top: (48/2)px
  .store-img
    width: (128/2)px
    height: (128/2)px
    margin-right: (32/2)px
    border-radius: 4px
    overflow: hidden
    img
      width: 100%
      height: 100%
.store-brief-wrapper
  padding-top: 2px
.name
  margin-bottom: 8px
  font-size: 16px
  color: rgb(255,255,255)
  font-weight: bold
  .brand
    margin-right: 6px

.icon
  &.brand
    width: (60/2)px
    height: (36/2)px
    bg-image(brand)
    background-size: cover
    background-repeat: no-repeat
    vertical-align: top
.description
  margin-bottom: 10px
  font-size: 12px;
  color: rgb(255,255,255)
  font-weight: 400
  line-height: 12px
.support
  font-size: 10px
  color: rgb(255,255,255)
  font-weight: 400
  line-height: 12px
  .decrease
    margin-right: 4px
  .icon
    &.decrease
      width: (24/2)px
      height: (24/2)px
      bg-image(decrease_1)
      background-size: cover
      background-repeat: no-repeat
      vertical-align: top
.more-wrapper
  position: absolute
  right:12px
  width: (86/2)px
  height: (48/2)px
  margin-top: -20px
  font-size: 10px
  font-weight: 200
  text-align: center
  line-height: (48/2)px
  border-radius: 15px
  color: rgb(255, 255, 255)
  background-color: rgba(0, 0, 0, 0.2)
.notice-wrapper
  width: 100%
  margin-top: 18px
.notice
  height: (56/2)px
  padding: 0 12px
  line-height: (56/2)px
  font-size: 10px
  font-weight: 200
  color: rgb(255, 255, 255)
  background-color: rgba(7, 17, 27, 0.2)
  .notice-icon
    width: 22px
    height: 12px
    background-size: 22px 12px
    bg-image("./bulletin")
  .bulletin
    flex: 1
    margin: 0 4px
/** popup样式 begin */
.popup-wrapper
  width: 100%
  min-height: 100%
  padding-top: (128 / 2)px
  fixed-element(999)
  font-size: 12px
  color: rgb(255, 255, 255)
  background-color: rgba(7, 17 27, 0.8)
  box-sizing: border-box
  overflow: auto
  .bg-layer
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    filter: blur(10px)
    z-index: -1

.popup
  min-height: 100%
  position: relative
  box-sizing: border-box
  /* 实现sticky的关键代码*/
  display: inline-block
  padding-bottom: 64px
.popup-header
  width: 100%
  height: ((128 + 32 + 32 + 48) / 2)px
  .title
    font-size: 16px
    font-weight: bold
    text-align: center

.discounts-info
  padding: 0 36px
.theme-title
  font-size: 0
  .line
    flex: 1
    display: inline-block
  .text
    font-size: 15px
    margin: 0 12px
    color: #ffffff
    font-weight: bold
.disounts-detail-wrapper
  margin-top: 24px
  padding-left: 12px
  font-size: 12px
  font-weight: 400
  color: #ffffff
  .description
    line-height: 16px

  .disounts-detail
    line-height: 12px
    &:not(:last-child)
      margin-bottom: 12px

.discounts-icon
  width: 16px
  height: 16px
  margin-right: 6px
  background-size: 16px
  vertical-align: top
.shops-notice
  margin-top: (56/2)px
  padding: 0 (72/2)px
  .notice-content
    padding: 24px 12px 0
    font-size: 12px
    font-weight: 400
    line-height: 24px
/*=== sticky begin ===*/
.sticky-wrapper
  position: relative
  width: 100%
  /* sticky footer关键代码 */
  margin: -64px auto 0 auto;
  text-align: center
  .icon-close
    font-size: 32px
    color: rgba(255, 255, 255, 0.5)
/*=== sticky end ===*/
/** popup样式 end */
.rating-block {
  display: block;
}
</style>