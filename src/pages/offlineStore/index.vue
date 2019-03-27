<template>
  <div class="offline-store">
    <div class="card-vip">
      <image src="/static/images/bg_vip.png"></image>
      <div class="card-content">
        <text class="t1">MR.GO 智慧无人便利店</text>
        <div class="divcenter">
          <div>
            <text class="t21">VIP</text>
            <text class="t22">尊享会员</text>
          </div>
        </div>
        <text class="t3">8855 9766 9877 3152</text>
      </div>
    </div>

    <div class="member-info">
      <div class="item">
        <text class="t1">积分</text>
        <text class="t2">100</text>
      </div>

      <div class="item">
        <text class="t1">会员</text>
        <text class="t2">尊享会员</text>
      </div>

      <div class="item">
        <text class="t1">优惠券</text>
        <text class="t2">5张</text>
      </div>
    </div>

    <image class="qr-code" src="/static/images/qr-code.png"></image>

    <div class="buy-entry">
      <image src="/static/images/offline-shopcar.png"></image>
      <image src="/static/images/offline-saoyisao.png"></image>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '线下购物',

      };
    },
    mounted() {

    },

    methods: {}
  };
</script>

<style>
  html,page{
    background-color: white;
  }
</style>
<style lang="scss" scoped>

  @import "../../common/scss/base";



  .offline-store {
    display: flex;
    flex-direction: column;
    align-items: center;
    .card-vip {
      display: flex;
      margin-top: rpx(20);
      position: relative;
      image {
        @include WH(709, 316);
      }
      .card-content {
        position: absolute;
        top: 0;
        left: 0;
        @include WH(709, 316);
        border-radius: rpx(10);
        display: flex;
        flex-direction: column;
        padding: rpx(18) rpx(30);
        box-sizing: border-box;
        .t1 {
          @include FCS(#FFFFFF, 32, 40, 40);
        }
        .t21 {
          @include FCS(#FFFFFF, 72, 80, 80);
        }
        .t22 {
          @include FCS(#FFFFFF, 36, 44, 44);
        }
        .t3 {
          @include FCS(#FFF1DB, 32, 40, 40);
          margin-left: rpx(10);
        }
        .divcenter {
          flex: 1;
          display: flex;
          align-items: center;
          margin-left: rpx(35);
        }
      }
    }

    .member-info {
      display: flex;
      width: 100%;
      padding:rpx(30) 0;
      .item {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        .t1 {
          @include FCS(#999999, 32, 40, 40);
          margin-bottom: rpx(12);
        }
        .t2 {
          @include FCS(#333333, 32, 40, 40);
        }

      }

    }
    .qr-code{
      margin-top: rpx(10);
      margin-bottom: rpx(85);
      @include WH(336,336);
    }

    .buy-entry{
      display: flex;
      image{
        @include WH(195,195);
      }
      image:first-child{
        margin-right: rpx(102);
      }
    }

  }
</style>
