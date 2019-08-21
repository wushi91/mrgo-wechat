<template>
  <div class="home">
    <!--previous-margin="20rpx" next-margin="40rpx"-->
    <swiper autoplay circular interval="100000" indicator-dots indicator-color="#DBDBDB" indicator-active-color="#29C3A6"	>

      <template v-if='bannerList&&bannerList.length>0'>
        <swiper-item  v-for="(item,index) in bannerList" :key="index" @click="clickSwiperItem(index)">
          <div class="swiper-inner">
            <image class="i1" mode='aspectFill' :src="item.imageUrl?item.imageUrl:item.imgUrl"></image>
          </div>
        </swiper-item>
      </template>


      <swiper-item v-else>
        <div class="swiper-inner">
          <!--<image class="i1" mode='aspectFill' src="/static/images/index-banner.png"></image>-->
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

      <div class="nickname-wrapper">
        <text class="nickname">{{userInfo.nickname}}</text>
        <template v-if="userInfo&&userInfo.nickname">
          <text class="member member-super" v-if="memberInfo.status == 1" >尊享会员</text>
          <text class="member" v-else>普通会员</text>
        </template>
      </div>

      <text class="line"></text>
      <div class="member-item">
        <text class="t1">{{memberInfo&&memberInfo.points?memberInfo.points:0}}</text>
        <text class="t2">当前积分</text>
      </div>
      <text class="line"></text>
      <div class="member-item" @click="toPage('myCoupon')">
        <text class="t1">0</text>
        <text class="t2">优惠券</text>
      </div>
      <!--<div class="vip-code-wrapper">-->
        <!--<text v-if="userInfo&&userInfo.nickname" class="vip-code">点击打开</text>-->
        <!--<text v-if="userInfo&&userInfo.nickname" class="vip-code">会员码</text>-->

      <!--</div>-->

      <!--<image v-if="userInfo&&userInfo.nickname" class="imember" src="/static/images/index-green-vip-code.png"></image>-->
      <!--<image v-if="userInfo&&userInfo.nickname" class="member-code-arrow" src="/static/images/member-code-arrow.png"></image>-->

      <!--<div class="center">升级会员 <image class="member-arrow" src="/static/images/member-arrow.png"></image></div>-->
    </div>

    <div class="three-item-wrapper">

      <div class="item" @click="chooseTab(1)">
        <image class="icon-index-scan" src="/static/images/icon-index-scan.png"></image>
        <text class="t">开门·购物</text>
      </div>

      <div class="center-item"  @click="toPage('offlineStore')">
        <div class="image-wrapper">
          <image class="icon-index-saomao" src="/static/images/icon-index-saoma.png"></image>
        </div>

        <text class="t">会员码</text>

        <div class="white-circle"></div>
      </div>

      <div class="item" @click="toOrderListPage('tab-all')">
        <image class="icon-index-scan" src="/static/images/icon-index-order.png"></image>
        <text class="t">我的订单</text>
      </div>



    </div>



    <div class="w1" >
      <div class="online-shop" @click="toPage('buyVIP')" >
        <image mode='aspectFill' src="/static/images/index-free-member.png"></image>
        <!--<div class="title">在线购物</div>-->
        <!--<div class="title">领取7天尊享会员</div>-->
      </div>
      <div class="today-discount" @click="toPage('getCoupon')">
        <!--<image mode='aspectFill' src="/static/images/index-img02.png"></image>-->
        <image mode='aspectFill' src="/static/images/index-get-cuopon.png"></image>
        <!--<div class="title">今日特惠</div>-->
        <!--<div class="title">关于MR.GO</div>-->
      </div>
    </div>

    <div class="w4">

      <!--<div class="order" @click="toOrderListPage('tab-all')">-->
      <!--&lt;!&ndash;<image mode='aspectFill' src="/static/images/index-img02.png"></image>&ndash;&gt;-->
      <!--<image mode='aspectFill' src="/static/images/index-img09.png"></image>-->
      <!--&lt;!&ndash;<div class="title">今日特惠</div>&ndash;&gt;-->
      <!--<div class="title">我的订单</div>-->
      <!--</div>-->
    </div>

    <div class="w4" >
      <div class="online-shop" @click="toPage('storeList')">
        <image mode='aspectFill' src="/static/images/index-my-order.png"></image>
        <!--<div class="title">在线购物</div>-->
        <!--<div class="title">领取7天尊享会员</div>-->
      </div>
      <div class="today-discount" @click="toPage('aboutUs')">
        <!--<image mode='aspectFill' src="/static/images/index-img02.png"></image>-->
        <image mode='aspectFill' src="/static/images/index-about-mrgo.png"></image>
        <!--<div class="title">今日特惠</div>-->
        <!--<div class="title">关于MR.GO</div>-->
      </div>
    </div>

    <!--&lt;!&ndash;<div style="width: 100rpx;height: 100rpx;background-color: honeydew" @click="onlinePay"></div>&ndash;&gt;-->
    <!--<div class="w2" v-if="false">-->
      <!--<div class="item">-->
        <!--<image mode='aspectFill' src="/static/images/index-img03.png"></image>-->
        <!--&lt;!&ndash;<div class="title">拼团特卖</div>&ndash;&gt;-->
      <!--</div>-->
      <!--<div class="item">-->
        <!--<image mode='aspectFill' src="/static/images/index-img04.png"></image>-->
        <!--&lt;!&ndash;<div class="title">领取优惠券</div>&ndash;&gt;-->
      <!--</div>-->
      <!--<div class="item">-->
        <!--<image mode='aspectFill' src="/static/images/index-img05.png"></image>-->
        <!--&lt;!&ndash;<div class="title">分享礼包</div>&ndash;&gt;-->
      <!--</div>-->

    <!--</div>-->



    <!--<button @click="onlinePay">付款码</button>-->
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

      toPage(pageUrl) {
        this.wxNavigate.navigateToPage(pageUrl)
      },
      clickSwiperItem(index){
        if(index===0)this.wxNavigate.navigateToPage('offlineStore')
      },
      onlinePay(){
        console.log('onlinePay')
        wx.openOfflinePayView({
          success:(res)=>{
            console.log('success',res)
          },
          fail:(res)=>{
            console.log('fail',res)
          }
        })
      },
      onWork() {
        wx.showToast({
          title: '该功能暂未开放',
          icon: 'none'
        })
      },

