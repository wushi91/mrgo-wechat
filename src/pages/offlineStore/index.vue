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
          <text class="t2">{{memberInfo.status == 1 ? '尊享会员' : '普通会员'}}</text>
        </div>


        <div class="item">
          <text class="t1">优惠券</text>
          <text class="t2">0张</text>
        </div>
      </div>
    </div>


    <div class="canvas-wrapper" @click="getMemberLoginCode">
      <membercodecheck ref="membercodecheck" :qrCodeContent="qrCodeContent"></membercodecheck>
    </div>


    <div class="wexin-offlinepay-wrapper" @click="openWexinOfflinePay">
      <image src="/static/images/icon-wexin-offlinepay.png"></image>
      <text>微信支付</text>
    </div>


  </div>
</template>

<script>

  /**
   * 关键，扫码开门，扫码添加物品，以及处理传入当前页面的店面id（扫码开门）
   * */

  import {goodQrcode, storeQrcode} from '@/utils/scanQrcode'
  import membercard from '@/templates/memberCard'
  import membercodecheck from '@/components/memberCodeCheck'

  import staticQrcode from '@/utils/staticQrcode'

  export default {
    data() {
      return {
        qrcodeUrl: '',//扫描二维码开门
        storeId: '',
        qrCodeContent: '',//这个是会员码
        qrCodeInterval: null,
        qrCodeEffectTime: 45 * 1000,//45秒刷新
      };
    },

    computed: {
      memberInfo() {
        return this.$store.getters.memberInfo
      }
    },
    components: {
      membercard, membercodecheck
    },
    onLoad(options) {
      if (options && options.data) {
        this.qrcodeUrl = decodeURIComponent(JSON.parse(options.data).qrcodeUrl)
        this.storeId = storeQrcode.storeId(this.qrcodeUrl)
        if (this.storeId) this.openDoor(this.storeId)
      }

    },

    onUnload() {

      if(this.qrCodeInterval){//清除定时器
        clearInterval(this.qrCodeInterval)
      }
      Object.assign(this.$data, this.$options.data())//清楚页面数据
    },

    mounted(){
      setTimeout(()=>{//部分华为手机二维码绘制有问题，这里延时绘制避免
        this.getMemberLoginCode()
      },300)

    },


    methods: {

      openWexinOfflinePay() {
        this.wxRequest.get.call(this, this.wxUrl.getOpenOfflinePayViewParam, {
          needToken: true,
        }).then(res => {
          if (res.data.status === 200) {
            let objArr = {}
            objArr.appId = res.data.content.appId
            objArr.timeStamp = res.data.content.timeStamp
            objArr.nonceStr = res.data.content.nonceStr
            objArr.package = res.data.content.package
            objArr.signType = res.data.content.signType
            objArr.paySign = res.data.content.paySign
            objArr.success = function (res) {
            }
            objArr.fail = function (res) {
              console.log('openOfflinePayView api fali', res)
//              wx.showToast({
//                title: '网络出故障了，请手动打开付款码',
//                icon: 'none'
//              })
            }
            wx.openOfflinePayView(objArr)
          }
        }, res => {
          console.log('internet fail', res)
          wx.showToast({
            title: '网络出故障了，请手动打开付款码',
            icon: 'none'
          })
        })
      },

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
        this.wxAnalytics.scan_open_store(storeId)

        storeQrcode.scanAction.call(this, storeId).then(res => {
          console.log('开门成功')
          wx.showToast({title: "开门成功，欢迎光临", icon: 'none'})
          this.wxUtil.playWelcomeVoice()
        }, res => {
          console.log('开门失败')

          if (res.data.status === 401) {
            this.wxNavigate.waitNavigateToPage('login', '请先登陆', 1000)
          } else if (res.data.status === 400 && res.data.content.statusCode == 400) {
            wx.showModal({
              title: '抱歉',
              content: res.data.content.expectedRecoveryTime ? `${res.data.content.statusMessage} 预计恢复时间：${res.data.content.expectedRecoveryTime}` : res.data.content.statusMessage,
              showCancel: false,
              confirmText: '关闭',
              confirmColor: '#37D0B3',
              success: res => {
                this.wxNavigate.goBack()
              },
            })
          }

        })
      },

      toOrderListPage(tab) {
        this.wxNavigate.navigateToPage('orderList', {tab})
      },

      getMemberLoginCode() {
        let phoneNumber = this.$store.getters.userInfo&&this.$store.getters.userInfo.mobile?this.$store.getters.userInfo.mobile:''
        if(!phoneNumber){
          return
        }
        if(this.qrCodeInterval){
          clearInterval(this.qrCodeInterval)
        }
        this.qrCodeContent = staticQrcode.getEncryptQrcodeString(phoneNumber)//首先先执行一次
        this.qrCodeInterval = setInterval(() => {
          console.log(phoneNumber)
          this.qrCodeContent = staticQrcode.getEncryptQrcodeString(phoneNumber)
        }, this.qrCodeEffectTime);

      },

    }
  }
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
      margin-top: rpx(20);
      margin-bottom: rpx(26);
      /*background-color: white;*/
      /*padding: rpx(20);*/

    }



    .wexin-offlinepay-wrapper {
      @include WH(476, 96);
      display: flex;
      justify-content: center;
      align-items: center;
      border: rpx(2) solid #37D0B3;
      border-radius: 50px;
      background-color: #37D0B3;

      image {
        @include WH(44, 40);
        margin-right: rpx(16);
      }
      text {
        @include FCS(#FFFFFF, 32, 78, 78);
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
