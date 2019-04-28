<template>
  <div class="user-check"></div>
</template>

<script>
  export default {
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
          this.wxNavigate.redirectToPage('login', {redirectPage: 'index'})
          return
        }
        this.wxRequest.get.call(this, this.wxUrl.checkLogin, {needToken: true}).then(res => {
          console.log(res.data.content.member)
          if(res.data.content.member.memberRecord===0){
            this.showNewUserMemberModal()
          }

          this.$store.dispatch('Member', {memberInfo: res.data.content.member})
        }, res => {
          if (res.data.status === 401) {
            this.wxNavigate.redirectToPage('login', {redirectPage: 'index'})
          }
        })
      },

      showNewUserMemberModal(){//新用户免费领取7天会员
//        wx.setStorageSync('showNewUserMemberModal',0)
        let hasShow = wx.getStorageSync('showNewUserMemberModal')
        if(hasShow){//首次弹窗，弹窗之后一次就够了
          return
        }
        wx.showModal({
          title: '',
          content: '领取7天会员体验套餐',
          showCancel:false,
          confirmText:'去领取',
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
