<template>
  <div class="order-good-item">
    <div class="pic-wrapper">
      <template v-if="goodInfo&&goodInfo.imgUrl"><image class="pic" :src="goodInfo.imgUrl">商品图片</image></template>
      <template v-else>
        <image class="default-pic" src="/static/images/icon-good-default.png"></image>
      </template>

    </div>

    <div class="divname">
      <text class="name text-two-line">{{goodInfo.name}}</text>
      <div class="divprice">
        <text class="n-price">￥{{goodInfo.price}}</text>
        <!--<text class="y-price">会员￥{{goodInfo.price}}</text>-->
        <text class="y-price"></text>
        <text class="amount">x {{goodInfo.num}}</text>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    props: ['goodInfo'],
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
    padding: rpx(20) rpx(30);
    .pic-wrapper{
      flex-shrink: 0;
      @include WH(136,136);
      border:rpx(2) solid rgba(238, 238, 238, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: rpx(25);
      image{
        @include WH(90,90);
        /*background-color: #e6e6ea;*/

      }

      .default-pic{
        @include WH(136,136);
      }
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
          @include FCS(#FF766F,32,40,40);
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
