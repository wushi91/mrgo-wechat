<template>
  <div class="about-us">

    <image class="slogan-1" src="/static/images/login-slogan-1.png"></image>
    <text class="name">MR.GO智慧便利店</text>
    <text class="version">体验版V0.0.2</text>

    <button class='open-type-button share-buttton' open-type='share'>
      <div class="btn-share" open-type='share'>推荐给朋友</div>
    </button>
    <text class="toindex" @click="toIndexPage">进入小程序></text>

  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  import mytabbar from '@/components/myTabBar'

  export default {
    config: {
      navigationBarTitleText: '关于我们'
    },

    components: {
      mytabbar
    },
    onLoad(){
      wx.hideShareMenu()
    },
    data() {
      return {};
    },
    mounted() {

    },
    onLoad(options){
      console.log(options)
      console.log(getCurrentPages())
      console.log(wx.getLogManager())
    },

    methods: {
      toIndexPage(){

        if(getCurrentPages().length>1){
          this.wxNavigate.goBack()
        }else{//分享页面进来的
          this.wxNavigate.redirectToPage('index')
        }

      }
    },
    onShareAppMessage: function (options) {

      console.log('options',options)
//      let data = JSON.stringify({id: this.id})
//      return {
//        title: this.coachInfo.nickName,
//        desc: '教练之家',
//        path: `/pages/coach/main?data=${data}`
//      }
    },
  };
</script>

<style>
  page {
    /*background-color: #FFFFFF;*/
    /*background-color: red;*/
    height: 100%;
  }
</style>
<style lang="scss" scoped>
  @import "../../../common/scss/base";

  .about-us {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    .slogan-1 {
      @include WH(168, 168);
      margin-top: rpx(146);
    }
    .name {
      @include FCS(#666666, 32, 40, 40);
      margin-top: rpx(36);
    }
    .version {
      margin-top: rpx(24);
      @include FCS(#999999, 26, 34, 34);
    }
    .btn-share {
      margin-top: rpx(112);
      text-align: center;
      @include WH(290, 86);
      background-color: #37D0B3;
      @include FCS(#FFFFFF, 32, 86, 86);
      border-radius: rpx(44);
    }
    .toindex{
      margin-top: rpx(50);
      @include FCS(#999999, 26, 34, 34);
    }
  }
</style>
