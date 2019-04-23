<template>
  <div class="order-detail">
    <div class="store-info-wrapper">
      <div class="name-wrapper">
        <image src="/static/images/store-location-map.png"></image>
        <text class="name">{{orderDetail.storeName}}</text>
        <text class="distance"></text>
      </div>
      <div class="star-wrapper">
        <image class="star" src="/static/images/store-star-fill.png"></image>
        <image class="star" src="/static/images/store-star-fill.png"></image>
        <image class="star" src="/static/images/store-star-fill.png"></image>
        <image class="star" src="/static/images/store-star-fill.png"></image>
        <image class="star" src="/static/images/store-star-fill.png"></image>
      </div>

      <text class="address">{{orderDetail.storeAddress}}</text>
    </div>


    <div class="good-list">

      <div v-for="(good,index) in goodList" :key="index" class="good-item">
        <ordergooditem :goodInfo="good"></ordergooditem>
        <div class="line-1-px" v-if="index<goodList.length-1"></div>
      </div>

    </div>

    <!--<div class="ordergood-wrapper">-->
      <!--<ordergooditem></ordergooditem>-->
      <!--<div class="line-1-px"></div>-->
      <!--<ordergooditem></ordergooditem>-->
    <!--</div>-->

    <div class="price-wrapper">
      <div class="item">
        <text>商品总金额</text>
        <text>￥{{orderDetail.cartsAmount}}</text>
      </div>
      <div class="line-1-px"></div>
      <div class="item other-color" v-if="false">
        <text>优惠券</text>
        <text>已减￥1.00</text>
      </div>
      <div class="line-1-px" v-if="false"></div>
      <div class="item other-color">
        <text>实付金额</text>
        <text>￥{{orderDetail.payable}}</text>
      </div>
    </div>

    <div class="order-info-wrapper">
      <text class="title">订单信息</text>
      <text class="info">订单编号：{{orderDetail.createId}}</text>
      <text class="info">下单时间：{{orderDetail.createTime}}</text>
      <text class="info">支付方式：{{orderDetail.paymentTypeStr}}</text>
      <text class="info">订单备注：{{orderDetail.description?orderDetail.description:'无'}}</text>

    </div>


    <!--<div class="pay-wrapper">-->
      <!--<div class="btn-pay" @click="payShopCarTryCatch">去支付</div>-->
    <!--</div>-->
  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  /**
   *  status 1：待付款 2：可使用 3：完成 4：退款 5已取消
   * */
  import ordergooditem from '@/components/orderGoodItem'

  export default {
    config: {
      navigationBarTitleText: '订单详情'
    },

    components: {
      ordergooditem
    },
    data() {
      return {
        message: '订单详情',
        orderId:'',
        goodList:[],
        orderDetail:{}
      };
    },

    onLoad(options) {


      if (options && options.data) {
        this.orderId = JSON.parse(options.data).orderId
      }
      this.wxRequest.get.call(this, this.wxUrl.getOrderDetail, {needToken: true,orderId:this.orderId}).then(res => {
        console.log('order detail success', res.data)
        this.goodList = res.data.content.commoditys
        this.orderDetail = res.data.content.order
      }, res => {
        console.log('order detail fail', res)

      })
    },

    onUnload() {
      Object.assign(this.$data, this.$options.data())//清楚页面数据
    },
    mounted() {

    },

    methods: {}
  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .order-detail {
    padding-bottom: rpx(120);
    .store-info-wrapper {
      display: flex;
      flex-direction: column;
      padding: rpx(20);
      background-color: white;
      .name-wrapper {
        display: flex;
        align-items: center;

        image {
          @include WH(25, 32);
          margin-right: rpx(12);
        }
        .name {
          @include FCS(#333333, 32, 40, 40);
          flex: 1;
        }
        .distance {
          margin-right: rpx(10);
          @include FCS(#999999, 26, 34, 34);
        }
      }

      .star-wrapper {
        display: flex;
        margin-top: rpx(12);
        margin-left: rpx(37);
        .star {
          @include WH(32, 32);
        }
        .star + .star{
          margin-left: rpx(6);
        }
      }
      .address {
        margin-top: rpx(18);
        margin-left: rpx(37);
        @include FCS(#999999, 26, 34, 34);
      }
    }

    .good-list{
      margin-top: rpx(20);
      /*padding: 0 0 0 rpx(22);*/
      background-color: white;
      .line-1-px{
        margin-left: rpx(30);
      }
    }


    .price-wrapper {
      margin-top: rpx(20);
      padding-left: rpx(30);
      background-color: white;
      .item {
        display: flex;
        height: rpx(112);
        padding-right: rpx(30);
        align-items: center;
        text:first-child {
          flex: 1;
          @include FCS(#333333, 32, 40, 40);
        }
        text:nth-child(2) {
          @include FCS(#333333, 32, 40, 40);
        }

        &.other-color {
          text:nth-child(2) {
            @include FCS(#FF766F, 32, 40, 40);
          }
        }
      }
    }

    .order-info-wrapper{
      display: flex;
      flex-direction: column;
      background-color: white;
      margin: rpx(20) 0 ;
      padding: rpx(30);
      .title{
        margin-bottom: rpx(26);
        @include FCS(#333333, 32, 40, 40);
      }
      .info{
        @include FCS(#999999, 26, 34, 34);
        margin-bottom: rpx(16);
      }
    }


    .pay-wrapper {
      display: flex;
      position: fixed;
      padding: 0 rpx(30);
      bottom: 0;
      left: 0;
      right: 0;
      height: rpx(100);
      justify-content: center;

      .btn-pay {
        text-align: center;
        @include WH(240, 78);
        background-color: #37D0B3;
        @include FCS(#FFFFFF, 32, 78, 78);
        border-radius: rpx(40);
      }
    }
  }
</style>
