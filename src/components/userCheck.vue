<template>
  <div class="user-check"></div>
</template>

<script>

  import {goodQrcode, storeQrcode} from '@/utils/scanQrcode'
  export default {
    props: ['qrcodeUrl'],
    data() {
      return {
      }
    },
    onLoad(options) {

      this.checkUser()
    },


    methods: {
      checkUser() {
        if (!this.$store.getters.token) {//本地都没有token，直接登录页
          this.wxNavigate.redirectToPage('login', {redirectPage: 'index',qrcodeUrl: encodeURIComponent(this.qrcodeUrl)})
          return
        }
        this.wxRequest.get.call(this, this.wxUrl.checkLogin, {needToken: true}).then(res => {
          console.log('res.data.content.member',res.data.content)
          if(res.data.content.member.memberRecord===0&&!this.qrcodeUrl){
            this.showNewUserMemberModal()
          }
          if(this.qrcodeUrl){
            this.qrcodeUrlAction(this.qrcodeUrl)
          }

          this.$store.dispatch('Member', {memberInfo: res.data.content.member})
        }, res => {
          if (res.data.status === 401) {
            this.wxNavigate.redirectToPage('login', {redirectPage: 'index',qrcodeUrl: encodeURIComponent(this.qrcodeUrl)})
          }
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
      },

      freshMemberInfo(){
        this.wxRequest.get.call(this, this.wxUrl.checkLogin, {needToken: true}).then(res => { //更新会员信息
          this.$store.dispatch('Member', {memberInfo: res.data.content.member})
        })
      },

      showNewUserMemberModal(){//新用户免费领取7天会员
        let hasShow = wx.getStorageSync('showNewUserMemberModal')
        if(hasShow){//首次弹窗，弹窗之后一次就够了
          return
        }
        wx.showModal({
          title: '',
          content: '领取7天会员体验套餐',
          confirmText:'去领取',
          showCancel:false,
          confirmColor:'#37D0B3',
          success:res=>{
            if (res.confirm) {
              this.wxNavigate.navigateToPackageAPage('buyVIP',{freeMember:true})
            } else if (res.cancel) {
            }
          },

          complete(){
            wx.setStorageSync('showNewUserMemberModal',1)
          }
        })
      }
    },


  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";


</style>
