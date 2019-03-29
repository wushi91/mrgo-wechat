<template>
  <div class="order-good-item">
    <image class="pic">商品图片</image>
    <div class="divname">
      <text class="name text-two-line">费列罗核果卫华巧克力16盒装200g/盒</text>
      <div class="divprice">
        <text class="n-price">￥3.00</text>
        <text class="y-price">会员￥2.00</text>
        <text class="amount">x4</text>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    data(){
      return{

      }
    },
    methods:{


    },
  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";

  .order-good-item{
    display: flex;
    padding-right: rpx(30);
    padding-top: rpx(20);
    padding-bottom: rpx(20);
    image{
      flex-shrink: 0;
      @include WH(136,136);
      background-color: #e6e6ea;
      margin-right: rpx(25);
    }
    .divname{
      flex:1;
      display: flex;
      flex-direction: column;
      .name{
        margin-top: rpx(4);
        margin-bottom: rpx(16);
        @include FCS(#333333,26,34,34);
        height: rpx(68);
      }
      .divprice{
        display: flex;
        align-items: center;

        .n-price{
          @include FCS(#F96D18,32,40,40);
          width: rpx(130);
          margin-right: rpx(10);

        }
        .y-price{
          @include FCS(#333333,26,34,34);
          flex:1;

        }
        .amount{
          @include FCS(#333333,32,40,40);
        }
      }
    }
  }

</style>
