<template>
  <div>

    <text>{{message}}</text>
    <text>{{count}}<br/></text>
    <text>{{token}}</text>
    <button @click="playvoice">playvoice</button>
    <input placeholder="这是一个可以自动聚焦的input"/>

  </div>
</template>


<script>

  import mytabbar from '@/components/myTabBar'

  export default {
    config: {
      navigationBarTitleText: '测试',
    },
    data() {
      return {
        tabIndex: 1,
        message: 'hello page test',

      };
    },
    computed: {
      count() {
        return this.$store.state.count
      },
      token() {
        return this.$store.getters.token
      }
    },
    onLoad() {

//      let content = '13822542311'
//      let reg = /\d+?/
//      console.log(content.match(reg))
//      let u = new URL('http://wechat.mrgo.club/mrgostore?id=11')
//      console.log(u)
      wx.playVoice({
        filePath: 'static/wav/welcome-mrgo.wav',
        complete: function (res) {
          console.log('playVoice res')
          console.log(res)
        }
      })

//      wx.playVoice({
//        filePath: 'static/wav/welcome-mrgo.wav',
//        complete: function (res) {
//          console.log('playVoice res')
//          console.log(res)
//        }
//      })
      console.log(this.wxUtil.getQueryString('http://wechat.mrgo.club/mrgostore?id=11'))
      console.log('sfefef'.split('&'))
    },
    components: {
      mytabbar
    },
    mounted() {

    },

    methods: {
      chooseTab(v) {
        this.tabIndex = v.tabIndex
      },
      totoken() {
        this.$store.dispatch('Login', {token: '222fefefegsgdfg'})
      },
      playvoice() {
        console.log('playvoice ----')


//        wx.playBackgroundAudio({
//          dataUrl: 'static/wav/welcome-mrgo.wav',
//        })
//
//        wx.playVoice({
//          filePath: 'static/wav/welcome-mrgo.wav',
//          complete: function (res) {
//            console.log('playVoice res')
//            console.log(res)
//          }
//        })
      }
    }
  };
</script>

<style scoped>
  input {
    background-color: white;
    font-size: 24 rpx;
    padding: 5px;
    line-height: normal;
  }
</style>
