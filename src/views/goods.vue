<template>
  <div class="goods flex-h nowrap">    
    <div class="goods-side-menu">
      <ul v-if="titles">
        <li v-for="(title, index) in titles" :key="index" class="flex-h flex-v-center category border-1px-b" :class="{ active: index === 1 }">
          <div class="text">
            <i class="icon icon" v-if="title.type >= 0" :class="classMap[title.type]"></i>
            <span class="title-name">{{ title.name }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper">
      <section v-for="good in goods" :key="good.name" class="food-detail-wrapper">
        <h2 class="sale-theme">{{ good.name }}</h2>
        <div class="flex-h food-detail border-1px-b" v-for="food in good.foods" :key="food.name">
          <div class="food-img-wrapper">
            <img :src="food.image" alt="food.name">
          </div>
          <div class="food-content">
            <h3 class="food-name">{{ food.name }}</h3>
            <div class="description" v-if="food.description">{{ food.description }}</div>
            <div class="sales-status">
              <span class="month-sales">月售{{ food.sellCount }}份</span>
              <span class="good-rate">好评率{{ food.rating }}%</span>
            </div>
            <div class="prices">
              <span class="sales-price">&yen;{{ food.price }} </span>
              <span class="origin-price" v-if="typeof food.oldPrice === 'number' && food.oldPrice >= 0">&yen;{{ food.oldPrice }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import request from 'utils/request'

export default {
  name: 'ratings',
  data: () => ({
    titles: null,
    goods: null
  }),
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    request.get('/api/goods').then(response => {
      console.log('goods:', response)
      let data = response.data.data
      this.titles = data.map(item => ({ name: item.name, type: item.type }))
      this.goods = data
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/styles/mixin/mixin.styl';
.icon.special
  width: 12px
  height: 12px
  background-size: 12px 12px
  bg-image('~@/special_3')
.icon.discount
   width: 12px
   height: 12px
   background-size: 12px 12px
   bg-image('~@/discount_1')
.goods-side-menu
  width: 80px
  flex: 0 0 80px
  font-size: 12px
  color: #07111b
  background-color: #f3f5f7
  .category
    height: (108 / 2)px
    padding: 0 10px
    &:after {
      setBottomLine(rgba(7, 17, 27, 0.1))
    } 
    &.active
      background-color: #fff
      color: #07111b
      font-weight: 400
    .text
      .icon
        margin-right: 4px
.goods-wrapper
  flex: 1
  .sale-theme
    height: (52/2)px
    line-height: (52/2)px
    margin: 0 0 18px
    padding-left: 14px
    border-left: 3px solid #d9dde1
    font-size: 12px
    color: rgb(147, 153, 159)
    background-color: #f3f5f7
  .food-detail
    padding: 0 0 18px 18px
    &:not(:first-child)
      margin-top: 16px
  .food-content
    padding-left: 10px
    .food-name
      font-size: 14px
      
      color: rgb(7,17,27)
      margin: 0 0 6px 0
    .description, .sales-status
      
      font-size: 10px
      color: rgb(147, 153, 159)
    .description
      margin-bottom: 6px
    .sales-price
      font-size: 10px
      color: #f01414
      font-weight: bolder
    .origin-price
      margin-left: 4px
      font-size: 10px
      color: rgb(147, 153, 159)
      font-weight: 400
      text-decoration: line-through
  .good-rate
    margin-left: 12px
  .food-img-wrapper
    width: (114/2)px
    height: (114/2)px
    img 
      width: 100%
      height: 100%
      

</style>
