<template>
  <div class="test-wrapper">

    <scroll-view class="left-scroll-view" scroll-y :scroll-into-view="scrollViewId" scroll-with-animation>
      <div v-for="(item,index) in goodList" :key="index" :id="'id'+index" >
        {{item}}:{{'id'+index}}
      </div>

      <!--<div class="color-b" style="background-color: blue;height: 200rpx;"></div>-->
      <!--<div class="color-b" style="background-color: blue;height: 200rpx;"></div>-->
    </scroll-view>

    <scroll-view class="right-scroll-view" scroll-y>
      <div v-for="(item,index) in goodList2" :key="index" >
        {{item}}
      </div>
    </scroll-view>

    <div class="tere">
      <scrollcheck ref="scrollcheck1" viewId="scroll-id-1"></scrollcheck>
      <scrollcheck ref="scrollcheck2" viewId="scroll-id-2"></scrollcheck>
      <scrollcheck ref="scrollcheck3" viewId="scroll-id-3" ></scrollcheck>

    </div>


    <div>
      <button @click="clickBtn" id="btn-id-1">scroll 4</button>
    </div>
  </div>
</template>


<script>

  import mytabbar from '@/components/myTabBar'
  import membercard from '@/components/memberCard'
  import membercodecheck from '@/components/memberCodeCheck'
  import scrollcheck from '@/components/scrollCheck'

  export default {
    config: {
      navigationBarTitleText: '测试',
      enablePullDownRefresh: false,
    },
    data() {
      return {
        showScroll2:true,
        goodList: [1, 23, 3, 4, 34, 34, 3, 53, 5, 46, 546, 45, 74, 573, 53, 5, 46, 546, 45, 74, 573, 53, 5, 46, 546, 45, 74, 574, 5, 345, 34, 6534, 6, 34],
        goodList2: [1, 23, 3],
        tabIndex: 1,
        message: 'hello page test',
        hasMoreData: true,
        isRefreshing: false,
        isLoadingMoreData: false,
        cardInfo: {},
        scrollViewId:'id7'
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

    },

    onLoad() {
      console.log('this.wxUtil.rpx2px(10)')
      console.log(this.wxUtil.rpx2px(10))


    },
    components: {
      mytabbar, membercard, membercodecheck,scrollcheck
    },
    mounted() {
      console.log(this.$refs.scrollcheck)
//      this.$refs.scrollcheck1.checkUser()
//      this.$refs.scrollcheck2.checkUser()

    },
    onReady(){

//      const query = wx.createSelectorQuery()
//      query.select('#btn-id-1').boundingClientRect()
//      query.selectViewport().scrollOffset()
//      query.exec(function (res) {
//        console.log('query.select res',res)
//        res[0].top // #the-id节点的上边界坐标
//        res[1].scrollTop // 显示区域的竖直滚动位置
//      })

//      console.log(this.$refs.scrollcheck)
//      this.$refs.scrollcheck.checkUser()

//      const query = wx.createSelectorQuery().in(this)
//      query.select('#btn-id-1').boundingClientRect(function (res) {
//        res.top // 这个组件内 #the-id 节点的上边界坐标
//        console.log('query.select res',res)
//      }).exec()
//      console.log('query',query)
    },

    methods: {
      clickBtn(){
//        if(this.scrollViewId==='id16'){
//          this.scrollViewId='id6'
//        }else{
//          this.scrollViewId='id16'
//        }


//        this.$refs.scrollcheck2.checkUser()


              const query = wx.createSelectorQuery()
      query.select('#scroll-id-3').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        console.log('scroll-id-3 res',res)
        res[0].top // #the-id节点的上边界坐标
        res[1].scrollTop // 显示区域的竖直滚动位置
      })


        console.log('clickbtn')
        this.showScroll2 = false
      },
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


<style>
  page,test-wrapper{
    max-height: 100%;
  }
</style>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .test-wrapper{
    display: flex;
    background-color: #EEEEEE;
  }
  .left-scroll-view{
    width: rpx(150);
    background-color: red;

    height: rpx(500);
  }

  #btn-id-1{
    margin-top: rpx(100);
  }

  .tere{
    display: flex;
    flex-direction: column;
  }
</style>
