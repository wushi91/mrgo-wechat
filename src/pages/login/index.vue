<template>

  <div class="login">
    <!--v-if="!showWechatUser"-->
    <div class="login-wrapper phone-login-wrapper"  >

      <image class="slogan-1" src="/static/images/login-slogan-1.png"></image>
      <text class="name">MR.GO智慧便利店</text>
      <button class="login_btn_t open-type-button" :open-type="[agreeProto?'getPhoneNumber':'']"
              @getphonenumber='getphonenumber' @click="clickLoginBtn">
        <image class="wechat-icon" src="/static/images/login-wechat.png"></image>
        使用微信登录
      </button>


      <div class="proto-wrapper" >
        <div class="agree-wrapper">
          <image class="check" src="/static/images/read_done.png" v-if="agreeProto"
                 @click="agreeProto=!agreeProto"></image>
          <image class="check" src="/static/images/read_un.png" v-else @click="agreeProto=!agreeProto"></image>
        </div>
        <text class="t1" @click="agreeProto=!agreeProto">已阅读并同意</text>
        <!--<text class="t2" @click="toUserProtocolPage">《MGRO用户协议》</text>-->
        <text class="t2">《MGRO用户协议》</text>
      </div>

      <div class="slogan-2-wrapper">
        <image class="slogan-2" src="/static/images/login-slogan-2.png"></image>
      </div>
    </div>

    <!--用户信息-->
    <div class="login-wrapper userinfo-login-wrapper" :class="[showWechatUser?'show-on':'']" >

      <image class="slogan-1" src="/static/images/login-slogan-1.png"></image>
      <text class="name">MR.GO智慧便利店</text>



      <button class="login_btn_t open-type-button" lang='zh_CN' open-type="getUserInfo"
              @getuserinfo='getuserinfo'>
        <image class="wechat-icon" src="/static/images/login-wechat.png"></image>
        获取微信用户信息
      </button>


      <div class="slogan-2-wrapper">
        <image class="slogan-2" src="/static/images/login-slogan-2.png"></image>
      </div>
    </div>
  </div>

</template>

