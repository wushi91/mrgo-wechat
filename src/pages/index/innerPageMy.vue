<template>
  <div class="my">
    <div class="header-wrapper">
      <div class="avater-wrapper" @click="toPersonInfoPage">
        <image class="avater" v-if="userInfo&&userInfo.imageUrl" :src="userInfo.imageUrl" ></image>
        <image class="avater" src="/static/images/default-avater.png" v-else></image>
        <div class="username-wrapper">
          <text class="name" v-if="userInfo&&userInfo.nickname">{{userInfo.nickname}}</text>
          <text class="phone">{{formatPhone}}</text>
        </div>

        <button v-if="!(userInfo&&userInfo.nickname)" class="btn-userinfo open-type-button" lang='zh_CN' open-type='getUserInfo' @getuserinfo='getuserinfo' @click.stop>
          获取头像昵称
        </button>
        <image v-if="userInfo&&userInfo.nickname"  @click.stop="toOfflineStorePage" class="index-white-vip-code" src="/static/images/index-white-vip-code.png"></image>
      </div>
      <div class="card-wrapper">
        <div class="card" @click.stop="toBuyVIPPage">
          <div class="w1">
            <text class="range">{{memberInfo.status==1?'尊享会员':'普通会员'}}</text>
            <span class="score"><text class="s1">{{memberInfo.points}}</text><text class="s2">积分</text></span>
            <div class="center" >会员中心
              <!--<image class="member-arrow" src="/static/images/member-arrow.png"></image>-->
            </div>
          </div>

          <text class="vip" v-if="memberInfo.status">VIP</text>
        </div>

        <image class="index-hudu" src="/static/images/index-hudu.png"></image>
      </div>


    </div>



    <div class="order-wrapper">
      <text class="title">我的订单</text>
      <div class="item-wrapper">
        <div class="item" @click="toOrderListPage('tab-wait')">
          <div class="icon-order-wrapper">
            <image src="/static/images/order-wait.png"></image>
            <text v-if="orderStatus.tabWait">{{orderStatus.tabWait<100?orderStatus.tabWait:'···'}}</text>
          </div>
          <text class="order-text">待付款</text>
        </div>
        <div class="item" @click="toOrderListPage('tab-can')">
          <div class="icon-order-wrapper">
            <image src="/static/images/order-can.png"></image>
            <text v-if="orderStatus.tabCan">{{orderStatus.tabCan<100?orderStatus.tabCan:'···'}}</text>
          </div>
          <text class="order-text">可使用</text>
        </div>

        <div class="item" @click="toOrderListPage('tab-back')">
          <div class="icon-order-wrapper">
            <image src="/static/images/order-back.png"></image>
            <text v-if="orderStatus.tabBack">{{orderStatus.tabBack<100?orderStatus.tabBack:'···'}}</text>
          </div>
          <text class="order-text">退款/售后</text>
        </div>

        <div class="item" @click="toOrderListPage('tab-all')">
          <div class="icon-order-wrapper">
            <image src="/static/images/order-all.png"></image>

          </div>
          <text class="order-text">全部订单</text>
        </div>
      </div>
    </div>

    <div class="menu-wrapper" @click="onWork">
      <div class="menu set-all-gray">
        <image class="icon" src="/static/images/menu-wdpt.png"></image>
        <text>我的拼团</text>
        <image class="arrow" src="/static/images/menu-arrow.png"></image>
      </div>
      <div class="line-1-px"></div>
      <div class="menu set-all-gray">
        <image class="icon" src="/static/images/menu-wdyhq.png"></image>
        <text>我的优惠券</text>
        <image class="arrow" src="/static/images/menu-arrow.png"></image>
      </div>
      <div class="line-1-px"></div>
      <div class="menu set-all-gray">
        <image class="icon" src="/static/images/menu-wdkp.png"></image>
        <text>我的开票</text>
        <image class="arrow" src="/static/images/menu-arrow.png"></image>
      </div>
      <div class="line-1-px"></div>
      <div class="menu set-all-gray">
        <image class="icon" src="/static/images/menu-lxkf.png"></image>
        <text>联系客服</text>
        <image class="arrow" src="/static/images/menu-arrow.png"></image>
      </div>
      <div class="line-1-px"></div>
      <div class="menu" @click.stop="toAboutUsPage">
        <image class="icon" src="/static/images/menu-gy.png"></image>
        <text>关于</text>
        <image class="arrow" src="/static/images/menu-arrow.png"></image>
      </div>
    </div>
  </div>
</template>

