<template>
  <div class="tab">
    <div class="item"  @click="chooseTab(0)" :class="[tabIndex ===0 ?'select': '']">
      <image class="icon"  src="/static/images/index-home-select.png" v-show="tabIndex ===0 "></image>
      <image class="icon"  src="/static/images/index-home-normal.png" v-show="tabIndex !==0 "></image>
      <text class="title">首页</text>
    </div>

    <!--<div class="center">-->
      <!--<div class="scan-wrapper" :class="[tabIndex ===1 ?'select': '']" @click="chooseTab(1)">-->
        <!--<image class="icon" src="/static/images/index-saoyisao.png" ></image>-->
        <!--<div style="height: 45rpx"></div>-->
        <!--<text class="title">开门·购物</text>-->
      <!--</div>-->
    <!--</div>-->

    <div class="item" :class="[tabIndex ===2 ?'select': '']" @click="chooseTab(2)">
      <image class="icon"  src="/static/images/index-mine-select.png" v-show="tabIndex ===2 "></image>
      <image class="icon"  src="/static/images/index-mine-normal.png" v-show="tabIndex !==2 "></image>
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
    height: rpx(108);
    background: white;
    display: flex;
    .item {
      display: flex;
      flex-direction: column;
      /*padding: 0 rpx(100);*/
      height: rpx(98);
      justify-content: center;
      align-items: center;
      width: 50%;
      .icon{
        @include WH(45, 45);
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
          @include WH(206,117);
          flex-shrink: 0;
          position: absolute;
          left: 50%;
          bottom: rpx(38);
          transform: translate(-50%);
        }

        .title{
          @include FCS(#B7B7B7, 22, 30);
          margin-top: rpx(5);
        }
      }
      .scan-wrapper.select{
        .title{
          @include FCS(#37D0B3, 22, 30);
        }
      }
    }

  }
</style>
