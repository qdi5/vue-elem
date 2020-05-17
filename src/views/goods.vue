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
            </div>
            <!-- 加减按钮 begin-->
            <div class="handle-btn-wrapper">
              <div class="handle-btn flex-h flex-v-center" >
                <div class="decrease-wrapper flex-h flex-v-center flex-h-center">
                  <i class="icon-decrease icon-remove_circle_outline"></i>
                </div>
                <div class="goods-number flex-h flex-v-center flex-h-center">1</div>
                <div class="add-wrapper flex-h flex-v-center flex-h-center">
                  <i class="icon-add icon-add_circle"></i>
                </div>
              </div>
            </div>
            <!-- 加减按钮 end-->

          </div>
        </section>
      </div>
    </div>
     <!-- 底部购物车 begin -->
    <div class="shop-cart-wrapper flex-h flex-v-center" @click="isShowShopCart = !isShowShopCart">
      <div class="shop-cart-left flex-h flex-v-center">
        <div class="shop-cart-icon-wrapper">
          <div class="shop-cart-icon-outside flex-h flex-v-center flex-h-center">
            <div class="shop-cart-icon-inner active flex-h flex-v-center flex-h-center">
              <div class="goods-number">99</div>
              <i class="shop-cart-icon icon-shopping_cart"></i>

            </div>
          </div>
        </div>
        <div class="price">
          &yen; 0
        </div>
      </div>
      <div class="border-1px-l shop-cart-center">
        另需配送费&yen; 4元
      </div>
      <div class="shop-cart-right">
        &yen; 20起送
      </div>
      <!-- 购物车清单 -->
      <div class="shop-cart-list-wrapper" v-show="isShowShopCart" @click.stop="">
         <div class="shop-cart-list">
           <div class="shop-cart-top flex-h flex-v-center justify">
             <div class="shop-cart-title">购物车</div>
             <div class="clear">清空</div>
           </div>
           <ul class="goods-items-wrapper">
           	<li class="goods-item flex-h flex-v-center justify" v-for="index in 4" :class="{'border-1px-b': index !== 4}" :key="index">
              <div class="goods-name">
                链子核桃黑米粥
              </div>
              <div class="handle-wrapper">
                <span class="price">&yen; {{ index }}</span>
                <div></div>
              </div>
            </li>
           </ul>
         </div>
         <div class="shop-cart-list-mask" @click="isShowShopCart=false"></div>
      </div>
    </div>
    <!-- 底部购物车 end -->
    <goods-detail :food="food" @close-goods-detail="closeGoodsDetail" v-if="isShowGoodsDetail"></goods-detail>
  </div>
</template>

<script>
// @ is an alias to /src
import request from 'utils/request'
import GoodsDetail from 'components/goods/GoodsDetail'
import BScroll from 'better-scroll'
export default {
  name: 'ratings',
  data: () => ({
    titles: null,
    goods: null,
    isShowShopCart: false,
    isShowGoodsDetail: false,
    food: null,
    // BScroll滚动过的距离
    scrollY: 0,
    // 当前索引
    currentIndex: 0
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
            debugger
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
      debugger
      console.log(event, event._constructed)
      this.currentIndex = index
      if (this.GoodsWrapperScroll) {
        this.GoodsWrapperScroll.scrollToElement(this.$refs.goodsItems[index])
      }
    }
  },
  components: {
    GoodsDetail
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
    height: 94px
    padding: 0 0 18px 18px
    box-sizing: border-box
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
    flex-shrink: 0
    flex-grow: 0
    img
      width: 100%
      height: 100%
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

.shop-cart-wrapper
  position: fixed
  left: 0
  right: 0
  bottom: 0
  width: 100%
  height: (94 / 2)px
  padding-left: ((36 - 22) / 2)px
  font-size: 16px
  font-weight: bold
  color: rgba(255, 255, 255, 0.4)
  background-color: #141d27
  box-sizing: border-box
.shop-cart-left

  .price
    padding: 0 12px
.shop-cart-center
  flex: 1
  font-weight: normal
  padding-left: 12px
  &:before {
      setLeftLine(rgba(255, 255, 255, 0.6))
      margin-top: -5px
      margin-bottom: -5px
    }
.shop-cart-right
  box-sizing: border-box
  width: (210/2)px
  height: 100%
  padding: 0 8px
  font-size: 12px
  line-height: (94 / 2)px
  text-align: center
  background-color: #2B333B

.shop-cart-icon-outside
  position: relative
  margin-top: -11px
  width: 56px
  height: 56px
  background-color: #141d27
  border-radius: 50%
.shop-cart-icon-inner
  position: relative
  width: 44px
  height: 44px
  border-radius: 50%
  color: rgba(255, 255, 255, 0.4)
  background-color: #2B343C
  &.active
    color: #fff
    background-color: rgb(0, 160, 220)
  .shop-cart-icon
    font-size: 24px
  .goods-number
    position: absolute
    top: -5px;
    right: -11px;
    width: 24px
    height: 16px
    line-height: 16px
    font-size: 9px
    font-weight: bold
    border-radius: 12px
    text-align: center
    color: #ffffff
    background-color: rgb(240, 20, 20)
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)

.shop-cart-list-wrapper
  position: absolute
  bottom: (94 / 2)px
  left: 0
  right: 0
  width: 100%
  color: rgb(7, 17, 27)
  background-color: #fff
  font-size: 14px
  z-index: -1
  overflow: hidden
.shop-cart-list
  position: relative
  background: #fff
  z-index: 11
  .shop-cart-top
    height: 40px
    padding: 0 18px
    border-bottom: 2px solid rgba(7, 17, 27, 0.1)
    font-size: 12px
    background-color: #f3f5f7
  .shop-cart-title
    font-size: 14px
    color: rgb(7, 17, 27)
    font-weight normal
  .clear
    color: rgb(0, 160, 220)
  .goods-items-wrapper
    padding: 0 18px
  .goods-item
    height: (96/2)px
    margin: 0
    padding: 12px 0
    box-sizing: border-box

.handle-wrapper
  .price
    color: rgb(240, 20, 20)
    margin: 0 12px 0 18px
.shop-cart-list-mask
  fixed-element(-1, 0)
  background-color: rgba(7, 17, 27, 0.6)
  filter:blur(10px)



</style>
