<template>
  <div class="test-wrapper">

    <!--<text style="font-size: 26rpx">openid:{{openid}}</text>-->
    <!--<text style="font-size: 26rpx">loginCode:{{loginCode}}</text>-->
    <!--<text style="font-size: 26rpx">session_key:{{session_key}}</text>-->
    <!--<button @click="openMember">打开会员码</button>-->
    <!--<button @click="addMember">成为会员</button>-->

    <!--<navigator class="menu_list btn-opencard" target="miniProgram" app-id="wxeb490c6f9b154ef9" :extra-data="extra_data">-->
    <!--<div class="title">领取会员卡 <em class="xg-mp-font icon-jiantou"></em></div>-->
    <!--</navigator>-->

    <!--<button @click="testSetting">测试wx.getseting</button>-->
    <!--<button @click="testSetting">测试wx.getseting</button>-->
    <button @click="toPage('index')">首页</button>
    <button @click="toPage('offlineSCar')">购物车</button>
    <button @click="toPage('storeList')">所有门店</button>
    <button @click="toPage('myCoupon')">我的优惠券</button>
    <button @click="toPage('getCoupon')">领取优惠卷</button>
    <button @click="toPage('useCoupon')">使用优惠券</button>


    <text>{{testTimeStamp}}</text>
    <div class="input-comment-wrapper" :style="'bottom: '+inputBottom+'px;'">
      <div class="input-wrapper">

        <input :placeholder="placeholder" @input="onEvent" @focus="inputfocus" @blur="inputblur"
               data-tag='input-comment'
               placeholder-style="color:#B9B9B9;" maxlength='200' :focus="autoFocus" :adjust-position='false'>
      </div>
      <!--||isComment==='yes'-->
      <button class="main-button" @click="addPostComment">发送</button>
    </div>

  </div>
</template>


<script>


  //  import scrollcheck from '@/components/scrollCheck'

  import wxNavigateTest from '@/utils/wxNavigateTest'
  import wxToast from '@/utils/wxToast'

  export default {
    config: {
      navigationBarTitleText: '测试',
    },
    components: {
//      scrollcheck
    },
    data() {
      return {

        inputBottom: 0,
        loginCode: '...',
        openid: '...',
        session_key: '...',
        appid: 'wx0facf1f31a74c225',
        appSecret: '6f3ad96341fcf7ffd8f583559ee682e4',
        extra_data: {},
        testTimeStamp:'2019-08-16 23:59:59'
      };
    },
    computed: {},


    onLoad(options) {



//      console.log(options)
//      console.log('怎么啦',JSON.stringify(options))
//      if(JSON.stringify(options) === "{}"){
//        console.log('空')
//      }else{
//        console.log('不为空')
//      }
//
//      console.log(this.$router)
//      console.log(this.$route)
//
//      this.initAccessToken()
//      wxNavigateTest.navigateToPage('addOrderComment',{a:2,b:34,c:234})
//
////      wx.showToast({title:'hahah',duration:3000,success:()=>{
////        console.log('傻逼')
////      }})
//      wxToast.toastText('hello world')
//      wxToast.toastToDo({title:'支付成功',duration:3000}).then(res=>{
//        console.log('我是一只大厦宝宝')
//      })

//      wxToast.textmm('22',232)


//      console.log()
    },

    mounted() {

      console.log(this.testTimeStamp.split('-').join('/'))
      this.testTimeStamp = new Date(this.testTimeStamp.split('-').join('/'))

      console.log(this.testTimeStamp)
      console.log(this.testTimeStamp.getTime())
    },


    methods: {

      toPage(pageUrl){
        this.wxNavigate.navigateToPage(pageUrl)
      },

      testSetting() {
        wx.getSetting({
          success(res) {
            console.log('setting res', res)
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: function (res) {
                  wxToast.toastText('已经授权')
                  console.log('已经授权', res)
                }
              })
            } else {
              wxToast.toastToDo({title: '还未授权', duration: 2000}).then(res => {
                wxNavigateTest.navigateToPage('login')
              })

            }
          }
        })
      },

      initLoginCode() {
        this.wxPromise.login().then(res => {
          console.log('res.code', res.code)

          this.loginCode = res.code
          this.initOpenId(this.appid, this.appSecret, this.loginCode)

        }, res => null)
      },

      initAccessToken(APP_ID, APP_SECRET) {
        //https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

        this.wxPromise.request({
          url: 'https://api.weixin.qq.com/cgi-bin/token', data: {
            appid: APP_ID,
            secret: APP_SECRET,
            grant_type: 'client_credential'
          },
          method: 'GET',
        }).then(res => {
          console.log('initAccessToken res', res)
        }, res => {
          console.log('initAccessToken err', res)
        })

      },
      initOpenId(APP_ID, APP_SECRET, LOGIN_CODE) {
        this.wxPromise.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session', data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: LOGIN_CODE,
            grant_type: 'authorization_code'
          },
          method: 'GET',
        }).then(res => {
          this.openid = res.data.openid
          this.session_key = res.data.session_key
          console.log('initOpenId res', res.data)
        }, res => {
          console.log('initOpenId err', res)
        })


      },


      openMember() {
        console.log('openMember')
        wx.openCard({
          cardList: [{
            cardId: 'pw_MH0ug2B7Y8uT-gdNkkuUHqCFs',
            code: ''
          }],
          success(res) {
          }
        })
      }
      ,
      addMember() {

        console.log('addMember')
//        let timestamp = new Date().getTime()
//        let rawString = this.wxUtil.getRawString({timestamp})
//        let signature = this.wxUtil.sha1(rawString)
//
//        console.log(`{"timestamp":"${timestamp}","signature":"${signature}"}`)
//        wx.addCard({
//          cardList: [
//            {
//              cardId: 'pw_MH0ug2B7Y8uT-gdNkkuUHqCFs',
//              cardExt: `{"timestamp":"${timestamp}","signature":"${signature}"}`
//            }
//          ],
//          success(res) {
//            console.log('addMember success',res.cardList) // 卡券添加结果
//          },
//          fail(res){
//            console.log('addMember fail',res)
//          }
//        })

        wx.navigateToMiniProgram({
          appId: 'wxeb490c6f9b154ef9', // 固定为此 appid，不可改动
          extraData: {encrypt_card_id: '', outer_str: "", biz: ""}, // 包括 encrypt_card_id, outer_str, biz三个字段，须从 step3 中获得的链接中获取参数

          success(res) {

            console.log('navigateToMiniProgram success res', res)
          },
          fail(res) {
            console.log('navigateToMiniProgram fail res', res)
          },
          complete() {
          }
        })
      }
      ,

      inputblur() {
        console.log('inputblur')
        let windowHeight = wx.getSystemInfoSync().windowHeight
        console.log('windowHeight', windowHeight)
        this.inputBottom = 0
      }
      ,
      inputfocus(e) {
        console.log('---inputfocus')
        let windowHeight = wx.getSystemInfoSync().windowHeight
        console.log('windowHeight', windowHeight)
        console.log(e.mp.detail.height)
        this.inputBottom = e.mp.detail.height
      }
    }
  }
  ;

