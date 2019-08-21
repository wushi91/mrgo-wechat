<template>
  <div class="order-good-item">
    <div class="top-wrapper">
      <div class="pic-wrapper">
        <template v-if="goodInfo&&goodInfo.imgUrl"><image class="pic" :src="goodInfo.imgUrl">商品图片</image></template>
        <template v-else>
          <image class="default-pic" src="/static/images/icon-good-default.png"></image>
        </template>

      </div>

      <div class="divname">
        <text class="name">{{goodInfo.name}}</text>

        <div class="youhui-wrapper" @click="showYouHui=!showYouHui">
          <text class="youhui-t1">此商品参与优惠活动</text><text class="youhui-t2">查看优惠</text>
        </div>

        <!--<div class="youhui-wrapper" @click="showYouHui=!showYouHui">-->
          <!--&lt;!&ndash;<text class="youhui-t1">此商品参与优惠活动</text><text class="youhui-t2">查看优惠</text>&ndash;&gt;-->
        <!--</div>-->

        <div class="divprice">
          <text class="n-price">￥{{goodInfo.price}}</text>
          <!--<text class="y-price">会员￥{{goodInfo.price}}</text>-->
          <text class="y-price"></text>
          <text class="amount">x {{goodInfo.num}}</text>
        </div>
      </div>
    </div>


    <div class="bottom-wrapper" v-if="showYouHui">
      <text>优惠套餐活动不可使用。</text>

    </div>
  </div>
</template>

<script>
  export default {

    props: ['goodInfo'],
    data(){
      return{
        showYouHui:false
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
    flex-direction: column;
    width: rpx(750);
    .top-wrapper{
      display: flex;
      padding: rpx(20) rpx(30);
      .pic-wrapper{
        flex-shrink: 0;
        @include WH(136,136);
        /*border:rpx(2) solid rgba(238, 238, 238, 1);*/
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: rpx(25);
        image{
          @include WH(136,136);
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
          width: rpx(400);
          margin-top: rpx(4);
          margin-bottom: rpx(10);
          @include FCS(#333333,26,34,34);
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .youhui-wrapper{
          margin-bottom: rpx(10);
          display: flex;
          height: rpx(32);
          .youhui-t1{
            @include FCS(#37D0B3,24,30,30);
            margin-right: rpx(20);

          }
          .youhui-t2{
            background-color: #37D0B3;
            @include FCS(#FEFEFE,24,30,30);
            padding: 0 rpx(8);
            border-radius: rpx(4);
          }
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

    .bottom-wrapper{
      display: flex;
      padding:rpx(10) rpx(40);
      background:rgba(238,238,238,1);
      box-shadow:0 0 rpx(24) 0 rgba(182,216,210,0.14);
      text{
        white-space: pre-wrap;
        @include FCS(#666666,24,32,D);
        display: block;
        word-wrap : break-word ;
      }
    }
  }


</style>
