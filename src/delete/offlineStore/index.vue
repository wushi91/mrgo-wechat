<template>
  <div class="offline-store">
    <div class="top-wrapper">
      <div>
        <membercard :cardInfo="cardInfo"></membercard>
      </div>

      <div class="member-info">
        <div class="item">
          <text class="t1">积分</text>
          <text class="t2">0</text>
        </div>

        <div class="item">
          <text class="t1">会员</text>
          <text class="t2">尊享会员</text>
        </div>


        <div class="item">
          <text class="t1">优惠券</text>
          <text class="t2">0张</text>
        </div>
      </div>
    </div>


    <div class="canvas-wrapper">
      <canvas class="qr-code" canvas-id="myQrcode" @click="getMemberLoginCode()"></canvas>
    </div>

    <!--<image  src="/static/images/qr-code.png"></image>-->

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
  import drawQrcode from 'weapp-qrcode'
  import {goodQrcode, storeQrcode} from '@/utils/scanQrcode'
  import membercard from '@/components/memberCard'


  export default {
    data() {
      return {
        qrcodeUrl: '',
        storeId: '',
        cardInfo: {},
        loginCode: '',

        timeFresh: null
      };
    },
    components: {
      membercard
    },
    onLoad(options) {
      this.qrCode('myQrcode', this.loginCode, 316, 316)
      if (options && options.data) {
        this.qrcodeUrl = decodeURIComponent(JSON.parse(options.data).qrcodeUrl)
        this.storeId = storeQrcode.storeId(this.qrcodeUrl)
        console.log('this.storeId', this.storeId)
        this.openDoor(this.storeId)
      }

    },

    onShow() {
      console.log('on show')
//      this.getMemberLoginCode()
    },

    mounted() {

    },

    methods: {

      getMemberLoginCode() {

//        this.qrCode('myQrcode', this.loginCode, 316, 316)
        this.wxRequest.get.call(this, this.wxUrl.getGenerateLoginCode, {needToken: true}).then(res => {
          this.loginCode = res.data.content
          this.qrCode('myQrcode', this.loginCode, 316, 316)
          console.log('getGenerateLoginCode success', res.data.content)
        }, res => {
          console.log('getMemberTypeList fail', res)
          wx.showToast({
            title: '获取二维码失败',
            icon: 'none'
          })
        })
      },

      qrCode(canvasId, text, width = 1, height = 1) {
        width = this.wxUtil.rpx2px(width);
        height = this.wxUtil.rpx2px(height);

        if (this.timeFresh) {
          clearTimeout(this.timeFresh)
        }


        if (text) {
          drawQrcode({
            width: width,
            height: height,
            canvasId: canvasId,
            typeNumber: -1,
            text: text,
            correctLevel: 3,
          })
        }

        this.timeFresh = setTimeout(() => {
          const ctx = wx.createCanvasContext(canvasId)
          ctx.setFillStyle('rgba(255, 255, 255, 0.9)')
          ctx.fillRect(0, 0, width, height)
          ctx.setFillStyle('#333333')
          ctx.setFontSize(16)
          ctx.setTextAlign('center')
          ctx.fillText('点击刷新二维码', width / 2, height / 2)
          ctx.draw(true)
        }, 3*60*1000)
//
      },

      scanMRGOCode() {
        this.wxPromise.scanCode({onlyFromCamera: true}).then(res => {
          let qrcodeUrl = res.result
//          if (qrcodeUrl.startsWith(storeQrcode.path)) {
//            let storeId = storeQrcode.storeId(qrcodeUrl)
//            this.wxNavigate.navigateToPage('offlineStore', {qrcodeUrl: encodeURIComponent(qrcodeUrl)})
//            this.wxNavigate.redirectToPage('offlineStore', {qrcodeUrl: encodeURIComponent(qrcodeUrl)})
//            this.openDoor(storeId)
//          } else
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
      padding: rpx(20);
      .qr-code {
        @include WH(316, 316);
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
