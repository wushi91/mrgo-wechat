<template>
  <div class="login">

    <image class="slogan-1" src="/static/images/login-slogan-1.png"></image>
    <button class="login_btn_t open-type-button" :open-type="[agreeProto?'getPhoneNumber':'']"
            @getphonenumber='getphonenumber' @click="clickLoginBtn">
      <image class="wechat-icon" src="/static/images/login-wechat.png"></image>
      使用微信手机号登录
    </button>


    <!--<button class="login_btn_t open-type-button" open-type="getUserInfo"-->
            <!--@getuserinfo='getuserinfo'>-->
      <!--<image class="wechat-icon" src="/static/images/login-wechat.png"></image>-->
      <!--获取微信用户信息-->
    <!--</button>-->

    <div class="proto-wrapper">
      <div class="agree-wrapper">
        <image class="check" src="/static/images/read_done.png" v-if="agreeProto"
               @click="agreeProto=!agreeProto"></image>
        <image class="check" src="/static/images/read_un.png" v-else @click="agreeProto=!agreeProto"></image>
      </div>
      <text class="t1" @click="agreeProto=!agreeProto">已阅读并同意</text>
      <text class="t2" @click="toUserProtocolPage">《MGRO用户协议》</text>
    </div>

    <div class="slogan-2-wrapper">
      <image class="slogan-2" src="/static/images/login-slogan-2.png"></image>
    </div>
  </div>
</template>

<script>
  export default {
    config: {
      "disableScroll": true,
    },

    data() {
      return {
        agreeProto: true,
      };
    },
    mounted() {

    },

//    wx.showToast({
//    title: '登录成功'
//  })
//  setTimeout( () =>{
//    wx.redirectTo({url: `/pages/index/index`})
//  },1000)

    methods: {
      clickLoginBtn() {
        if (this.agreeProto === false) {
          wx.showToast({
            title: '请阅读并同意《mrgo用户协议》',
            icon: 'none',
          })
        }
      },

      async getuserinfo(e) {
        if (e.mp.detail.errMsg === 'getUserInfo:ok') {
          try {
            console.log(e.mp.detail)
            await this.userinfoLogin(e.mp.detail)
          } catch (err) {
            wx.showToast({
              title: err.message,
              icon: 'none'
            })
          }
        }
      },

      async getphonenumber(e) {
        if (e.mp.detail.errMsg === 'getPhoneNumber:ok') {
          try {
            await this.phoneLogin(e.mp.detail)
          } catch (err) {
            wx.showToast({
              title: err.message,
              icon: 'none'
            })
          }

        }
      },

      toUserProtocolPage() {
        wx.navigateTo({url: `/pages/userProtocol/index`})
      },

      async phoneLogin({encryptedData, iv}) {
        let code = await this.wxPromise.login().then(res => res.code, res => null)
        if (!code) throw new Error("登录失败")
        let token = await this.wxRequest.get.call(this, this.wxUrl.login, {code, encryptedData, iv}).then(res => res.data.token, res => null)

      },

      async userinfoLogin({encryptedData, iv,rawData,signature}) {
        let code = await this.wxPromise.login().then(res => res.code, res => null)
        if (!code) throw new Error("登录失败")

        let token = await this.wxRequest.get.call(this, this.wxUrl.login, {code, encryptedData, iv,rawData,signature}).then(res => res.data.token, res => null)
        if (!token) throw new Error("登录失败")
      }

    }
  };
</script>


<style lang="scss">
  @import "../../common/scss/base";

  page {
    background-color: #F1FFFF;
    height: 100%;
  }

  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background-color: #F1FFFF;
    .slogan-1 {
      @include WH(615, 216);
      margin-top: rpx(210);
    }
    .login_btn_t {
      margin-top: rpx(190);
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
