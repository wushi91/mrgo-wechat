<template>
  <div class="offline-store">
    <div class="top-wrapper">
      <div>
        <membercard :cardInfo="memberInfo"></membercard>
      </div>

      <div class="member-info">
        <div class="item">
          <text class="t1">积分</text>
          <text class="t2">{{memberInfo.points}}</text>
        </div>

        <div class="item">
          <text class="t1">会员</text>
          <text class="t2">{{memberInfo.status==1?'尊享会员':'普通会员'}}</text>
        </div>


        <div class="item">
          <text class="t1">优惠券</text>
          <text class="t2">0张</text>
        </div>
      </div>
    </div>


    <div class="canvas-wrapper">
      <membercodecheck ref="membercodecheck" ></membercodecheck>
    </div>


    <div class="buy-entry">
      <div class="shopcar-wrapper" @click="toOrderListPage('tab-can')">
        <image src="/static/images/offline-order.png"></image>
        <text class="tip">可使用订单</text>
      </div>
      <!--@click="scanMRGOCode"-->

      <div class="saoyisao-wrapper" @click="scanMRGOCode">
        <image src="/static/images/offline-saoyisao.png"></image>
        <text class="tip">扫码购</text>
      </div>

    </div>

  </div>
</template>

<script>

  /**
   * 关键，扫码开门，扫码添加物品，以及处理传入当前页面的店面id（扫码开门）
   * */

  import {goodQrcode, storeQrcode} from '@/utils/scanQrcode'
  import membercard from '@/components/memberCard'
  import membercodecheck from '@/components/memberCodeCheck'

  export default {
    data() {
      return {
        qrcodeUrl: '',
        storeId: '',

      };
    },

    computed: {
      memberInfo() {
        return this.$store.getters.memberInfo
      }
    },
    components: {
      membercard,membercodecheck
    },
    onLoad(options) {
      if (options && options.data) {
        this.qrcodeUrl = decodeURIComponent(JSON.parse(options.data).qrcodeUrl)
        this.storeId = storeQrcode.storeId(this.qrcodeUrl)
        if(this.storeId)this.openDoor(this.storeId)
      }

    },

    onUnload() {
      this.$refs.membercodecheck.clearQrCodeTimer()
      Object.assign(this.$data, this.$options.data())//清楚页面数据
    },



    methods: {

      scanMRGOCode() {
        this.wxPromise.scanCode({onlyFromCamera: true}).then(res => {
          let qrcodeUrl = res.result
          if (qrcodeUrl.startsWith(goodQrcode.path)) {
            this.wxNavigate.navigateToPage('offlineSCar', {qrcodeUrl: encodeURIComponent(qrcodeUrl)})
          } else {
            wx.showToast({
              title: '没有查询到商品信息',
              icon: 'none'
            })
          }
        })
      },
      openDoor(storeId) {
        storeQrcode.scanAction.call(this, storeId).then(res => {
          console.log('开门成功')
          wx.showToast({title: "开门成功，欢迎光临", icon: 'none'})
          this.wxUtil.playWelcomeVoice()
        }, res => {
          console.log('开门失败')

          if (res.data.status === 401) {
            this.wxNavigate.waitNavigateToPage('login', '请先登陆', 1000)
          } else {

            wx.showModal({
              title: '抱歉',
              content: res.data.message,
              showCancel:false,
              confirmText:'离开门店',
              confirmColor:'#37D0B3',
              success:res=>{
                if (res.confirm) {
                  this.wxNavigate.goBack()
//                this.wxNavigate.navigateToPackageAPage('buyVIP',{freeMember:true})
                } else if (res.cancel) {
                }
              },

              complete(){
                wx.setStorageSync('showNewUserMemberModal',1)
              }
            })
//            wx.showToast({title: res.data.message, icon: 'none'})
          }

        })
      },

      toOrderListPage(tab) {
        this.wxNavigate.navigateToPage('orderList', {tab})
      },


    }
  };
</script>

<style lang="scss" scoped>

  @import "../../common/scss/base";

  .offline-store {
    display: flex;
    flex-direction: column;
    align-items: center;

    .top-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      width: 100%;
      padding-top: rpx(20);
    }

    .member-info {
      display: flex;
      width: 100%;
      padding: rpx(30) 0;
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

    .canvas-wrapper {
      margin-top: rpx(48);
      margin-bottom: rpx(32);
      background-color: white;
      /*padding: rpx(20);*/
      .qr-code {
        @include WH(356, 356);
      }
    }

    .buy-entry {
      display: flex;

      .shopcar-wrapper, .saoyisao-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        image {
          @include WH(148, 148);
        }
        text {
          @include FCS(#666666, 32, 40, 40);
        }
      }

      .saoyisao-wrapper {
        margin-left: rpx(226);
      }
    }

  }
</style>
