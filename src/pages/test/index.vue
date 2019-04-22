<template>
  <div>

    <membercard :cardInfo="cardInfo"></membercard>
    <!--<view class="weui-loadmore" wx:if='isRefreshing'>-->
      <!--<view class="weui-loading"></view>-->
      <!--<view class="weui-loadmore-tips">正在刷新...</view>-->
    <!--</view>-->

    <!--<text>{{message}}</text>-->
    <!--<text>{{count}}<br/></text>-->
    <!--<text>{{token}}</text>-->
    <!--<button @click="playvoice">playvoice</button>-->
    <!--<input placeholder="这是一个可以自动聚焦的input"/>-->

    <!--<scroll-view scroll-y @scroll="scroll">-->

      <!--<div class="scroll-inner">-->
        <!--<block v-for="(good,index) in goodList" :key="index" >-->
          <!--<div>1 {{good}}</div>-->
          <!--<div>1 {{good}}</div>-->
        <!--</block>-->
      <!--</div>-->



    <!--</scroll-view>-->

  </div>
</template>


<script>

  import mytabbar from '@/components/myTabBar'
  import membercard from '@/components/memberCard'

  export default {
    config: {
      navigationBarTitleText: '测试',
      enablePullDownRefresh: true,
      disableScroll:true,
    },
    data() {
      return {
        goodList:[1,23,3,4,34,34,3,53,5,46,546,45,74,573,53,5,46,546,45,74,573,53,5,46,546,45,74,574,5,345,34,6534,6,34],
        tabIndex: 1,
        message: 'hello page test',
        hasMoreData: true,
        isRefreshing: false,
        isLoadingMoreData: false,
        cardInfo:{}
      };
    },
    computed: {},

    onPullDownRefresh: function () {
      if (this.isRefreshing || this.isLoadingMoreData) {
        return
      }
      this.isRefreshing = true
      this.hasMoreData = true

//      this.requestData()//数据请求
    },

    onReachBottom: function () {
      if (this.isRefreshing || this.isLoadingMoreData || !this.hasMoreData) {
        return
      }

      this.isLoadingMoreData = true

//      this.requestData()//数据请求
    },

    onLoad() {

    },
    components: {
      mytabbar,membercard
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

    }
  };

  //      playvoice() {
  //        console.log('playvoice ----')


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
  //      }

  //      let content = '13822542311'
  //      let reg = /\d+?/
  //      console.log(content.match(reg))
  //      let u = new URL('http://wechat.mrgo.club/mrgostore?id=11')
  //      console.log(u)
  //      wx.playVoice({
  //        filePath: 'static/wav/welcome-mrgo.wav',
  //        complete: function (res) {
  //          console.log('playVoice res')
  //          console.log(res)
  //        }
  //      })

  //      wx.playVoice({
  //        filePath: 'static/wav/welcome-mrgo.wav',
  //        complete: function (res) {
  //          console.log('playVoice res')
  //          console.log(res)
  //        }
  //      })
  //      console.log(this.wxUtil.getQueryString('http://wechat.mrgo.club/mrgostore?id=11'))
  //      console.log('sfefef'.split('&'))
</script>

<style scoped>

  scroll-view{
    background-color: green;
    height:100VH;

  }
  .weui-loadmore {
    width: 100%;
    height: 100 rpx;
    font-size: 30 rpx;
    text-align: center;
    margin-top: 30 rpx;
  }

  .weui-loading {
    width: 50 rpx;
    height: 50 rpx;
    display: inline-block;
    vertical-align: middle;
    -webkit-animation: weuiLoading 1s steps(12, end) infinite;
    animation: weuiLoading 1s steps(12, end) infinite;
    background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
    background-size: 100%;
  }

  .weui-loadmore-tips {
    display: inline-block;
    vertical-align: middle;
  }

</style>
