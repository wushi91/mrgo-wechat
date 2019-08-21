<template>
  <div class="get-coupon-item" :class="iClass">

    <div class="ticket-wrapper">
      <div class="ticket">
      <span class="money">
        <text>{{amountYuan}}</text>
        <text>.{{amountJiao}}</text>
      </span>
      </div>

      <div class="text-wrapper" @click="showDetail= !showDetail">
        <text class="title">{{couponInfo.name}}</text>
        <text class="time">有效期：{{beginTime}}-{{endTime}}</text>
        <div class="detail-wrapper" >
          <text class="detail">详细信息</text>
          <image class="icon-coupon-detail" src="/static/images/icon-coupon-detail.png" ></image>
        </div>

      </div>
    </div>

    <div class="remark-wrapper" v-show="showDetail">
      <div>{{couponInfo.description?couponInfo.description:'无'}}</div>
    </div>

  </div>
</template>

<script>


  /**
   * 领取优惠券的状态 1：可领取 2：已领取 3：领取完
   */
  export default {

    props: {
      iClass: String,
      couponInfo:{
        type:Object,
        default:{}
      },
    },

    data() {
      return {
        showDetail:false
      }
    },

    computed: {
      amountYuan(){
        return parseInt(this.couponInfo.amount)
      },
      amountJiao(){
        return this.couponInfo.amount.toFixed(2).split('.')[1]
      },
      beginTime(){
        return this.couponInfo.beginTime.split(' ')[0].split('-').join('.')
      },
      endTime(){
        return this.couponInfo.endTime.split(' ')[0].split('-').join('.')
      }
    },

    created() {

    },
    methods: {


      orderItemClick() {
//        this.$emit('orderItemClick', {name: ''})
      },



    },
  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";

  .get-coupon-item {
    display: flex;
    flex-direction: column;
    width: rpx(690);
    .ticket-wrapper{
      box-shadow: 0 0 rpx(24) 0 rgba(182, 216, 210, 0.14);
      background-color: white;
      height: rpx(180);
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

      .money {
        @include FCS(#FFFFFF, 26, 66, 66);
        :first-child{
          font-size: rpx(60);
        }
        &:before {
          content: "￥";
          font-size: rpx(26);
        }
      }

      .text-wrapper {
        display: flex;
        flex-direction: column;
        padding: 0 0 0 rpx(30);
        flex: 1;
        .title {
          @include FCS(#37D0B3, 32, 40, 40);
          margin-bottom: rpx(20);
        }


        .time {
          @include FCS(#666666, 26, 30, 30);
          font-weight: 400;
          margin-bottom: rpx(10);
        }

        .detail-wrapper{
          display: flex;
          align-items: center;
          padding-top: rpx(10);
          .detail{
            flex:1;
            @include FCS(#666666, 24, 30, 30);
          }
          .icon-coupon-detail{
            @include WH(20,20);
            margin-right: rpx(30);
          }
        }

      }

    }

    .remark-wrapper{
      padding:rpx(10) rpx(40);
      background-color: #EEEEEE;
      @include FCS(#666666,24,32,D);
      box-shadow:0 0 rpx(24) 0 rgba(182,216,210,0.14);
      transition: all 1s;
    }

  }

</style>
