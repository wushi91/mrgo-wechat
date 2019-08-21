<template>
  <div class="get-coupon-item"  @click="orderItemClick">
    <div class="ticket">
      <image class="coupon-image" :src="couponInfo.imgUrl?couponInfo.imgUrl:'/static/images/icon-coupon-default.png'"></image>
    </div>

    <div class="text-wrapper">
      <text class="title">{{couponInfo.name}}</text>
      <div class="number-wrapper"><text class="total-number">已领{{couponInfo.receivedQuantity}}张</text><text class="shengyu-number">剩余{{couponInfo.surplusQuantity}}张</text></div>
      <text class="time" v-if="couponInfo.receiveStatus===1">剩余时间：{{couponInfo.surplusTime}}</text>
    </div>


    <div class="btn-wrapper" v-if="couponInfo.receiveStatus===1" @click="receiveCoupon">
      <text>免费领</text>
    </div>

    <div class="btn-wrapper" style="background-color: #999999;" v-if="couponInfo.receiveStatus===2">
      <text>已领取</text>
    </div>

    <div class="btn-wrapper" style="background-color: #FFFFFF;" v-if="couponInfo.receiveStatus===3">
      <text style="color: #999999;">被领完</text>
    </div>

    <div class="btn-wrapper" style="background-color: #FFFFFF;" v-if="couponInfo.receiveStatus===4">
      <text style="color: #999999;">已结束</text>
    </div>

  </div>
</template>

<script>


  /**
   * 领取优惠券的状态 1：可领取 2：已领取 3：领取完
   */
  export default {

    props:{
      iClass:String,
      couponInfo:{
        type:Object,
        default:{}
      },
    },
    data() {
      return {

      }
    },

    computed:{


    },

    methods: {

      receiveCoupon() {
        this.$emit('receiveCoupon', {couponId: this.couponInfo.couponId})
      },



    },
  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";

  .get-coupon-item {
    box-shadow:0 0 rpx(24) 0 rgba(182,216,210,0.14);
    background-color: white;
    @include WH(690, 180);
    display: flex;
    align-items: center;
    .ticket {
      width: rpx(212);
      height: 100%;
      position: relative;
      background: #37D0B3;
      display: flex;
      justify-content: center;
      align-items: center;
      .coupon-image {
        @include WH(112, 112);
        border-radius: 50%;
      }
    }
    .ticket:before {
      content: '';
      display: block;
      width: rpx(22.5);
      height: 100%;
      background-size: rpx(23) rpx(23); /* 一个repeat的大小 */
      background-repeat: repeat-y;
      background-image: radial-gradient(#fff rpx(8), transparent rpx(8));
      position: absolute;
      top: 0;
    }
    .ticket:before {
      left: rpx(-11); /* 半圆，只显示一个repeat的一半 */
    }

    .text-wrapper {
      display: flex;
      flex-direction: column;
      padding:0 0 0 rpx(30);
      flex: 1;
      .title{
        @include FCS(#37D0B3,32,40,40);
        margin-bottom: rpx(20);
      }
      .number-wrapper{
        display: flex;
        .total-number{
          @include FCS(#999999,24,30,30);
          margin-right: rpx(22);
        }
        .shengyu-number{
          @include FCS(#FF766F,24,30,30);
        }
      }

      .time{
        margin-top: rpx(10);
        @include FCS(#999999,24,30,30);
        font-weight: 400;
      }

    }

    .btn-wrapper{
      @include WH(56,140);
      background-color: #37D0B3;
      border-radius: rpx(28);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: rpx(30);
      text{
        color: white;
        font-size:rpx(24);
        width: rpx(24);
      }
    }

  }

</style>
