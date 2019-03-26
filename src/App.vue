<script>
export default {
  globalConfig: {
    usingComponents: {
      'van-tag': 'vant-weapp/dist/tag/index'
    }
  },
  created () {
    var token = wx.getStorageSync('token')
    // 调用API从本地缓存中获取数据
     if(token.token){
        var _this =this
        var url = 'pages/classify/index'
        // var url = 'pages/classify/settlement'
        wx.switchTab({ url })
     }
  },
  methods: {
  },
}
</script>

<style>
/* .container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
} */
/* this rule will be remove */
* { 
  height: 100%;
  width: 100%;
  transition: width 1s;
  -moz-transition: width 1s;
  -webkit-transition: width 1s;
  -o-transition: width 1s;
}
</style>
