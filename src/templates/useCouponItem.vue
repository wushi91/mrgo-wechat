<template>
  <div class="use-coupon-item" :class="iClass" @click="handleUseCouponItemClick">
    <div class="ticket-wrapper">
      <div class="ticket">
      <span class="money">
        <text>5</text>
        <text>.00</text>
      </span>
      </div>

      <div class="text-wrapper">
        <text class="title">全场券</text>
        <text class="time">有效期：2019.02.10-2019.02.10</text>

        <div class="detail-wrapper" >
          <text class="detail">详细信息</text>
          <image class="icon-coupon-detail" src="/static/images/icon-coupon-detail.png" @click.stop="showDetail=!showDetail"></image>
        </div>
      </div>



      <div class="reason-wrapper" v-if="!couponInfo.canUse">
        <text>{{couponInfo.reason}}</text>
      </div>


      <image class="icon-coupon-select" src="/static/images/icon-coupon-select.png"
             v-if="couponInfo.canUse&&couponInfo.select"></image>
    </div>

    <div class="remark-wrapper" v-show="showDetail">
      <div>优惠套餐活动不可使用，优惠套餐活动不可使用，优惠套餐活动不可使用这是中国海军，你已经侵入我军领域。</div>
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
      couponInfo: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {
        showDetail:false
      }
    },

    computed: {},

    created() {

    },
    methods: {


      handleUseCouponItemClick() {
        console.log('handleUseCouponItemClick', 'emit')
        this.$emit('useCouponItemClick', {couponInfo: this.couponInfo})
      },


    },
  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";

  .use-coupon-item {
    display: flex;
    flex-direction: column;
    width: rpx(690);
    .ticket-wrapper {
      box-shadow: 0 0 rpx(24) 0 rgba(182, 216, 210, 0.14);
      background-color: white;
      height: rpx(180);
      display: flex;
      align-items: center;
      position: relative;
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
        :first-child {
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
        }}


      .reason-wrapper {
        position: absolute;
        top: rpx(20);
        right: rpx(20);
        text {
          @include FCS(#999999, 26, 32, 32);
        }
      }

      .icon-coupon-select {
        position: absolute;
        top: 0;
        right: 0;
        @include WH(60, 60);
      }

    }

    .remark-wrapper{
      padding:rpx(10) rpx(40);
      background-color: #EEEEEE;
      @include FCS(#666666,24,32,D);
      box-shadow:0 0 rpx(24) 0 rgba(182,216,210,0.14);
    }
  }



</style>
