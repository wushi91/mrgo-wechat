<template>
  <div class="home">
    <swiper autoplay circular interval="100000" previous-margin="20rpx" next-margin="40rpx">
      <swiper-item>
        <image class="i1" mode='aspectFill'></image>
      </swiper-item>

      <swiper-item>
        <image class="i2" mode='aspectFill'></image>
      </swiper-item>

      <swiper-item>
        <image class="i3" mode='aspectFill'></image>
      </swiper-item>
    </swiper>

    <div class="my-info">
      <image class="avater"></image>
    </div>

    <div class="w1">
      <div class="online-shop"></div>
      <div class="today-discount"></div>
    </div>

    <div class="w2">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>

    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        bannerList:[1,23,456]
      };
    },
    methods:{

    }

  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .home{
    swiper {
      /*background-color: #FFB9B9;*/
      padding:rpx(20);
      height: rpx(320);
      swiper-item{

      }
      .i1{
        background-color: #e6e6ea;
      }
      .i2{
        background-color: #e6efff;
      }
      .i3{
        background-color: #fff0ea;
      }
      image{
        background-color: #e6e6ea;
        height: 100%;
        width: 100%;
        margin: 0 rpx(20);
      }
    }

    .my-info{
      background-color: white;
      padding:rpx(35) rpx(20);
      margin: 0 rpx(20) rpx(20) rpx(20);
      display: flex;
      border-radius:rpx(10);
      .avater{
        background-color: #e6e6ea;
        @include WH(88,88);
        border-radius: 50%;
      }

    }

    .w1{
      display: flex;
      margin: 0 rpx(20);
      justify-content: space-between;
      .online-shop{
        @include WH(470,250);
        background-color: white;
        border-radius:rpx(10);
      }
      .today-discount{
        @include WH(223,250);
        background-color: white;
        border-radius:rpx(10);
      }

    }

    .w2{
      display: flex;
      margin: rpx(20) ;
      justify-content: space-between;
      .item{
        @include WH(223,250);
        background-color: white;
        border-radius:rpx(10);
      }



    }
  }


</style>
