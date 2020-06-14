<template>
  <transition :name="name">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'CommTransition',
  props: {
    name: {
      default: 'slide'
    }
  }
}
</script>

<style lang="stylus" scoped>
/* 动画样式 */
// 进入过渡的开始状态；元素被插入之前生效
/* 定义侧滑动画 begin */
.slide-enter {
  transform: translate3d(100%,0,0)
}
// 进入过渡的整个过程都存在的class；用于定义进入过渡的过程时间，
// 延迟和曲线函数；元素被插入之前生效
.slide-enter-active {
  transition: all 0.3s
}
// 过渡的结束状态
.slide-enter-to {
  transform: translate3d(0,0,0)
}
// 离开过渡的开始状态
.slide-leave {
  transform: translate3d(0,0,0)
}
/*
离开过渡生效时的状态；在整个离开过渡的阶段中应用；
离开过渡被触发时立刻生效；用来定义离开过渡的过程时间，
延迟和曲线函数
*/.slide-leave-active {
  transition: all 0.3s
}
// 定义离开过渡的结束状态
.slide-leave-to {
  transform: translate3d(100%,0,0)
}
/* 定义侧滑动画 end */

.fade-enter {
  opacity: 0
}
.fade-enter-active {
  transition: opacity 0.3s
}
.fade-enter-to {
  opacity: 1
}
.fade-leave {
  opacity: 1
}
.fade-leave-active {
  transition: opacity 0.3s
}
.fade-leave-to {
  opacity: 0
}
</style>
