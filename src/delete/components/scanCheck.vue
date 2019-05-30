<template>
  <div class="scan-check">

  </div>
</template>

<script>

  import {goodQrcode, storeQrcode} from '@/utils/scanQrcode'
  export default {
    props: ['qrcodeUrl'],
    data(){
      return{
      }
    },
    onLoad(options) {
//      this.checkUser()
    },
    methods:{
      checkUser() {
        if (!this.$store.getters.token) {//本地都没有token，直接登录页
          this.wxNavigate.redirectToPage('login', {redirectPage: 'index',qrcodeUrl: encodeURIComponent(this.qrcodeUrl)})
          return
        }
        this.wxRequest.get.call(this, this.wxUrl.checkLogin, {needToken: true}).then(res => {
          this.qrcodeUrlAction(this.qrcodeUrl)
        }, res => {
          this.wxNavigate.redirectToPage('login', {redirectPage: 'index',qrcodeUrl: encodeURIComponent(this.qrcodeUrl)})
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

    },
  }

</script>

<style lang="scss" scoped>

  @import "../../common/scss/base";

</style>