<script>

  /**
   * 登陆成功后的跳转主要考虑二维码扫描进来的页面
   * **/

  export default {
    config: {
      "disableScroll": true,
    },
    data() {
      return {
        agreeProto: true,
        qrcodeUrl: '',
        redirectPage: '',//已有流程无法区分，一开始进入登录页还是之后跳转的进入登录页
        showWechatUser: false,
        loginCode :null
      };
    },

    onLoad(options) {
      if (options && options.data) {
        let parseData = JSON.parse(options.data)
        if (parseData.qrcodeUrl) {
          this.qrcodeUrl = parseData.qrcodeUrl
        }
        if (parseData.redirectPage) {
          this.redirectPage = parseData.redirectPage
        }
      }

      this.$store.dispatch('ClearLogin')

      this.wxPromise.login().then(res => {
        this.loginCode = res.code
        return res.code
      }, res => null)

    },

    onUnload() {
      Object.assign(this.$data, this.$options.data())//清楚页面数据
    },

    mounted() {

    },


    methods: {

      ttt(){
        this.showWechatUser = true
      },
      clickLoginBtn() {
        if (this.agreeProto === false) {
          wx.showToast({
            title: '请阅读并同意《MR.GO用户协议》',
            icon: 'none',
          })
        }
      },

//      async getuserinfo(e) {
//        if (e.mp.detail.errMsg === 'getUserInfo:ok') {
//          try {
//            console.log(e.mp.detail)
//            await this.userinfoLogin(e.mp.detail)
//          } catch (err) {
//            wx.showToast({
//              title: err.message,
//              icon: 'none'
//            })
//          }
//        }
//      },

      async getphonenumber(e) {
        if (e.mp.detail.errMsg === 'getPhoneNumber:ok') {
          try {
            await this.phoneLogin(this.loginCode,e.mp.detail)
          } catch (err) {
            wx.showToast({
              title: err.message,
              icon: 'none'
            })
          }

        }
      },

      toUserProtocolPage() {
        this.wxNavigate.navigateToPage('userProtocol')
      },

      loginBack() {
        this.wxNavigate.goBack(1500)
      },


      async phoneLogin(code,{encryptedData, iv}) {
//        let code = await this.wxPromise.login().then(res => {
//          return res.code
//        }, res => null)

        console.log('测试login code',code)
        if (!code) throw new Error("登录失败")
        let {token, userInfo} = await this.wxRequest.get.call(this, this.wxUrl.login, {
          code,
          encryptedData,
          iv
        }).then(res => {
          console.log('登录成功',res.data.content)
          this.$store.dispatch('Login', {token: res.data.content.token, userInfo: res.data.content.userInfo})//保存token，并同步到其他组件（store），提示登陆成功，返回原来的页面
          return {token: res.data.content.token, userInfo: res.data.content.userInfo}
        }, res => {
          console.log('登录失败',res)
          return {token: null, userInfo: null}
        })

        console.log('测试 token',token)
        if (!token) throw new Error("登录失败")

//        console.log('----')

//        userInfo.imageUrl = ''//测试用 必须注释的


        if (!(userInfo&&userInfo.imageUrl && userInfo.nickname)) {//如果头像或者nickname为空，显示获取头像的按钮
          this.showWechatUser = true
          throw new Error("请先获取微信用户信息")
        }


        if (this.qrcodeUrl) {
          this.wxNavigate.redirectToPage('index', {qrcodeUrl: this.qrcodeUrl})
        } else if (this.redirectPage) {
          this.wxNavigate.redirectToPage(this.redirectPage)
        } else {
          this.loginBack()
        }


      },


      async getuserinfo(e) {
        if (e.mp.detail.errMsg === 'getUserInfo:ok') {
          try {
            let userInfo = e.mp.detail.userInfo

            let editstatus = await this.wxRequest.post.call(this, this.wxUrl.editUser, {
              needToken: true, contentType: 'application/json', cities: userInfo.city,
              imageUrl: userInfo.avatarUrl,
              nationality: userInfo.country,
              nickname: userInfo.nickName,
              province: userInfo.province,
              sex: userInfo.gender,
            }).then(res => {
              console.log('res.data.content', res.data.content)
              this.$store.dispatch('Login', {userInfo: res.data.content})
              return true
            },res=>{
              return false
            })


            if(editstatus){
              if (this.qrcodeUrl) {
                this.wxNavigate.redirectToPage('index', {qrcodeUrl: this.qrcodeUrl})
              } else if (this.redirectPage) {
                this.wxNavigate.redirectToPage(this.redirectPage)
              } else {
                this.loginBack()
              }
            }else{
              throw new Error("获取微信用户信息失败")
            }

          } catch (err) {
            wx.showToast({
              title: err.message,
              icon: 'none'
            })
          }
        }
      },

//      async userinfoLogin({encryptedData, iv, rawData, signature}) {
//        let code = await this.wxPromise.login().then(res => res.code, res => null)
//        if (!code) throw new Error("登录失败")
//
//        let token = await this.wxRequest.get.call(this, this.wxUrl.login, {
//          code,
//          encryptedData,
//          iv,
//          rawData,
//          signature
//        }).then(res => res.data.token, res => null)
//        if (!token) throw new Error("登录失败")
//      }


    }
  };
</script>


<style lang="scss">
  @import "../../common/scss/base";

  page {
    background-color: #F9FCFB;
    height: 100%;
  }

  .login{
    height: 100%;
    background-color: #F9FCFB;
  }

  .phone-login-wrapper{
    left:0;
    right: 0;
    background-color: #F9FCFB;
  }
  .userinfo-login-wrapper{
    z-index: 2;
    left:100%;
    right:-100%;
    background-color: #F9FCFB;
  }

  .show-on{
    left:0!important;
    right:0!important;
  }

  .login-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    position: absolute;
    transition: all 0.2s linear;
    .slogan-1 {
      @include WH(168, 168);
      margin-top: rpx(146);
    }
    .name {
      margin-top: rpx(36);
      @include FCS(#666666, 32, 40, 40)
    }
    .login_btn_t {
      margin-top: rpx(130);
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #37D0B3;
      color: white;
      @include WH(540, 86);
      font-size: rpx(32);
      border-radius: rpx(43);
      .wechat-icon {
        @include WH(51, 42);
        margin-right: rpx(24);
      }
    }
    .proto-wrapper {
      margin-top: rpx(70);
      display: flex;
      align-items: center;
      .agree-wrapper {
        display: flex;
        position: relative;
        @include WH(27, 27);
        margin-right: rpx(15);
        .check {
          position: absolute;
          top: 0;
          left: 0;
          @include WH(27, 27);
        }
      }
      .t1 {
        @include FCS(#999999, 26, 34, 34);
      }
      .t2 {
        @include FCS(#333333, 26, 34, 34);
      }
    }

    .slogan-2-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-bottom: rpx(72);
      .slogan-2 {
        @include WH(627, 31);
      }
    }

  }
</style>
