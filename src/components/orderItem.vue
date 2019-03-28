<template>
  <div class="order-item">
    <div class="header-wrapper">
      <text class="store-name">朗诗未来家店</text>
      <image></image>
      <text class="order-status">待付款</text>
    </div>
    <div class="line-1-px"></div>

    <div class="good-wrapper">
      <image></image>
      <image></image>
    </div>

    <div class="price-wrapper">
      <text class="t1">共2件</text>
      <text class="t2">￥16.00</text>
    </div>

    <div class="line-1-px"></div>

    <div class="action-wrapper">
      <text class="time">2019-02-13 17:20</text>
      <div class="action">去使用</div>
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


    },
  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";
  .order-item{
    background-color: white;

    .header-wrapper{
      display: flex;
      align-items: center;
      height:rpx(76);
      padding: 0 rpx(30);
      .store-name{
        @include FCS(#333333,32,40,40);
      }
      image{
        @include WH(16,27);
        background-color: #e6e6ea;
        margin-left: rpx(18);
      }
      .order-status{
        flex: 1;
        text-align: right;
        @include FCS(#333333,32,40,40);
      }
    }
    .good-wrapper{
      display: flex;
      align-items: center;
      background-color: #FAFAFA;
      height:rpx(150);
      padding: 0 rpx(34);
      image{
        @include WH(118,118);
        background-color: #e6e6ea;
      }
      image+image{
        margin-left: rpx(26);
      }
    }

    .price-wrapper{
      display: flex;
      align-items: center;
      height:rpx(70);
      padding: 0 rpx(30);
      .t1{
        flex: 1;
        text-align: right;
        @include FCS(#333333,32,40,40);
      }
      .t2{
        @include FCS(#F94B15,32,40,40);
        margin-left: rpx(20);
      }
    }

    .action-wrapper{
      display: flex;
      align-items: center;
      height:rpx(84);
      padding: 0 rpx(30);
      .time{
        @include FCS(#999999,26,34,34);
        flex:1;
      }

      .action{
        text-align: center;
        padding:rpx(10) rpx(26);
        @include FCS(#37D0B3,32,40,40);
        border: 1PX solid #37D0B3;
        border-radius: rpx(30);
      }
    }
  }

</style>
