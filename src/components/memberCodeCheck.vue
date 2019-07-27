<template>
  <div class="member-code-check" @click="getMemberLoginCode()">
    <text class="update-tip-1">会员识别码用于登陆结算台</text>
    <canvas class="qr-code" canvas-id="myQrcode" ></canvas>
    <text class="update-tip-2">每30秒自动更新</text>
  </div>
</template>

<script>

  /*
  * 会员二维码
  * 生成规则：根据后台的字符动态生成，每50s刷新一次
  * */

  import drawWeappQrcode from 'weapp-qrcode'

  export default {
    data() {
      return {
        canvarsId: 'myQrcode',
        qrCodeWidthRPX: 356,
        qrCodeHeightRPX: 356,
        qrCodePaddingRPX: 20,
        qrCodeContent: '',
        qrCodeTimer: null,
        qrCodeEffectTime: 40 * 1000,
//        qrCodeEffectTime: 60*1000,
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
//      console.log('created - 会员码')
//      this.drawQrcode(this.canvarsId, this.qrCodeContent, this.qrCodeConfig)
      this.qrCodeConfig = this.initQrCodeConfig(this.qrCodeWidthRPX, this.qrCodeHeightRPX, this.qrCodePaddingRPX)
      this.drawQrcodeInvalid(this.canvarsId, this.qrCodeConfig)
      setTimeout( ()=>{
        this.getMemberLoginCode()
      },500)
    },

    watch: {
      qrCodeContent(newValue, oldValue) {
        if(newValue){//绘制新的二维码
//          console.log('绘制新的二维码')
          this.drawQrcode(this.canvarsId, newValue, this.qrCodeConfig)
        }else if(oldValue){//如果旧的二维码是有效的，新的二维码是无效的，就绘制无效图层
          console.log('绘制无效图层')
          this.drawQrcodeInvalid(this.canvarsId, this.qrCodeConfig)
        }
      }
    },
    methods: {

      getMemberLoginCode() {
        this.wxRequest.get.call(this, this.wxUrl.getGenerateLoginCode, {needToken: true}).then(res => {
          this.qrCodeContent = res.data.content
          this.creatQrCodeTimer()
        }, res => {
          wx.showToast({
            title: '获取二维码失败',
            icon: 'none'
          })
          this.creatQrCodeTimer()
        })
      },

      clearQrCodeTimer() {
        if (this.qrCodeTimer) {
          clearTimeout(this.qrCodeTimer)
        }
      },

      creatQrCodeTimer() {
        this.clearQrCodeTimer()
        this.qrCodeTimer = setTimeout(() => {
          this.getMemberLoginCode()
        }, this.qrCodeEffectTime)
      },

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
          correctLevel: 3,
          x: qrCodeConfig.padding,
          y: qrCodeConfig.padding,
        })
      },


      drawQrcodeInvalid(canvasId, qrCodeConfig) {//一定时间后，二维码会失效，绘制图层，提示用户点击手动刷新
        let ctx = wx.createCanvasContext(canvasId)
        ctx.font = '16px sans-serif'
        ctx.fillStyle='rgba(255, 255, 255, 0.9)'
        ctx.fillRect(0, 0, qrCodeConfig.width, qrCodeConfig.height)
//        ctx.fillStyle('#003333')
        ctx.fillStyle='#333333'
//        ctx.setFontSize(16)
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
    padding:rpx(40) rpx(60);
    .qr-code {
      @include WH(356, 356);
    }
    .update-tip-1{
      @include FCS(#646464, 28, 40, 40);
      margin-bottom: rpx(10);
    }
    .update-tip-2{
      @include FCS(#989898, 24, 40, 40);
      margin: rpx(10) 0 rpx(10) 0;
    }
  }


</style>