</script>


<style>
  page, test-wrapper {
    max-height: 100%;
  }
</style>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .test-wrapper {
    display: flex;
    background-color: #EEEEEE;
    flex-direction: column;

    .input-comment-wrapper-1 {
      box-sizing: border-box;
      border-top: rpx(1) solid #D8D8D8;
      height: rpx(128);
      background-color: white;
      width: 100%;
      display: flex;
      align-items: center;
      .input-wrapper {
        margin: 0 rpx(30);
        display: flex;
        align-items: center;
        height: rpx(88);
        flex: 1;
        padding: 0 rpx(20);
        background-color: #F5F5F5;
        border-radius: rpx(8);
        image {
          @include WH(32, 32);
          margin-right: rpx(16);
        }
        input {
          flex: 1;
          @include FCS(#333333, 24, 32, 32);
          @include FONT-MEDIUM;
        }

      }

      button {
        margin-right: rpx(30);
        @include FCS(white, 32, D, D);
        @include FONT-MEDIUM;
      }
    }
    .input-comment-wrapper {
      box-sizing: border-box;
      border-top: rpx(1) solid #D8D8D8;
      position: fixed;
      height: rpx(128);
      background-color: white;
      bottom: 0;
      width: 100%;
      display: flex;
      align-items: center;
      .input-wrapper {
        margin: 0 rpx(30);
        display: flex;
        align-items: center;
        height: rpx(88);
        flex: 1;
        padding: 0 rpx(20);
        background-color: #F5F5F5;
        border-radius: rpx(8);
        image {
          @include WH(32, 32);
          margin-right: rpx(16);
        }
        input {
          flex: 1;
          @include FCS(#333333, 24, 32, 32);
          @include FONT-MEDIUM;
        }

      }

      button {
        margin-right: rpx(30);
        @include FCS(white, 32, D, D);
        @include FONT-MEDIUM;
      }
    }

  }


</style>
