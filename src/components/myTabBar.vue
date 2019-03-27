<template>
  <div class="tab">
    <div class="item"  @click="chooseTab(0)" :class="[tabIndex ===0 ?'select': '']">
      <image class="icon"  src="/static/images/icon-tabbar-me-default.png"></image>
      <text class="title">首页</text>
    </div>

    <div class="center">
      <div class="scan-wrapper" :class="[tabIndex ===1 ?'select': '']" @click="chooseTab(1)">
        <image class="virtual"></image>
        <image class="icon" src="/static/images/saoyisao.png" ></image>
        <text class="title">扫码</text>
      </div>
    </div>

    <div class="item" :class="[tabIndex ===2 ?'select': '']" @click="chooseTab(2)">
      <image class="icon" src="/static/images/icon-tabbar-me-default.png"></image>
      <text class="title">我的</text>
    </div>
  </div>
</template>

<script>
  export default {

    props: ['tabIndex'],
    data(){
      return{
//        tabIndex:1
      }
    },
    methods:{
      chooseTab(tabIndex){
        this.$emit('chooseTab',{'tabIndex':tabIndex})
      },

    },
  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";

  .tab {
    height: rpx(98);
    background: white;
    display: flex;
    .item {
      display: flex;
      flex-direction: column;
      padding: 0 rpx(100);
      height: rpx(98);
      justify-content: center;
      .icon{
        @include WH(42, 42);
      }

      .title {
        @include FCS(#B7B7B7, 22, 30);
        margin-top: rpx(5);
      }
    }
    .item.select {
      .title {
        @include FCS(#37D0B3);
      }
    }

    .center{
      flex:1;
      display: flex;
      justify-content: center;
      .scan-wrapper{
        height: rpx(98);
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center;
        .icon{
          @include WH(96,96);
          flex-shrink: 0;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -100%);
        }
        .virtual{
          @include WH(42, 42);
        }
        .title{
          @include FCS(#B7B7B7, 22, 30);
          margin-top: rpx(5);
        }
      }
      .scan-wrapper.select{
        .title{
          @include FCS(#37D0B3, 22, 30);
          margin-top: rpx(5);
        }
      }
    }

  }
</style>
