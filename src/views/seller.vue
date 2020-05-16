<template>
  <div class="seller">    
    <div class="seller-brief">
      <div class="seller-top flex-h border-1px-b">
        <div class="left">
          <h1 class="name">粥品香坊（ 大运村 ）</h1>
          <span class="rating-star seller-rating">
            <i class="star-item"></i>
            <i class="star-item"></i>
            <i class="star-item"></i>
            <i class="star-item half"></i>
            <i class="star-item off"></i>
          </span>
          <span class="rating-number">(661)</span>
          <span class="sale-number">月售690单</span>
        </div>
        <div class="right">
          <i class="icon-favorite active favorite-icon"></i>
          <div class="collect">已收藏</div>
        </div>
      </div>
      <div class="seller-detail flex-h">
        <div class="character">
          <div class="first">起送价</div>
          <div><b>20</b>元</div>
        </div>
        <div class="character border-1px-l">
          <div class="first">商家配送</div>
          <div><b>4</b>元</div>
        </div>
        <div class="character border-1px-l">
          <div class="first">平均配送时间</div>
          <div><b>39</b>分钟</div>
        </div>
      </div>
    </div>
    <div class="split-area"></div>
    <div class="broadcast border-1px-b">
      <div class="title">公告与活动</div>
      <p class="text border-1px-b">
        粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
      </p>
      <ul class="promotion">
        <li class="border-1px-b"><span class="bg-img decrease"></span><span>在线支付满28减5，满50减10</span>  </li>
        <li class="border-1px-b"><span class="bg-img discount"></span><span>单人精彩赛</span> </li>
        <li class="border-1px-b"><span class="bg-img discount"></span><span>清肺雪梨汤8折抢购</span> </li>
        <li class="border-1px-b"><span class="bg-img special"></span><span>特价饮品八折抢购</span> </li>
        <li class="border-1px-b"><span class="bg-img special"></span><span>单人特色套餐</span></li>
        <li class="border-1px-b"><span class="bg-img invoice"></span><span>该商家支持开发票，请在下单时填写好发票抬头</span></li>
        <li class="border-1px-b"><span class="bg-img guarantee"></span><span>以加入“外卖保”计划，食品安全保障</span></li>
      </ul>
    </div>
    <div class="split-area"></div>
    <div class="seller-photos">
      <div class="title">商家实景</div>
      <div class="photos-wrap">
        <img src="http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180" alt="">
        <img src="http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180" alt="">
        <img src="http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180" alt="">
      </div>
    </div>
    <div class="split-area"></div>
    <div class="seller-info">
      <div class="title">商家信息</div>
      <ul class="other-info">
        <li class="border-1px-t">该商家支持发票,请下单写好发票抬头</li>
        <li class="border-1px-t">品类:其他菜系,包子粥店</li>
        <li class="border-1px-t">地址:北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340</li>
        <li class="border-1px-t">营业时间:10:00-20:30</li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'seller'
}
</script>

<style scoped lang="stylus">
@import '~common/styles/mixin/mixin.styl'
/* 背景图片 */
img 
  display: inline-block
  max-width: 120px
.bg-img
  display: inline-block
  width: 16px
  height: 16px
  background-repeat: no-repeat
  background-size: 16px 16px
  vertical-align: top
.decrease 
  bg-image('~@/decrease_3')
.discount
  bg-image('~@/discount_3')
.special
  bg-image('~@/special_3')
.invoice
  bg-image('~@/invoice_3')
.guarantee
  bg-image('~@/guarantee_3')
.title
  font-size: 14px
  color: rgb(7,17,27)
  line-height: 14px
.seller-brief
  padding: 18px
  .left
    flex: 1
    padding-bottom: 18px
    .name
      margin-top: 0
      margin-bottom: 8px
      font-size: 14px
      color: rgb(7,17,27)
      line-height: 14px
      
    .seller-rating
      margin-right: 8px
    .rating-number,
    .sale-number
      display: inline-block
      line-height: 15px
      vertical-align: top
    .rating-number
      font-size: 10px
      margin-right: 12px
    .sale-number
      font-size: 10px
  .right
    text-align: center
    .favorite-icon
      font-size: 24px
      &.active
        color: #f01414
    .collect
      font-size: 10px
      color: rgb(77,85,93)
      line-height: 10px
.seller-detail
  padding-top: 18px
  .character
    flex: 1
    font-size: 10px
    color: rgb(147,153,159)
    line-height: 10px
    text-align: center
    .first
      margin-bottom: 4px
    b
      font-size: 24px
      font-weight: 400
      color: rgb(7,17,27)
      line-height: 24px
.broadcast
  padding: 18px 18px 12px
  .text
    padding: 0 12px 16px
    font-size: 12px
    font-weight: 200
    color: rgb(240,20,20)
    line-height: 24px
  .promotion
    font-size: 0
    li
      padding: 16px 12px
      font-size: 12px
      font-weight: 200
      color: rgb(7,17,27)
      line-height: 16px
      .bg-img
        margin-right: 6px
      span
        display: inline-block
        vertical-align: top
.seller-photos
  padding: 18px 0 18px 18px
  .title
    margin-bottom: 12px
  .photos-wrap
    white-space: nowrap
    overflow-x: auto
    overflow-y: hidden
    -webkit-overflow-scrolling: touch
    -ms-overflow-style: none
    font-size: 0
    /* 防止webkit浏览器中出现滚动条 */
    &::-webkit-scrollbar
      display: none
    img 
      display: inline-block
      margin-right: 6px
.seller-info
  padding: 18px
  .title
    margin-bottom: 12px
  .other-info
    font-size: 12px
    font-weight: 200
    color: rgb(7,17,27)
    line-height: 16px
    li
      padding: 16px 12px


</style>
