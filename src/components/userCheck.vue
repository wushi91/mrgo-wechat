<template>
  <div class="user-check"></div>
</template>

<script>


  /*
  * 超过6天，会刷新token。除非人为改动数据，基本能保证token一直有效。对老版本的用户，token有效期都是超过6天（TokenExpires=0），对新版本超过6天未登录的，都是使用code获取token，对用户来说没有感知。
  * */
  import {goodQrcode, storeQrcode, buyVIPQrcode, offlineStoreQrcode} from '@/utils/scanQrcode'

  export default {
//    props: [''],
    data() {
      return {
        qrcodeUrl: ""
      }
    },
    onLoad(options) {
      this.qrcodeUrl = ''//没有这句代码会有流程的bug，先扫了店面二维码，在扫小程序码，会开门两次
      if (options && options.data && JSON.parse(options.data).qrcodeUrl) {
        this.qrcodeUrl = decodeURIComponent(JSON.parse(options.data).qrcodeUrl)
      } else if (options && options.q) {//微信扫一扫二维码参数是q
        this.qrcodeUrl = decodeURIComponent(options.q)
      }
      this.checkUserAsync()
    },


    methods: {

      async freshTokenAsync(){//本地没有token，或者token有效期小于1天，就刷新token，如果刷新失败，再去登录页面
        let loginCode = await this.wxPromise.login().then(res => {
          this.loginCode = res.code
          return res.code
        }, res => {
          return null
        })

        if(!loginCode){
          return ''
        }

        let {token, userInfo} = await this.wxRequest.get.call(this, this.wxUrl.wechatLoginByCode,{code:loginCode}).then(res => {
          this.$store.dispatch('Login', {token: res.data.content.token, userInfo: res.data.content.userInfo})//保存token，并同步到其他组件（store）
          return {token: res.data.content.token, userInfo: res.data.content.userInfo}
        }, res => {
          return {token: null, userInfo: null}
        })

        if(!token){//获取token失败，账户未注册，去登陆页面
          console.log('你还没有注册！！')
          return ''
        }

        console.log('更新token成功')
        return 'success'
      },
      async checkTokenAsync(){//根据已有的token，经过网络请求判断是否有效
        await this.wxRequest.get.call(this, this.wxUrl.checkLogin, {needToken: true}).then(res => {
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

      async checkUserAsync() {//每次进入首页会加载这个方法

        if (!this.$store.getters.token) {//本地都没有token，刷新token
          console.log('token不存在')
          let isFreshSuccess = await this.freshTokenAsync()
          if(isFreshSuccess!=='success'){//刷新token失败，去登陆页面
            this.wxNavigate.redirectToPage('login', {
              redirectPage: 'index',
              qrcodeUrl: encodeURIComponent(this.qrcodeUrl)
            })
            return
          }//
        }else if(new Date().getTime() - this.$store.getters.tokenExpires>6*24*60*60*1000){//token已经超过6天，刷新token
          console.log('token存在，但时长大于6天')
          let isFreshSuccess = await this.freshTokenAsync()
          if(isFreshSuccess!=='success'){//刷新token失败，去登陆页面
            this.wxNavigate.redirectToPage('login', {
              redirectPage: 'index',
              qrcodeUrl: encodeURIComponent(this.qrcodeUrl)
            })
            return
          }
        }else{
          console.log('token存在，且时长小于6天')
        }


        this.wxRequest.get.call(this, this.wxUrl.checkLogin, {needToken: true}).then(res => {//这里主要是刷新会员信息以及对跳转逻辑的处理，检测token的意义不大
          console.log('res.data.content.member', res.data.content)
          if (res.data.content.member.memberRecord === 0 && !this.qrcodeUrl) {
            this.showNewUserMemberModal()
          }
          if (this.qrcodeUrl) {
            this.qrcodeUrlAction(this.qrcodeUrl)
          }

          this.$store.dispatch('Member', {memberInfo: res.data.content.member})
        }, res => {
          //这里本来要做一层刷新的，但是基本上走不到这一步，除非人为改动了token，或者后台的token机制出问题了。所以就不刷新了。
          if (res.data.status === 401) {
            console.log('token存在，但是token已经失效')
            this.wxNavigate.redirectToPage('login', {
              redirectPage: 'index',
              qrcodeUrl: encodeURIComponent(this.qrcodeUrl)
            })
          }
        })
      },
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
        qrcodeUrl = qrcodeUrl.trim()//
        if (qrcodeUrl.startsWith(storeQrcode.path)) {
          this.wxNavigate.navigateToPage('offlineStore', {qrcodeUrl: encodeURIComponent(qrcodeUrl)})
        } else if (qrcodeUrl.startsWith(goodQrcode.path)) {
          this.wxNavigate.navigateToPage('offlineSCar', {qrcodeUrl: encodeURIComponent(qrcodeUrl)})
        } else if (qrcodeUrl.startsWith(buyVIPQrcode.path)) {
          this.wxNavigate.navigateToPage('buyVIP', {info: '我很傻'})
        } else if (qrcodeUrl.startsWith(offlineStoreQrcode.path)) {
          this.wxNavigate.navigateToPage('offlineStore')
        } else {
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
