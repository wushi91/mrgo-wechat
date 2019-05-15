<template>
  <div class="test-wrapper">

    <text style="font-size: 26rpx">openid:{{openid}}</text>
    <text style="font-size: 26rpx">loginCode:{{loginCode}}</text>
    <text style="font-size: 26rpx">session_key:{{session_key}}</text>
    <button @click="openMember">打开会员码</button>
    <button @click="addMember">成为会员</button>

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
        session_key: '...'
      };
    },
    computed: {},


    onLoad() {

//      console.log(this.wxUtil.sha1('efefe'))
//      console.log(this.wxUtil.getRawString({grant_type: 'authorization_code'}))
//
//      console.log(new Date().getTime())
      this.wxPromise.login().then(res => {
        console.log('res.code', res.code)

        this.loginCode = res.code
        this.initOpenId('wx2ca38014acceeebe', '0bc6e32646e9f77a4006ef45cc60e5a5', res.code)

      }, res => null)


    },

    mounted() {

    },


    methods: {



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
          }, {
            cardId: '',
            code: ''
          }],
          success(res) {
          }
        })
      }
      ,
      addMember() {
        let code = this.loginCode
        let openid = this.openid
        console.log('addMember')
        let timestamp = new Date().getTime()
        let rawString = this.wxUtil.getRawString({code,openid,timestamp})
        let signature = this.wxUtil.sha1(rawString)

        console.log(`{"code": "${code}", "openid": "${openid}", "timestamp": "${timestamp}", "signature":"${signature}"}`)
        wx.addCard({
          cardList: [
            {
              cardId: 'pw_MH0ug2B7Y8uT-gdNkkuUHqCFs',
              cardExt: `{"code": "${code}", "openid": "${openid}", "timestamp": "${timestamp}", "signature":"${signature}"}`
            }
          ],
          success(res) {
            console.log(res.cardList) // 卡券添加结果
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
