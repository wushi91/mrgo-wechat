<template>
  <div class="member-code-check">
    <text class="update-tip-1">登录会员码</text>
    <canvas class="qr-code" canvas-id="myQrcode" ></canvas>
    <div class="icon-wrapper"><image class="icon-fresh-qrcode" src="/static/images/icon-fresh-qrcode.png"></image><text class="update-tip-2">刷新</text></div>

  </div>
</template>

<script>

  /*
  * 会员二维码
  * 生成规则：根据后台的字符动态生成，每50s刷新一次
  * */

  import drawWeappQrcode from 'weapp-qrcode'



  export default {
    props: {
      qrCodeContent:{
        type: String,
        default: ''
      },
    },
    data() {
      return {
        canvarsId: 'myQrcode',
        qrCodeWidthRPX: 356,
        qrCodeHeightRPX: 356,
        qrCodePaddingRPX: 20,

        qrCodeConfig: {
          width: 0,
          height: 0,
          cWidth: 0,
          cHeight: 0,
          padding: 0,
        }
      }
    },

    onLoad(options) {
      this.qrCodeConfig = this.initQrCodeConfig(this.qrCodeWidthRPX, this.qrCodeHeightRPX, this.qrCodePaddingRPX)
      this.drawQrcodeInvalid(this.canvarsId, this.qrCodeConfig)
    },

    watch: {
      qrCodeContent(newValue, oldValue) {
        if(newValue){//绘制新的二维码
          console.log('绘制新的二维码')
          this.drawQrcode(this.canvarsId, newValue, this.qrCodeConfig)
        }else if(oldValue){//如果旧的二维码是有效的，新的二维码是无效的，就绘制无效图层
          console.log('绘制无效图层')
          this.drawQrcodeInvalid(this.canvarsId, this.qrCodeConfig)
        }
      }
    },
    methods: {

      initQrCodeConfig(width, height, padding) {
        let cWidth = width - 2 * padding
        let cHeight = height - 2 * padding
        width = this.wxUtil.rpx2px(width);
        height = this.wxUtil.rpx2px(height);
        cWidth = this.wxUtil.rpx2px(cWidth);
        cHeight = this.wxUtil.rpx2px(cHeight);
        padding = this.wxUtil.rpx2px(padding)
        return {width, height, cWidth, cHeight, padding}
      },

      drawQrcode(canvasId, text, qrCodeConfig) {//第三方的绘画二维码工具
        drawWeappQrcode({
          width: qrCodeConfig.cWidth,
          height: qrCodeConfig.cHeight,
          canvasId: canvasId,
          typeNumber: -1,
          text: text,
          correctLevel: 1,//二维码纠错级别，默认值为高级，取值：{ L: 1, M: 0, Q: 3, H: 2 }
          x: qrCodeConfig.padding,
          y: qrCodeConfig.padding,
        })
      },

      drawQrcodeInvalid(canvasId, qrCodeConfig) {//一定时间后，二维码会失效，绘制图层，提示用户点击手动刷新
        let ctx = wx.createCanvasContext(canvasId)
        ctx.font = '16px sans-serif'
        ctx.fillStyle='rgba(255, 255, 255, 0.9)'
        ctx.fillRect(0, 0, qrCodeConfig.width, qrCodeConfig.height)
        ctx.fillStyle='#333333'
        ctx.setTextAlign('center')
        ctx.fillText('点击刷新二维码', qrCodeConfig.width / 2, qrCodeConfig.height / 2)
        ctx.draw(true)
      },

    },

  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";

  .member-code-check {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: rpx(20);
    padding:rpx(20) rpx(60);
    .qr-code {
      @include WH(356, 356);
    }
    .update-tip-1{
      @include FCS(#999999, 28, 40, 40);
    }
    .update-tip-2{
      @include FCS(#999999, 24, 40, 40);

    }

    .icon-wrapper{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .icon-fresh-qrcode{
      @include WH(24,24);
      margin-right: rpx(13);
    }
  }


</style>
