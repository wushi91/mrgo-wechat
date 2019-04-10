<template>
  <div class="scan">
    <image class="avater" v-if="userInfo&&userInfo.imageUrl" :src="userInfo.imageUrl"></image>
    <image class="avater" src="/static/images/default-avater.png" v-else></image>
    <text class="nickname">{{userInfo.nickname}}</text>
    <div class="open-door" @click="scanMRGOCode">
      <image src="/static/images/bg-door.png"></image>
    </div>
    <image class="slogan" src="/static/images/slogan.png"></image>


  </div>
</template>

<script>

  /*
  * 点击开门进行扫码，判断扫描的二维码是店面二维码或者商品二维码，则将该路径传到下个页面，由下个页面做业务处理？当前页面做业务处理优化体验，成功后将数据带入下个页面？
  * */

  import {goodQrcode, storeQrcode} from '@/utils/scanQrcode'

  export default {

    props: ['userInfo'],
    data() {
      return {};
    },

    methods: {
      scanMRGOCode() {
        this.wxPromise.scanCode({onlyFromCamera: true}).then(res => {
          let qrcodeUrl = res.result
          this.qrcodeUrlAction(qrcodeUrl)
        })
      },

      qrcodeUrlAction(qrcodeUrl) {
        if (qrcodeUrl.startsWith(storeQrcode.path)) {
          this.wxNavigate.navigateToPage('offlineStore', {qrcodeUrl: encodeURIComponent(qrcodeUrl)})
        } else if (qrcodeUrl.startsWith(goodQrcode.path)) {
          this.wxNavigate.navigateToPage('offlineSCar', {qrcodeUrl: encodeURIComponent(qrcodeUrl)})
        } else {
          wx.showToast({
            title: '没有找到对应的门店或商品',
            icon: 'none'
          })
        }
      }

    }

  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .scan {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avater {
      @include WH(118, 118);
      border-radius: rpx(10);
      margin-top: rpx(60);
    }
    .nickname {
      margin-top: rpx(15);
      @include FCS(#333333, 32, 40, 40);
    }

    .open-door {
      margin-top: rpx(72);
      position: relative;
      image {
        @include WH(386, 386)
      }
      text {
        display: block;
        position: absolute;
        text-align: center;
        width: rpx(444);
        @include FCS(#FFFFFF, 120, 444, 444);
        top: 0;
        left: 0;
      }
    }

    .slogan {
      margin-top: rpx(138);
      @include WH(585, 144);
    }
  }

</style>
