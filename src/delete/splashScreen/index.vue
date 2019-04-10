<template>
  <div class="splash-screen">
    <image class="slogan-1" src="/static/images/login-slogan-1.png"></image>
  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  /**
   * 线下用微信扫一扫二维码进入小程序的入口
   * 在当前页面进行开门（或者添加物品），还是就起到传值的作用？ 选择起到传值的作用，功能由专属页面实现
   * 页面传入测试值 q=http%3A%2F%2Fwechat.mrgo.club%2Fmrgostore%3Fid%3D310454588388159488
   * */

  export default {
    config: {},
    components: {},

    data() {
      return {
        pageSurvice: true,
        qrcodeUrl:'',
      }
    },
    onLoad(options) {
      if(options&&options.q){
        this.qrcodeUrl = decodeURIComponent(options.q)
      }
      this.waitToast()
    },

    onReady: function () {
      let beginT = new Date().getTime()
      this.wxRequest.get.call(this, this.wxUrl.checkLogin, {needToken: true}).then(res => {
        console.log('splash screen token 身份有效')
        let duration = this.waitSecond(beginT,new Date().getTime())
        if(this.qrcodeUrl){
          //扫描二维码后的跳转页
          this.wxNavigate.waitRedirectToage('index', '', duration, {qrcodeUrl: encodeURIComponent(this.qrcodeUrl),tabIndex:1})
        }else{
          //到首页
          this.wxNavigate.waitRedirectToage('index','', duration )
        }

      }, res => {
        console.log('splash screen token 身份失效')
        let duration = this.waitSecond(beginT,new Date().getTime())
        if(this.qrcodeUrl){
          this.wxNavigate.waitRedirectToage('login', '', duration, {qrcodeUrl: encodeURIComponent(this.qrcodeUrl)})
        }else{
          this.wxNavigate.waitRedirectToage('login', '', duration, {redirectPage:'index'})
        }

      })
    },

    onUnload: function () {
      this.pageSurvice = false
      wx.hideLoading()
    },


    mounted() {

    },

    methods: {

//      scanToPage(isLogin,qrcodeUrl,duration){
//        this.wxPromise.setTimeout(duration).then(res=>{
//          if(!isLogin){
//            this.wxNavigate.redirectToPage('login',{qrcodeUrl:encodeURIComponent(qrcodeUrl)})
//            return
//          }
//          if(qrcodeUrl.startsWith(storeQrcode.path)){
//            this.wxNavigate.redirectToPage(storeQrcode.goalPage,{qrcodeUrl:encodeURIComponent(qrcodeUrl)})
//          }else{
//            this.wxNavigate.redirectToPage('index')
//          }
//        })
//      },

      waitToast(){
        this.wxPromise.setTimeout(4000).then(res=>{
          if (this.pageSurvice){
            wx.showLoading({mask:true})
          }
        })
      },

      waitSecond(begin,over,tsecond=1000){
        //在这个页面停留至少3秒(tsecond)，请求数据时记录时间begin,返回数据记录时间over，如果间隔时间小于3秒，等待之后再做跳转
        let t = over-begin
        if(t>=tsecond){
          return 0
        }else{
          return tsecond-t
        }
      },




    }
  };
</script>

<style>
  page {
    background-color: #F1FFFF;
    height: 100%;
  }
</style>
<style lang="scss" scoped>
  @import "../../common/scss/base";

  .splash-screen {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100%;
    background-color: #F1FFFF;
    .slogan-1 {
      @include WH(615, 216);
      margin-top: rpx(310);
    }
  }
</style>
