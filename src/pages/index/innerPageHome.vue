<template>
  <div class="home">
    <swiper autoplay circular interval="100000" previous-margin="20rpx" next-margin="40rpx">
      <swiper-item>
        <image class="i1" mode='aspectFill' src="/static/images/index-banner.png"></image>
      </swiper-item>

      <swiper-item>
        <image class="i2" mode='aspectFill' src="/static/images/index-banner.png"></image>
      </swiper-item>

      <swiper-item>
        <image class="i3" mode='aspectFill' src="/static/images/index-banner.png"></image>
      </swiper-item>
    </swiper>

    <div class="my-info">
      <image class="avater"></image>
      <text class="nickname">深夜小淘淘</text>
      <text class="member">普卡会员</text>
      <image class="imember" src="/static/images/index-vip.png"></image>
      <div class="center">升级会员 <image class="member-arrow" src="/static/images/member-arrow.png"></image></div>
    </div>

    <div class="w1">
      <div class="online-shop">
        <image mode='aspectFill' src="/static/images/index-img01.png"></image>
        <div class="title">在线购物</div>
      </div>
      <div class="today-discount">
        <image mode='aspectFill' src="/static/images/index-img02.png"></image>
        <div class="title">今日特惠</div>
      </div>
    </div>

    <div class="w2">
      <div class="item">
        <image mode='aspectFill' src="/static/images/index-img03.png"></image>
        <div class="title">拼团特卖</div>
      </div>
      <div class="item">
        <image mode='aspectFill' src="/static/images/index-img04.png"></image>
        <div class="title">领取优惠券</div>
      </div>
      <div class="item">
        <image mode='aspectFill' src="/static/images/index-img05.png"></image>
        <div class="title">分享礼包</div>
      </div>

    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        bannerList:[1,23,456]
      };
    },
    methods:{

    }

  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .home{
    swiper {
      /*background-color: #FFB9B9;*/
      padding:rpx(20);
      height: rpx(320);
      swiper-item{
        border-radius: rpx(10);
      }

      image{
        background-color: #e6e6ea;
        height: 100%;
        width: 100%;
        margin: 0 rpx(20);
        border-radius: rpx(10);
      }
    }

    .my-info{
      background-color: white;
      padding:rpx(35) rpx(20);
      margin: 0 rpx(20) rpx(20) rpx(20);
      display: flex;
      border-radius:rpx(10);
      align-items: center;
      .avater{
        background-color: #e6e6ea;
        @include WH(88,88);
        border-radius: 50%;
      }
      .nickname{
        @include FCS(#7F7F7F,32,40,40);
        margin-left: rpx(20);
        margin-right: rpx(30);
      }
      .member{
        @include FCS(#7F7F7F,24,40,40);
        opacity:0.8;
        flex:1;
      }

      .imember{
        @include WH(33, 30);
      }

      .center {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 rpx(20);
        @include FCS(#FFFFFF, 24, 50, 50);
        @include WH(156, 50);
        background-color: #F5CB82;
        border-radius: rpx(25);
        text-align: center;
        .member-arrow{
          margin-left: rpx(8);
          @include WH(11,13);
        }
      }

    }

    .w1{
      display: flex;
      margin: 0 rpx(20);
      justify-content: space-between;

      .title{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        @include FCS(#FFFEFE,24,40,40);
        opacity:0.8;
        border-radius:rpx(10);
        background-color: #29C3A6;
      }
      .online-shop{
        @include WH(470,250);
        background-color: white;
        border-radius:rpx(10);
        position: relative;
        image{
          @include WH(470,250);
          position: absolute;
          top:0;
          left: 0;
          right: 0;
          bottom: 0;
        }

      }
      .today-discount{
        @include WH(230,250);
        background-color: white;
        border-radius:rpx(10);
        position: relative;
        image{
          @include WH(230,250);
          position: absolute;
          top:0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }

    }

    .w2{
      display: flex;
      margin: rpx(20) ;
      justify-content: space-between;
      .title{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        @include FCS(#FFFEFE,24,40,40);
        opacity:0.8;
        border-radius:rpx(10);
        background-color: #29C3A6;
      }
      .item{
        @include WH(230,250);
        background-color: white;
        border-radius:rpx(10);
        position: relative;
        image{
          @include WH(230,250);
          position: absolute;
          top:0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }



    }
  }


</style>
