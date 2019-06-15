<template>
  <div class="user-check"></div>
</template>

<script>

  import {goodQrcode, storeQrcode,buyVIPQrcode} from '@/utils/scanQrcode'

  export default {
//    props: [''],
    data() {
      return {
        qrcodeUrl: ""
      }
    },
    onLoad(options) {
      this.qrcodeUrl =''//没有这句代码会有流程的bug，先扫了店面二维码，在扫小程序码，会开门两次
      if (options && options.data && JSON.parse(options.data).qrcodeUrl) {
        this.qrcodeUrl = decodeURIComponent(JSON.parse(options.data).qrcodeUrl)
      } else if (options && options.q) {//微信扫一扫二维码参数是q
        this.qrcodeUrl = decodeURIComponent(options.q)
      }
      this.checkUser()
    },


    methods: {
      checkUser() {
        if (!this.$store.getters.token) {//本地都没有token，直接登录页
          this.wxNavigate.redirectToPage('login', {
            redirectPage: 'index',
            qrcodeUrl: encodeURIComponent(this.qrcodeUrl)
          })
          return
        }
        this.wxRequest.get.call(this, this.wxUrl.checkLogin, {needToken: true}).then(res => {
          console.log('res.data.content.member', res.data.content)
          if (res.data.content.member.memberRecord === 0 && !this.qrcodeUrl) {
            this.showNewUserMemberModal()
          }
          if (this.qrcodeUrl) {
            this.qrcodeUrlAction(this.qrcodeUrl)
          }

          this.$store.dispatch('Member', {memberInfo: res.data.content.member})
        }, res => {
          if (res.data.status === 401) {
            this.wxNavigate.redirectToPage('login', {
              redirectPage: 'index',
              qrcodeUrl: encodeURIComponent(this.qrcodeUrl)
            })
          }
        })
      },


      qrcodeUrlAction(qrcodeUrl) {
        if (qrcodeUrl.startsWith(storeQrcode.path)) {
          this.wxNavigate.navigateToPage('offlineStore', {qrcodeUrl: encodeURIComponent(qrcodeUrl)})
        } else if (qrcodeUrl.startsWith(goodQrcode.path)) {
          this.wxNavigate.navigateToPage('offlineSCar', {qrcodeUrl: encodeURIComponent(qrcodeUrl)})
        } else if (qrcodeUrl.startsWith(buyVIPQrcode.path)){
          this.wxNavigate.navigateToPage('buyVIP',{info:'我很傻'})
        }else {
          wx.showToast({
            title: '没有找到对应的门店或商品',
            icon: 'none'
          })
        }
      },

      freshMemberInfo() {
        this.wxRequest.get.call(this, this.wxUrl.checkLogin, {needToken: true}).then(res => { //更新会员信息
          this.$store.dispatch('Member', {memberInfo: res.data.content.member})
        })
      },

      showNewUserMemberModal() {//新用户免费领取7天会员
        let hasShow = wx.getStorageSync('showNewUserMemberModal')
        if (hasShow) {//首次弹窗，弹窗之后一次就够了
          return
        }
        wx.showModal({
          title: '',
          content: '领取7天会员体验套餐',
          confirmText: '去领取',
          cancelText: '暂不领取',
          showCancel: true,
          confirmColor: '#37D0B3',
          cancelColor: '#777777',
          success: res => {
            if (res.confirm) {
              this.wxNavigate.navigateToPackageAPage('buyVIP', {freeMember: true})
            } else if (res.cancel) {
            }
          },

          complete() {
            wx.setStorageSync('showNewUserMemberModal', 1)
          }
        })
      }
    },


  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";


</style>
