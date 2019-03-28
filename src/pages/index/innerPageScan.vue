<template>
  <div class="scan">

    <image class="avater">头像</image>
    <text class="nickname">吃货一个</text>
    <div class="open-door" @click="scanOpenDoor">
      <image src="/static/images/bg_door.png"></image>
      <text>开门</text>
    </div>
    <image class="slogan" src="/static/images/slogan.png"></image>


  </div>
</template>

<script>

  export default {
    data() {
      return {
        arr:[1],
      };
    },
    methods:{
      scanOpenDoor(){
        wx.scanCode({
          onlyFromCamera: true,
          success(res) {
            wx.navigateTo({url: `/pages/offlineStore/index`})
            console.log(res)
          }
        })
      }
    }

  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .scan{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avater{
      @include WH(118,118);
      background-color: lightblue;
      border-radius: rpx(10);
      margin-top: rpx(60);
    }
    .nickname{
      margin-top: rpx(15);
      @include FCS(#333333,32,40,40);
    }

    .open-door{
      margin-top: rpx(35);
      position: relative;
      image{
        @include WH(444,444)
      }
      text{
        display: block;
        position: absolute;
        text-align: center;
        width: rpx(444);
        @include FCS(#FFFFFF,120,444,444);
        top:0;
        left:0;
      }
    }

    .slogan{
      margin-top: rpx(120);
      @include WH(585,144);
    }
  }

</style>
