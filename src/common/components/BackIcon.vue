<template>
   <div class="back-icon-wrapper">
      <i class="icon-arrow_lift back-icon" @click="handleClick"></i>
    </div>
</template>

<script>
export default {
  name: 'BackIcon',
  props: {
    clickAction: {
      type: Function
    }
  },
  methods: {
    handleClick () {
      if (this.clickAction) {
        this.clickAction()
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.back-icon-wrapper
  position: absolute
  top: 10px
  left: 0
  z-index: 1
.back-icon {
    display: block
    padding: 10px
    color: #fff
    font-size: 20px
}
</style>