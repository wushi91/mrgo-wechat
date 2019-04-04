<template>
  <div class="my">
    <div class="header-wrapper">
      <div class="avater-wrapper">
        <image class="avater" v-if="userInfo&&userInfo.imageUrl" :src="userInfo.imageUrl" ></image>
        <image class="avater" src="/static/images/default-avater.png" v-else></image>
        <div class="username-wrapper">
          <text class="name" v-if="userInfo&&userInfo.nickname">{{userInfo.nickname}}</text>
          <text class="phone">{{userInfo.mobile}}</text>
        </div>

        <button v-if="!(userInfo&&userInfo.nickname)" class="btn-userinfo open-type-button" lang='zh_CN' open-type='getUserInfo' @getuserinfo='getuserinfo'>
          获取头像昵称
        </button>

        <image class="arrow" src="/static/images/me-arrow.png"></image>
      </div>
      <div class="card-wrapper">
        <div class="w1">
          <text class="range">金卡会员</text>
          <span class="score"><text class="s1">325</text><text class="s2">积分</text></span>
          <div class="center">会员中心
            <image class="member-arrow" src="/static/images/member-arrow.png"></image>
          </div>
        </div>

        <text class="vip">VIP</text>

      </div>
    </div>


    <div class="order-wrapper">
      <text class="title">我的订单</text>
      <div class="item-wrapper">
        <div class="item" @click="toOrderListPage('tab-wait')">
          <image src="/static/images/order-wait.png"></image>
          <text>待付款</text>
        </div>
        <div class="item" @click="toOrderListPage('tab-can')">
          <image src="/static/images/order-can.png"></image>
          <text>可使用</text>
        </div>

        <div class="item" @click="toOrderListPage('tab-back')">
          <image src="/static/images/order-back.png"></image>
          <text>退款/售后</text>
        </div>

        <div class="item" @click="toOrderListPage('tab-all')">
          <image src="/static/images/order-all.png"></image>
          <text>全部订单</text>
        </div>
      </div>
    </div>

    <div class="menu-wrapper">
      <div class="menu">
        <image class="icon" src="/static/images/menu-wdpt.png"></image>
        <text>我的拼团</text>
        <image class="arrow" src="/static/images/menu-arrow.png"></image>
      </div>
      <div class="line-1-px"></div>
      <div class="menu">
        <image class="icon" src="/static/images/menu-wdyhq.png"></image>
        <text>我的优惠卷</text>
        <image class="arrow" src="/static/images/menu-arrow.png"></image>
      </div>
      <div class="line-1-px"></div>
      <div class="menu">
        <image class="icon" src="/static/images/menu-wdkp.png"></image>
        <text>我的开票</text>
        <image class="arrow" src="/static/images/menu-arrow.png"></image>
      </div>
      <div class="line-1-px"></div>
      <div class="menu">
        <image class="icon" src="/static/images/menu-lxkf.png"></image>
        <text>联系客服</text>
        <image class="arrow" src="/static/images/menu-arrow.png"></image>
      </div>
      <div class="line-1-px"></div>
      <div class="menu">
        <image class="icon" src="/static/images/menu-gy.png"></image>
        <text>关于</text>
        <image class="arrow" src="/static/images/menu-arrow.png"></image>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {};
    },
    computed: {

      token() {
        return this.$store.getters.token
      },
      userInfo() {
        console.log('computed userInfo')
        return this.$store.getters.userInfo
      }
    },
    methods: {
      toOrderListPage(tab) {
        wx.navigateTo({url: '/pages/orderList/index' + "?data=" + JSON.stringify({tab})})
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
            }, res => {
              if (res.data.status === 401) {
                this.wxNavigate.waitNavigateToPage('login','请先登陆',1000)
              } else {

              }
//              console.log('err',res)
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
        }
        .arrow {
          @include WH(16, 27);
          flex-shrink: 0;
        }
      }

      .card-wrapper {
        position: relative;
        box-sizing: border-box;
        display: flex;
        margin: 0 rpx(30);
        height: rpx(130);
        padding: rpx(25) rpx(30) 0 rpx(30);
        background: linear-gradient(66deg, rgba(255, 231, 176, 1), rgba(236, 210, 138, 1));
        box-shadow: 0 0 rpx(9) 0 rgba(12, 78, 66, 0.28);
        border-radius: rpx(10) rpx(10) 0 0;
        .w1 {
          display: flex;
          align-items: center;
          height: rpx(58);
          .range {
            @include FCS(#876732, 32, 40, 40);
          }
          .score {
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
            margin-left: rpx(120);
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
          top: rpx(75);
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
          image {
            @include WH(36, 36);
          }
          text {
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
