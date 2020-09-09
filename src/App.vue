<template>
  <div id="app">
    <v-header :seller="seller" :classMap="classMap"></v-header>
    <nav class="flex-h nowrap around nav border-1px-b">
      <div class="nav-item">
        <router-link  :to="{name: 'goods'}">商品</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-item" :to="{name: 'ratings'}">评价</router-link>
      </div>
      <div class="nav-item">
        <router-link :to="{name: 'seller'}">商家</router-link>
      </div>
    </nav>
    <main class="main-wrapper">
      <router-view :seller="seller" />
    </main>
  </div>
</template>
<script>
import request from 'utils/request'
import header from 'components/header/header'
export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    request.get('/api/seller').then(response => {
      console.log('response.data:\n', response.data)
      this.seller = response.data.data
    })
  },
  components: {
    'v-header': header
  }
}
</script>
<style lang="stylus">
@import "~common/styles/index.styl"

body
  safe-area-mixin(padding-bottom, bottom)
  // 清除a标签点击后的背景阴影
  -webkit-tap-highlight-color: transparent
</style>
<style lang="stylus" scoped>
@import "~common/styles/index.styl"
.main-wrapper
  fixed-element(10, 174)
  bottom: 46px
.nav
  height: 40px
  line-height: 40px
  &.border-1px-b {
    &:after {
      setBottomLine(rgba(7, 17, 27, 0.1))
    }
  }
  .nav-item
    font-size: 14px;
    color: rgb(77, 85, 93)
    font-weight: 200
  .router-link-active
    color: rgb(240, 20, 20)
</style>
