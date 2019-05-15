<template>
  <div class="home">
    <!--previous-margin="20rpx" next-margin="40rpx"-->
    <swiper autoplay circular interval="100000">

      <template v-if='bannerList&&bannerList.length>0'>
        <swiper-item  v-for="(item,index) in bannerList" :key="index">
          <div class="swiper-inner">
            <image class="i1" mode='aspectFill' :src="item.imageUrl"></image>
          </div>
        </swiper-item>
      </template>


      <swiper-item v-else>
        <div class="swiper-inner">
          <image class="i1" mode='aspectFill' src="/static/images/index-banner.png"></image>
        </div>

      </swiper-item>

    </swiper>

    <div class="my-info" @click="toOfflineStorePage">
      <template v-if="userInfo&&userInfo.imageUrl">
        <div class="huangguan-wrapper">
          <image class="icon-huangguan" src="/static/images/icon-huangguan.png" v-if="memberInfo.status==1"></image>
          <image class="avater" :src="userInfo.imageUrl"></image>
        </div>

      </template>
      <template v-else>
        <image class="avater" src="/static/images/default-avater.png"></image>
      </template>

      <text class="nickname">{{userInfo.nickname}}</text>
      <text v-if="userInfo&&userInfo.nickname" class="member">{{memberInfo.status == 1 ? '尊享会员' : '普通会员'}}</text>
      <image v-if="userInfo&&userInfo.nickname" class="imember" src="/static/images/index-green-vip-code.png"></image>
      <text v-if="userInfo&&userInfo.nickname" class="vip-code">会员码</text>
      <!--<div class="center">升级会员 <image class="member-arrow" src="/static/images/member-arrow.png"></image></div>-->
    </div>

    <div class="w1" @click="onWork">
      <div class="online-shop">
        <image mode='aspectFill' src="/static/images/index-img01.png"></image>
        <div class="title">在线购物</div>
      </div>
      <div class="today-discount">
        <image mode='aspectFill' src="/static/images/index-img02.png"></image>
        <div class="title">今日特惠</div>
      </div>
    </div>

    <div class="w2" @click="onWork">
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
        bannerList: []
      };
    },

    props: ['userInfo', 'memberInfo'],

    onLoad() {
      this.initBanner()
    },
    methods: {

      onWork() {
        wx.showToast({
          title: '该功能暂未开放',
          icon: 'none'
        })
      },

      initBanner() {
        this.wxRequest.get.call(this, this.wxUrl.getBannerAdv, {needToken: true, type: 3, limit: 3}).then(res => {
          this.bannerList = res.data.content
        }, res => {
        })
      },
      toOfflineStorePage() {
        this.wxNavigate.navigateToPage('offlineStore')
      }
    }

  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .home {
    swiper {
      /*background-color: #FFB9B9;*/
      padding: rpx(20) 0;
      height: rpx(320);
      swiper-item {
        border-radius: rpx(10);
      }

      .swiper-inner {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 0 rpx(20);
      }
      image {
        /*background-color: #e6e6ea;*/
        height: 100%;
        width: 100%;
        border-radius: rpx(10);
      }
    }

    .my-info {
      background-color: white;
      padding: rpx(35) rpx(20);
      margin: 0 rpx(20) rpx(20) rpx(20);
      display: flex;
      border-radius: rpx(10);
      align-items: center;

      .huangguan-wrapper {
        position: relative;
        .icon-huangguan {
          @include WH(68, 38);
          left: rpx(10);
          top: rpx(-17);
          position: absolute;
        }
        .avater {
          background-color: #e6e6ea;
          @include WH(88, 88);
          border-radius: 50%;
        }
      }

      .avater {
        background-color: #e6e6ea;
        @include WH(88, 88);
        border-radius: 50%;
      }

      .nickname {
        @include FCS(#7F7F7F, 32, 40, 40);
        margin-left: rpx(20);
        margin-right: rpx(30);
      }
      .member {
        @include FCS(#7F7F7F, 24, 40, 40);
        opacity: 0.8;
        flex: 1;
      }

      .imember {
        @include WH(82, 82);
      }
      .vip-code {
        margin-left: rpx(18);
        @include FCS(#7F7F7F, 24, 40, 40);
        opacity: 0.8;
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
        .member-arrow {
          margin-left: rpx(8);
          @include WH(11, 13);
        }
      }

    }

    .w1 {
      display: flex;
      margin: 0 rpx(20);
      justify-content: space-between;

      .title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        @include FCS(#FFFEFE, 24, 40, 40);
        opacity: 0.8;
        border-radius: rpx(10);
        background-color: #29C3A6;
        filter: grayscale(100%);
      }
      .online-shop {
        @include WH(470, 250);
        background-color: white;
        border-radius: rpx(10);
        position: relative;
        image {
          @include WH(470, 250);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

      }
      .today-discount {
        @include WH(230, 250);
        background-color: white;
        border-radius: rpx(10);
        position: relative;
        image {
          @include WH(230, 250);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }

    }

    .w2 {
      display: flex;
      margin: rpx(20);
      justify-content: space-between;
      .title {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        @include FCS(#FFFEFE, 24, 40, 40);
        opacity: 0.8;
        border-radius: rpx(10);
        background-color: #29C3A6;
        filter: grayscale(100%);
      }
      .item {
        @include WH(230, 250);
        background-color: white;
        border-radius: rpx(10);
        position: relative;
        image {
          @include WH(230, 250);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }

    }
  }


</style>
