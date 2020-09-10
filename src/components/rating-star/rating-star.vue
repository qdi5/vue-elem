<template>
  <div class="ratings-wrapper">
    <div class="rating-star flex-h flex-h-center" :class="'star-'+size">
      <span class="icon star-item" v-for="i in totalData" :Key="i + 't'"></span>
      <span class="icon star-item half" v-for="j in halfData" :key="j + 'h'"></span>
      <span class="icon star-item off" v-for="k in emptyData" :Key="k + 'e'"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rating-star',
  props: {
    size: {
      type: Number,
      default: 24
    },
    score: {
      type: Number,
      default: 5
    }
  },
  created () {
    const score = this.score.toString()
    const scoreArr = score.split('.')
    const intNumber = Number(scoreArr[0])
    const floatNumber = Number(scoreArr[1]) || 0
    this.totalData = intNumber
    this.halfData = floatNumber >= 5 ? 1 : 0
    this.emptyData = 5 - intNumber - this.halfData
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/styles/mixin/mixin.styl'
/* 评分组件 */
.ratings-wrapper
  display: inline-block
  text-align: center
.rating-star
  display: inline-block
  font-size: 0
  .star-item
    display: inline-block
    width: 15px
    height: 15px
    background-repeat: no-repeat
    background-size: cover
    & ~ .star-item 
      margin-left: 6px
  &.star-24 {
    .star-item {
      width: 10px
      height: 10px
      bg-image(star24_on)
      &.off {
        bg-image(star24_off)
      }
      &.half {
        bg-image(star24_half)
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px
      height: 15px
      bg-image(star36_on)
      &.off {
        bg-image(star36_off)
      }
      &.half {
        bg-image(star36_half)
      }
    }
  }
   
</style>