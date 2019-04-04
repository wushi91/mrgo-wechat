<template>
  <div class="offline-store">
    <div class="card-vip">
      <image src="/static/images/bg_vip.png"></image>
      <div class="card-content">
        <text class="t1">MR.GO 智慧便利店</text>
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

    <canvas class="qr-code" canvas-id="myQrcode"></canvas>
    <!--<image  src="/static/images/qr-code.png"></image>-->

    <div class="buy-entry">
      <div class="shopcar-wrapper" @click="toOrderListPage">
        <image src="/static/images/offline-shopcar.png"></image>
      </div>

      <image src="/static/images/offline-saoyisao.png" @click="scanMRGOCode"></image>

    </div>
  </div>
</template>

<script>

  /**
   * 关键，扫码开门，扫码添加物品，以及处理传入当前页面的店面id（扫码开门）
   * */
  import drawQrcode from 'weapp-qrcode'
  import {goodQrcode, storeQrcode} from '@/utils/scanQrcode'

  export default {
    data() {
      return {
        qrcodeUrl: '',
        storeId: ''
      };
    },
    onLoad(options) {

      this.qrCode('myQrcode', 'http://baidu.com', 336, 336)

      if (options && options.data) {
        this.qrcodeUrl = decodeURIComponent(JSON.parse(options.data).qrcodeUrl)
        this.storeId = storeQrcode.storeId(this.qrcodeUrl)
        this.openDoor(this.storeId)
      }

    },
    mounted() {

    },

    methods: {

      qrCode(canvasId, text, width = 1, height = 1) {
        width = this.wxUtil.rpx2px(width);
        height = this.wxUtil.rpx2px(height);
        drawQrcode({
          width: width,
          height: height,
          canvasId: canvasId,
          typeNumber: -1,
          text: text,
          correctLevel: 3,
        })
      },

      scanMRGOCode() {
        this.wxPromise.scanCode({onlyFromCamera: true}).then(res => {
          let qrcodeUrl = res.result
          if (qrcodeUrl.startsWith(storeQrcode.path)) {
            let storeId = storeQrcode.storeId(qrcodeUrl)
            this.openDoor(storeId)
          } else if (qrcodeUrl.startsWith(goodQrcode.path)) {
            let goodId = goodQrcode.goodId(qrcodeUrl)
            this.toOfflineSCarPage(goodId)
          } else {
            wx.showToast({
              title: '没有找到对应的商品',
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
            this.wxNavigate.waitNavigateToPage('login','请先登陆',1000)
          } else {

          }

        })
      },

      toOfflineSCarPage(goodId) {
        this.wxNavigate.navigateToPage('offlineSCar',{goodId})
      },
      toOrderListPage(){
        this.wxNavigate.navigateToPage('orderList')
      }

    }
  };
</script>

<style>
  html, page {
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
    .qr-code {
      margin-top: rpx(10);
      margin-bottom: rpx(85);
      @include WH(336, 336);
    }

    .buy-entry {
      display: flex;

      .shopcar-wrapper {
        position: relative;
        .good-count {
          border-radius: rpx(16);
          background-color: #F96D18;
          @include FCS(#FFFFFF, 26, 34, 34);

          padding: 0 rpx(10);
          position: absolute;
          text-align: center;
          top: rpx(40);
          right: rpx(50);
        }
      }

      image {
        @include WH(195, 195);
      }
      image:nth-child(2) {
        margin-left: rpx(102);
      }
    }

  }
</style>