<script>

  export default {

    props: ['userInfo','orderStatus','memberInfo'],
    data() {
      return {};
    },

    computed:{
      formatPhone() {
        if(this.userInfo.mobile&&this.userInfo.mobile.length>=11){
          return this.userInfo.mobile.substr(0, 3) + '****' + this.userInfo.mobile.substr(7, 11);
        }
        return ''

      }
    },



    methods: {

      onWork(){
        wx.showToast({
          title: '该功能暂未开放',
          icon: 'none'
        })
      },
      toPage(pageUrl){
        this.wxNavigate.navigateToPage(pageUrl)
      },
      toAboutUsPage(){
        this.wxNavigate.navigateToPackageAPage('aboutUs')
      },
      toOrderListPage(tab) {
        this.wxNavigate.navigateToPage('orderList',{tab})
      },
      toOfflineStorePage(){
        this.wxNavigate.navigateToPage('offlineStore')
      },
      toPersonInfoPage(){
        if(this.userInfo&&this.userInfo.nickname){
          this.wxNavigate.navigateToPackageAPage('personInfo')
        }
      },
      toBuyVIPPage(){
        this.wxNavigate.navigateToPackageAPage('buyVIP')
      },
      getuserinfo(e) {
        if (e.mp.detail.errMsg === 'getUserInfo:ok') {
          try {
            let userInfo = e.mp.detail.userInfo

            this.wxRequest.post.call(this, this.wxUrl.editUser, {needToken: true,contentType:'application/json', cities: userInfo.city,
              imageUrl: userInfo.avatarUrl,
              nationality: userInfo.country,
              nickname: userInfo.nickName,
              province: userInfo.province,
              sex: userInfo.gender,
            }).then(res => {
              console.log('res.data.content',res.data.content)
              this.$store.dispatch('Login', {userInfo:res.data.content})
            })

          } catch (err) {
            wx.showToast({
              title: err.message,
              icon: 'none'
            })
          }
        }
      },
    }

  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .my {
    .header-wrapper {
      background-color: #37D0B3;
      padding-top: rpx(10);
      display: flex;
      flex-direction: column;
      .avater-wrapper {
        display: flex;
        padding: 0 rpx(30) rpx(14) rpx(30);
        align-items: center;
        .avater {
          @include WH(120, 120);
          border-radius: 50%;
          background-color: #e6e6ea;
          flex-shrink: 0;
        }
        .username-wrapper {
          display: flex;
          flex-direction: column;
          margin-left: rpx(28);
          justify-content: center;
          flex: 1;
          .name {
            @include FCS(white, 32, 40, 40);
          }
          .phone {
            margin-top: rpx(12);
            @include FCS(white, 26, 34, 34);
          }

        }

        .btn-userinfo {
          @include WH(240, 78);
          border: rpx(2) solid #FFFFFF;
          border-radius: rpx(40);
          font-size: rpx(32);
          color: #FFFFFF;
          line-height: rpx(78);
          margin-right: rpx(12);
        }

        .index-white-vip-code{
          @include WH(80, 80);
          flex-shrink: 0;
          margin-right: rpx(30);
        }
        .arrow {
          @include WH(16, 27);
          flex-shrink: 0;
        }
      }

      .card-wrapper {
        position: relative;
        .card{
          position: relative;
          box-sizing: border-box;
          display: flex;
          margin: 0 rpx(30);
          height: rpx(130);
          padding: rpx(25) rpx(30) 0 rpx(30);
          background: linear-gradient(66deg, rgba(255, 231, 176, 1), rgba(236, 210, 138, 1));
          box-shadow: 0 0 rpx(9) 0 rgba(12, 78, 66, 0.28);
          border-radius: rpx(10) rpx(10) 0 0;
        }

        .w1 {
          display: flex;
          flex:1;
          align-items: center;
          height: rpx(50);
          .range {
            flex-shrink: 0;
            @include FCS(#876732, 32, 40, 40);
          }
          .score {

            flex:1;
            display: flex;
            align-items: flex-end;
            margin-left: rpx(80);
            .s1 {
              @include FCS(#876732, 32, 40, 40);
            }
            .s2 {
              margin-left: rpx(5);
              @include FCS(#876732, 26, 34, 34);
            }

          }
          .center {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: rpx(20);
            @include FCS(#FFFFFF, 24, 50, 50);
            @include WH(156, 50);
            background-color: #37D0B3;
            opacity: 0.78;
            border-radius: rpx(25);
            text-align: center;
            .member-arrow {
              margin-left: rpx(8);
              @include WH(11, 13);
            }
          }
        }

        .vip {
          position: absolute;
          @include FCS(#FFF7DD, 60, 68, 68);
          opacity: 0.28;
          top: rpx(68);
        }

        .index-hudu{
          position: absolute;
          bottom:rpx(-15);
          @include WH(750,50)
        }
      }




    }


    .order-wrapper {
      margin: rpx(20) rpx(30);
      background-color: white;
      padding: rpx(20) rpx(30) rpx(24) rpx(30);
      border-radius: rpx(10);
      .title {
        @include FCS(#999999, 32, 40, 40);
      }

      .item-wrapper {
        display: flex;
        margin-top: rpx(28);
        .item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;

          .icon-order-wrapper{
            position: relative;
            @include WH(42, 42);
            image {
              @include WH(42, 42);
            }
            text{
              background-color: white;
              position: absolute;
              @include WH(26,26);
              text-align: center;
              @include FCS(#FF766F,18,26,26);
              border: rpx(2) solid #FF766F;
              border-radius: 50%;
              transform: translate(-50%, -50%);
            }
          }

          .order-text {
            margin-top: rpx(12);
            @include FCS(#393939, 26, 34, 34);
          }
        }
      }
    }

    .menu-wrapper {
      display: flex;
      flex-direction: column;
      padding: rpx(10) rpx(32);
      border-radius: rpx(10);
      background-color: white;
      margin: rpx(20) rpx(30);

      .menu {
        display: flex;
        align-items: center;
        height: rpx(72);

        .icon {
          @include WH(36, 36);
          margin-right: rpx(27);
        }
        text {
          @include FCS(#393939, 32, 40, 40);
          flex: 1;
        }
        .arrow {
          @include WH(16, 27);
        }
      }

      .line-1-px {
        margin: rpx(15) 0;
      }
    }
  }

</style>