//      toAboutUsPage(){
//        this.wxNavigate.navigateToPackageAPage('aboutUs')
//      },

      initBanner() {
        this.wxRequest.get.call(this, this.wxUrl.getBannerAdv, {needToken: true, type: 3, limit: 10}).then(res => {
          this.bannerList = res.data.content
        }, res => {
        })
      },
//      toOfflineStorePage() {
//        this.wxNavigate.navigateToPage('offlineStore')
//      },
//      toBuyVIPPage(){
//        this.wxNavigate.navigateToPackageAPage('buyVIP')
//      },
      toOrderListPage(tab) {
        this.wxNavigate.navigateToPage('orderList',{tab})
      },

      chooseTab(tabIndex){
        this.$emit('chooseTab',{'tabIndex':tabIndex})
      },
    }

  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .home {
    swiper {
      /*background-color: #FFB9B9;*/
      /*padding: rpx(20) 0;*/
      height: rpx(500);
      swiper-item {
        /*border-radius: rpx(10);*/
      }

      .swiper-inner {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        /*padding: 0 rpx(20);*/
      }
      image {
        /*background-color: #e6e6ea;*/
        height: 100%;
        width: 100%;
        /*border-radius: rpx(10);*/
      }
    }

    .my-info {
      /*padding: rpx(35) rpx(5) rpx(35) rpx(20);*/
      /*margin: 0 rpx(20) rpx(20) rpx(20);*/
      padding:rpx(30) 0 rpx(20) rpx(20);
      display: flex;
      border-radius: rpx(10);
      align-items: center;
      justify-content: center;
      .huangguan-wrapper {
        display: flex;
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

      .nickname-wrapper{
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-left: rpx(36);
        .nickname {
          @include FCS(#7F7F7F, 30, 40, 40);
          margin-bottom: rpx(8);
        }
        .member {
          width: rpx(120);
          background-color: #37D2B5;
          text-align: center;
          border-radius: 0 20px 20px 20px;
          @include FCS(#FFFFFF, 24, 40, 40);

        }
        .member-super{
          background-color: #F5CB82;
        }
      }

      .line{
        @include WH(2,40);
        background-color: #7F7F7F;
      }

      .member-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: rpx(196);
        .t1{
          @include FCS(#37D2B5, 28, 36, 36);
          margin-bottom: rpx(4);
        }
        .t2{
          @include FCS(#7F7F7F, 24, 32, 32);
        }
      }


      .imember {
        @include WH(82, 82);
        margin-right: rpx(16);
      }

      .member-code-arrow{
        @include WH(26, 36);
      }

      .vip-code-wrapper{
        display: flex;
        flex-direction: column;
        margin-right: rpx(18);
        justify-content: center;
        /*align-items: center;*/
      }
      .vip-code {
        /*margin-left: rpx(18);*/
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


    .three-item-wrapper{
      display: flex;
      background-color: white;
      border-radius: rpx(10);
      margin: rpx(40) rpx(20) rpx(40) rpx(20);
      height: rpx(180);
      justify-content: center;
      align-items: center;

      .item{
        display: flex;
        flex-direction: column;
        width: rpx(182);
        justify-content: center;
        align-items: center;
        image{
          @include WH(54,54);
        }
        .t{
          margin-top: rpx(14);
          @include FCS(#333333, 24, 32, 32);
        }
      }

      .center-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex:1;
        position: relative;
        .white-circle{
          position: absolute;
          @include WH(108,108);
          background-color: white;
          border-radius: 50%;
          top: rpx(-50);
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }
        .image-wrapper{
          @include WH(108,108);
          background-color: #37D2B5;
          border-radius: 50%;
          box-shadow:0 rpx(3) rpx(12) 0 rgba(68,161,144,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          image{
            @include WH(64,64);
          }
          z-index: 9;
        }
        .t{

          margin-top: rpx(10);
          display: inline-block;
          width: rpx(108);
          text-align: center;
          @include FCS(#333333, 24, 32, 32);
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
        /*filter: grayscale(100%);*/
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
          border-radius: rpx(10);
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
          border-radius: rpx(10);
        }
      }

    }

    .w4 {
      display: flex;
      margin: rpx(10) rpx(20) rpx(20) rpx(20);
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
        /*filter: grayscale(100%);*/
      }
      .online-shop {
        @include WH(350, 250);
        background-color: white;
        border-radius: rpx(10);
        position: relative;
        image {
          @include WH(350, 250);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: rpx(10);
        }

      }
      .today-discount {
        @include WH(350, 250);
        background-color: white;
        border-radius: rpx(10);
        position: relative;
        image {
          @include WH(350, 250);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: rpx(10);
        }
      }

    }

    .w3{
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
        /*filter: grayscale(100%);*/
      }
      .order{
        @include WH(710, 250);
        background-color: white;
        border-radius: rpx(10);
        position: relative;
        image {
          @include WH(710, 250);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: rpx(10);
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
