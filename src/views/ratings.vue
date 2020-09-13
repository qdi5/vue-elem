<template>
  <div class="ratings" ref="ratings">
    <div class="scroll-body">
      <div class="rating-info flex-h">
        <div class="rating-score border-1px-r">
          <div class="score">{{ seller.score }}</div>
          <div class="text">综合评分</div>
          <div class="percent">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="rating-detail">
          <div class="wrap flex-h flex-v-center">
            <span class="type">服务态度</span>
            <rating-star :score="seller.serviceScore" :size="36"></rating-star>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="wrap flex-h flex-v-center">
            <span class="type">商品评分</span>
            <rating-star :score="seller.foodScore" :size="36"></rating-star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="wrap flex-h flex-v-center">
            <span class="type">送达时间</span>
            <span class="delivery-time">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <div class="split-area"></div>
      <div class="goods-comments">
        <div class="comments-header">
          <div class="flex-h comments-btn-group border-1px-b">
            <div class="comments-btn" @click="filter = 'all'" :class="{ active: filter ==='all' }">全部 {{ ratings.length }}</div>
            <div class="comments-btn recommend" @click="filter = 'good'" :class="{ active: filter ==='good'}">满意 {{ goodNumber }}</div>
            <div class="comments-btn bad" @click="filter = 'bad'" :class="{ active: filter ==='bad'}">不满意 {{ badNumber }}</div>
          </div>
          <div class="filter border-1px-t">
            <i class="icon-check_circle" :class="{ on: onlyContent }" @click="onlyContent = !onlyContent"></i>
            <span class="text">只看有内容的评价</span>  
          </div>
        </div>
        <div class="comments-body">
          <div class="comments-item border-1px-b" v-for="(rating, index) in filterRatings" :key="index">
            <div class="item-wrap">
              <div class="comment-top flex-h justify">
                <div class="user flex-h">
                  <img class="avatar" :src="rating.avatar" alt="">
                  <div class="name-star">
                    <p class="nick-name">{{ rating.username }}</p>
                    <rating-star :score="rating.score"></rating-star>
                    <span class="delivery-time">
                      {{ rating.deliveryTime }}分钟送达
                    </span>
                  </div>
                </div>
                <div class="time">{{ rating.rateTime }}</div>
              </div>
              <div class="comment-text">
                {{ rating.text }}
              </div>
              <div class="goods-tags flex-h wrap">
                <i class="icon-thumb_up icon"></i>
                <span class="tag border-1px" v-for="(item, index) of rating.recommend" :key="index">{{ item }}</span>
              </div>
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import request from 'utils/request'
import RatingStar from 'components/rating-star/rating-star.vue'
import BScroll from 'better-scroll'
export default {
  name: 'ratings',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      onlyContent: true,
      filter: 'all'
    }
  },
  created () {
    request.get('/api/ratings').then(response => {
      console.log(response)
      const pData = response.data
      if (!pData) {
        return 
      }
      const data = pData.data
      const isOk = pData.errno === 0
      if (isOk) {
        this.ratings = data
      }
    }).catch(err => {
      console.log(err)
    })
  },
  mounted () {
    this.BScroll = new BScroll(this.$refs.ratings, {
      click: true
    })
  },
  computed: {
    goodNumber () {
      return this.ratings.filter(item => item.rateType === 0).length
    },
    badNumber () {
      return this.ratings.filter(item => item.rateType === 1).length
    },
    // 过滤评价
    filterRatings () {
      // 展示所有评价
      if (this.filter === 'all' && !this.onlyContent) {
        return this.ratings
      }
      return this.ratings.filter(item => {
        if (this.filter === 'all') {
          return item.text.trim() !== ''
        }
        let condition = this.filter === 'good' ? item.rateType === 0 : item.rateType === 1
        if (this.onlyContent) {
          return condition && item.text.trim() !== ''
        } else {
          return condition
        }
      })
    }
  },

  components: {
    RatingStar
  }

}
</script>

<style scoped lang="stylus">
.ratings {
  height: 100%;
  overflow: hidden;
}
.icon-thumb_up
  font-size: 12px
  line-height: 16px
  color: rgb(0,160,220)
.icon-check_circle
  display: inline-block
  margin-right: 4px
  font-size: 24px
  vertical-align: top
  &.on
    color: #00c850;
.rating-info
  .rating-score
    text-align: center
    flex: 0 0 36.66666666666667%
    .score
      margin-bottom: 6px
      font-size: 24px
      color: rgb(255,153,0)
      line-height: (56/2)px
    .text
      margin-bottom: 8px
      font-size: 12px
      color: #07111b
      line-height: 12px
    .percent
      margin-bottom: 6px
      font-size: 10px
      color: #93999f
  .rating-detail
    flex: 1;
    padding: 0 24px
    font-size: 12px
    .wrap
      margin-bottom: 8px
      
      .type
        margin: 0 12px 0 0
        line-height: 18px
      .rating-star
        display: inline-block
        margin-right: 12px
      .score
        line-height: 18px
        font-size: 12px
        color: rgb(255,153,0)
        margin-left: 6px
      .delivery-time
        font-size: 12px
        color: rgb(147, 153, 159)
        line-height: 18px 
  
.comments-item
    padding: 18px 0
  .item-wrap
    padding-left: 18px
    padding-right: 18px 
    
  .comment-top
    margin-bottom: 6px
    .user
      .avatar
        width: 28px
        height: 28px
        margin-right: 12px
        border-radius: 50%
      .name-star
        font-size: 0
        .nick-name
          font-size: 10px
          color: rgb(7,17,27)
          line-height: 12px
          margin-top: 0
          margin-bottom: 4px
        .delivery-time
          display: inline-block
          margin-left: 6px
          font-size: 10px
          font-weight: 200
          color: rgb(7,17,27)
    .time
      font-size: 10px
      font-weight: 200
      color: rgb(7,17,27)
      line-height: 12px      
  .comment-text
    padding: 6px 0 8px 40px
    font-size: 12px
    color: rgb(7,17,27)
    line-height: 18px
  .goods-tags
    padding-left: 40px
    .icon
      vertical-align: middle
      line-height: 25px
    .tag
      margin-left: 8px
      margin-bottom: 3px
      padding: 3px 6px
      font-size: 9px
      color: rgb(147,153,159)
      line-height: 16px
      background: #fff
</style>
