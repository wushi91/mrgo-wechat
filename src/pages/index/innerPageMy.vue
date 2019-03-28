<template>
  <div class="my">
    <div class="header-wrapper">
      <div class="avater-wrapper">
        <image class="avater"></image>
        <div class="username-wrapper">
          <text class="name">深夜小淘淘</text>
          <text class="phone">1354****726</text>
        </div>

        <iamge class="arrow"></iamge>
      </div>
      <div class="card-wrapper">
        <div class="w1">
          <text class="range">金卡会员</text>
          <text class="score">325积分</text>
          <div class="center">会员中心</div>
        </div>

        <text class="vip">VIP</text>

      </div>
    </div>
    <div class="order-wrapper" >
      <text class="title">我的订单</text>
      <div class="item-wrapper">
        <div class="item" @click="toOrderListPage('tab-wait')">
          <image></image>
          <text>待付款</text>
        </div>
        <div class="item" @click="toOrderListPage('tab-can')">
          <image></image>
          <text>可使用</text>
        </div>

        <div class="item" @click="toOrderListPage('tab-back')">
          <image></image>
          <text>退款/售后</text>
        </div>

        <div class="item" @click="toOrderListPage('tab-all')">
          <image></image>
          <text>全部订单</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {

      };
    },
    methods:{
      toOrderListPage(tab){
        wx.navigateTo({url: '/pages/orderList/index' + "?data=" + JSON.stringify({tab})})
      }
    }

  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .my{
    .header-wrapper{
      background-color: #37D0B3;
      padding-top: rpx(10);
      .avater-wrapper{
        display: flex;
        padding:0 rpx(30) rpx(14) rpx(30);
        align-items: center;
        .avater{
          @include WH(118,118);
          border-radius: 50%;
          background-color: #e6e6ea;
          flex-shrink: 0;
        }
        .username-wrapper{
          display:flex;
          flex-direction:column;
          margin-left: rpx(28);
          justify-content: center;
          flex:1;
          .name{
            @include FCS(white,32,40,40);
          }
          .phone{
            margin-top: rpx(12);
            @include FCS(white,26,34,34);
          }

        }
        .arrow{
          @include WH(64,64);
          background-color: white;
          opacity: 0.5;
          border-radius: 50%;
          flex-shrink: 0;
        }
      }

      .card-wrapper{
        position: relative;
        box-sizing: border-box;
        display: flex;
        margin:0 rpx(30);
        height:rpx(130);
        padding: rpx(17) rpx(30) 0 rpx(30);
        background:linear-gradient(66deg,rgba(238,216,167,1),rgba(241,202,143,1));
        box-shadow:0 0 rpx(9) 0 rgba(12,78,66,0.28);
        border-radius: rpx(10) rpx(10) 0 0;
        .w1{
          display: flex;
          align-items: center;
          height: rpx(58);
          .range{
            @include FCS(#876732,32,40,40);
          }
          .score{
            @include FCS(#876732,32,40,40);
            margin-left: rpx(80);
          }
          .center{
            margin-left: rpx(120);
            @include FCS(#FFFFFF,32,58,D);
            @include WH(172,58);
            border:rpx(2) solid rgba(255,255,255,1);
            opacity:0.78;
            border-radius:rpx(30);
            text-align: center;

          }
        }

        .vip{
          position: absolute;
          @include FCS(#FFF7DD,60,68,68);
          opacity:0.28;
          top:rpx(75);
        }
      }

    }

    .order-wrapper{
      margin: rpx(20) rpx(30);
      background-color: white;
      padding:rpx(20) rpx(30) rpx(24) rpx(30);
      border-radius:rpx(10);
      .title{
        @include FCS(#999999,32,40,40);
      }

      .item-wrapper{
        display: flex;
        margin-top: rpx(28);
        .item{
          flex:1;
          display: flex;
          flex-direction: column;
          align-items: center;
          image{
            @include WH(66,66);
            background-color: #e6e6ea;
          }
          text{
            margin-top: rpx(12);
            @include FCS(#393939,26,34,34);
          }
        }
      }
    }
  }

</style>
