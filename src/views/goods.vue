<template>
  <div class="goods flex-h nowrap">
    <div class="goods-side-menu" ref="sideMenu">
      <ul v-if="titles && titles.length">
        <li v-for="(title, index) in titles" :key="index" class="flex-h flex-v-center category border-1px-b" :class="{ active: index === currentIndex }" ref="menuItems" @click="scrollToGoods(index, $event)">
          <div class="text">
            <i class="icon icon" v-if="title.type >= 0" :class="classMap[title.type]"></i>
            <span class="title-name">{{ title.name }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <div v-if="goods && goods.length">
        <section v-for="good in goods" :key="good.name" class="food-detail-wrapper" ref="goodsItems">
          <h2 class="sale-theme">{{ good.name }}</h2>
          <div class="flex-h nowrap food-detail border-1px-b" @click="showFoodDetail(food)" v-for="food in good.foods" :key="food.name">
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
              <!-- 加减按钮 begin-->
              <cart-control @add="handleAdd" :number="food.counter" @decrease="handleDecrease" :data="food"></cart-control>
              <!-- 加减按钮 end-->
            </div>
          </div>
        </section>
      </div>
    </div>
    <shop-cart ref="shopcart" :selectFood="selectFood" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
    <comm-transition name="slide">
      <goods-detail :food="food" @close-goods-detail="closeGoodsDetail" v-if="isShowGoodsDetail"></goods-detail>
    </comm-transition>
  </div>
</template>

<script>
// @ is an alias to /src
import request from 'utils/request'
import GoodsDetail from 'components/goods/GoodsDetail'
import CommTransition from 'common/components/CommTransition'
import CartControl from 'components/cartcontrol/CartControl'
import ShopCart from 'components/shopcart/shopcart.vue'
import BScroll from 'better-scroll'
export default {
  name: 'goods',
  props: {
    seller: {}
  },
  data: () => ({
    titles: null,
    goods: null,
    isShowGoodsDetail: false,
    food: null,
    // BScroll滚动过的距离
    scrollY: 0,
    // 当前索引
    currentIndex: 0,
    // 选中的菜品
    selectFood: []
  }),
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    request.get('/api/goods').then(response => {
      console.log('goods:', response)
      let data = response.data.data
      this.titles = data.map(item => ({ name: item.name, type: item.type }))
      this.goods = data
      this.$nextTick().then(() => {
        const goodsItems = this.$refs.goodsItems
        let height = 0
        const allHeight = goodsItems.map((item) => {
          height += item.offsetHeight
          return height
        })
        this.allHeight = allHeight
        console.log('heights', allHeight)
      })
    })
  },
  methods: {
    showFoodDetail (food) {
      this.food = food
      this.isShowGoodsDetail = true
    },
    closeGoodsDetail () {
      this.isShowGoodsDetail = false
    },
    calcHeight () {

    },
    calcCurrentIndex (scrollY) {
      let currentIndex = 0
      const allHeight = this.allHeight
      if (allHeight) {
        let lg = allHeight.length
        let maxIndex = lg - 1
        for (let i = 0; i < lg; i++) {
          // 如果是第一个
          if (scrollY < allHeight[0]) {
            break
            // 如果是最后一个
          } else if (scrollY >= allHeight[maxIndex]) {
            currentIndex = maxIndex
            break
            // 如果在中间
          } else {
            // 当scrollY大于等于allHeight[i]的时候，说明它已经将当前元素高度滚动完了
            // 所以，当前索引值需要加上1
            if (scrollY >= allHeight[i] && scrollY < allHeight[i + 1]) {
              currentIndex = i + 1
              break
            }
          }
        }  
      }
      return currentIndex
    },
    scrollToGoods (index, event) {
      console.log(event, event._constructed)
      this.currentIndex = index
      if (this.GoodsWrapperScroll) {
        this.GoodsWrapperScroll.scrollToElement(this.$refs.goodsItems[index])
      }
    },
    _drop (target) {
      this.$refs.shopcart.drop(target)
    },
    handleAdd (food, target) {
      console.log('增加物品啦', food, target)
      this._drop(target)
      if (!food.counter) {
        this.$set(food, 'counter', 1)
        this.selectFood.push(food)
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
        this.selectFood.some((fd, index) => {
          let isSame = fd.name === food.name
          if (isSame) {
            this.selectFood.splice(index, 1)
          }
          return isSame
        })
      }
    }
  },
  components: {
    GoodsDetail,
    CommTransition,
    CartControl,
    ShopCart
  },
  watch: {
    // 监听titles的变化，初始化better-scroll，或者刷新better-scroll
    titles (newValue) {
      if (!newValue || !newValue.length) return
      this.$nextTick().then(() => {
        if (!this.sideMenuScroll) {
          this.sideMenuScroll = new BScroll(this.$refs.sideMenu, {
            click: true
          })
        } else {
          this.sideMenuScroll.refresh()
        }
      })  
    },
    // 监听goods的变化，初始化better-scroll，或者刷新better-scroll
    goods (newValue) {
      if (!newValue || !newValue.length) return
      this.$nextTick().then(() => {
        if (!this.GoodsWrapperScroll) {
          this.GoodsWrapperScroll = new BScroll(this.$refs.goodsWrapper, {
            click: true,
            probeType: 3
          })
          this.GoodsWrapperScroll.on('scroll', pos => {
            this.scrollY = Math.abs(pos.y)
          })
        } else {
          this.GoodsWrapperScroll.refresh()
        }
      })
    },
    scrollY (newValue) {
      // 计算索引
      // 使用setTimeout节流；上一个定时器还没执行完毕，则不再执行这个定时器
      if (!this.timer) {
        this.timer = window.setTimeout(() => {
          this.currentIndex = this.calcCurrentIndex(newValue)
          console.log('计算索引啦', newValue)
          clearTimeout(this.timer)
          delete this.timer
        }, 500)
      }
    },
    // 当前索引变化时，滚动侧边栏到指定的菜单
    currentIndex (newValue) {
      if (this.sideMenuScroll) {
        this.sideMenuScroll.scrollToElement(this.$refs.menuItems[newValue])
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/styles/mixin/mixin.styl';
.goods
  height: 100%
  padding-bottom: 46px;
  box-sizing: border-box;
.icon.special
  width: 12px
  height: 12px
  background-size: 12px 12px
  bg-image('~@/assets/images/special_3')
.icon.discount
   width: 12px
   height: 12px
   background-size: 12px 12px
   bg-image('~@/assets/images/discount_1')
.goods-side-menu
  height: 100%
  width: 80px
  flex: 0 0 80px
  font-size: 12px
  color: #07111b
  background-color: #f3f5f7
  overflow: hidden
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
  height: 100%
  flex: 1
  overflow: hidden
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
    position: relative
    padding: 0 0 18px 18px
    box-sizing: border-box
    &:not(:first-child)
      margin-top: 16px
  .food-content
    flex: 1
    padding-left: 10px
    .food-name
      height: 14px
      line-height: 14px
      font-size: 14px
      color: rgb(7,17,27)
      margin: 2px 0 8px 0
    .description, 
    .sales-status
      font-size: 10px
      color: rgb(147, 153, 159)
    .sales-status
      line-height: 10px
      font-size: 10px
    .description
      line-height: 12px
      margin-bottom: 8px
    .prices
      line-height: 24px
      font-weight: 700
      .sales-price
        font-size: 14px
        color: #f01414
        font-weight: normal
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
    flex-shrink: 0
    flex-grow: 0
    img
      width: 100%
      height: 100%
</style>
