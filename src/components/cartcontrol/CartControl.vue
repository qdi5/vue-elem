<template>
  <div class="handle-btn-wrapper" @click.stop.prevent>
    <div class="handle-btn flex-h flex-v-center" >
      <transition name="move">
        <div v-if="number > 0" class="decrease-wrapper flex-h flex-v-center flex-h-center">
          <i class="icon-decrease icon-remove_circle_outline inner" @click="decrease"></i>
        </div>
      </transition>
      <div v-if="number > 0" class="goods-number flex-h flex-v-center flex-h-center">{{ number }}</div>
      <div class="add-wrapper flex-h flex-v-center flex-h-center">
        <i class="icon-add icon-add_circle" @click="add"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartControl',
  data () {
    return {
      number: 0
    }
  },
  methods: {
    add () {
      this.number++
    },
    decrease () {
      if (this.number > 0) {
        this.number--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.handle-btn-wrapper
  position: absolute
  right: 18px
  bottom: 19px
.handle-btn
  .decrease-wrapper,
  .add-wrapper
    width: 21px
    height: 21px
    font-size: 14px
    border-radius: 50%
    box-sizing: border-box
  .goods-number
    width: 24px
    height: 21px
    font-size: 10px
    color: rgb(147, 153, 159)
  .icon-decrease,
  .icon-add
    font-size: 21px
    color: rgb(0, 160, 220)
  .icon-decrease
    // 这里不定义transition，小球旋转就没效果了
    transition: all .4s linear
    transform: rotate(0)

// 小球滚动动画
.move-enter,
.move-leave-to
  opacity: 0
  transform: translate3d(24px, 0, 0)
  .inner 
    transform: rotate(180deg)

.move-enter-active,
.move-leave-active
  transition: all .4s linear

.move-enter-to,
.move-leave
  opacity: 1
  transform: translate3d(0, 0, 0)
  .inner
     transform: rotate(0deg)
 

            
</style>
