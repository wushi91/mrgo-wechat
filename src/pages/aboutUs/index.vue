<template>
  <div class="about-us">

    <image class="slogan-1" src="/static/images/login-slogan-1.png"></image>
    <text class="name">MR.GO智慧便利店</text>
    <text class="version">{{version}}</text>
    <!--体验版-->
    <text class="address">公司名称：深圳智荟物联技术有限公司</text>
    <text class="phone">加盟电话：0755-86525614</text>

    <button class='open-type-button share-buttton' open-type='share'>
      <div class="btn-share" open-type='share'>推荐给朋友</div>
    </button>
    <text class="toindex" @click="toIndexPage">进入小程序></text>

  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>


  export default {
    config: {
      navigationBarTitleText: '关于我们'
    },

    onLoad(){
      wx.hideShareMenu()
    },
    data() {
      return {
        version:this.wxConfig.version
      };
    },
    mounted() {

    },
    onLoad(options){
//      console.log(options)
//      console.log(getCurrentPages())
//      console.log(wx.getLogManager())
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
  @import "../../common/scss/base";

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
    .version,.address,.phone{
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
