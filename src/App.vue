<template>
  <div id="app">
    <header>
      <div class="header-content">
        <div v-if="seller">
          <div class="store flex-h">
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
                <i class="icon" :class="classMap[seller.supports[0].type]"></i><span>{{ seller.supports[0].description }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bg-layer" :style="'backgroundImage: url(' + seller.avatar +')'"></div>
    </header>
    <router-view/>
  </div>
</template>
<script>
import request from 'utils/request'
export default {
  data () {
    return {
      seller: null
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    request.get('/api/seller').then(response => {
      this.seller = response.data.data
    })
  }
}
</script>
<style lang="stylus">
@import "~common/styles/index.styl"
body 
  safe-area-mixin(padding-bottom, bottom)
</style>
<style lang="stylus" scoped>
@import "~common/styles/index.styl"
header
  position: relative
  height: ((48 + 128 + 36 + 56) / 2)px
  padding-top: 24px
  padding-left: 24px
  overflow: hidden
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
</style>
