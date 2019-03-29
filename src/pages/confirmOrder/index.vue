<template>
  <div class="confirm-order">

    <div class="info-wrapper">
      <div class="store-info">
        <div class="name">
          <image src="/static/images/store-location-map.png"></image>
          <text>朗诗未来家</text>
        </div>
        <text class="location">深圳市南山区软件产业基地B座2楼</text>
      </div>

      <div class="good-list">

        <ordergooditem></ordergooditem>
        <div class="line-1-px"></div>
        <ordergooditem></ordergooditem>

      </div>

      <div class="count-price">
        <div class="w1">
          <div class="original-price">
            <text class="t1">商品总金额</text>
            <text class="t2">￥6.00</text>
          </div>

          <text class="member-price">会员: ￥15.00</text>
        </div>

        <div class="line-1-px"></div>

        <div class="w2">
          <text class="t1">优惠卷</text>
          <text class="t2">已减￥1.00</text>
        </div>

        <div class="line-1-px"></div>

        <div class="w3">
          <text class="t1">合计：</text>
          <text class="t2">￥5.00</text>
        </div>
      </div>
    </div>


    <div class="slogan-wrapper">
      <image class="slogan" src="/static/images/slogan.png"></image>
    </div>


    <div class="pay-wrapper">
      <div class="btn-scan">继续扫码购</div>
      <div class="btn-pay">去支付</div>
    </div>

  </div>
</template>

<script>

  import ordergooditem from '@/components/orderGoodItem'

  export default {
    config: {
      navigationBarTitleText: 'MR.GO 订单确认'
    },
    components: {
      ordergooditem
    },
    data() {
      return {
        message: '订单确认',

      };
    },
    mounted() {

    },

    methods: {}
  };
</script>

<style>
  page {
    display: flex;
    flex-direction: column;
  }
</style>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .confirm-order {
    flex: 1;
    display: flex;
    flex-direction: column;

    .line-1-xp {
      margin: rpx(10) 0 rpx(10) rpx(10);
    }
    .store-info {
      background-color: white;
      display: flex;
      flex-direction: column;
      padding: rpx(24) rpx(28);
      .name {
        margin-bottom: rpx(12);
        display: flex;
        align-items: center;
        text {
          @include FCS(#333333, 32, 40, 40);
          margin-left: rpx(12);
        }
        image {
          @include WH(25, 32);
        }
      }
      .location {
        @include FCS(#999999, 26, 34, 34);
      }
    }

    .good-list {
      margin-top: rpx(20);
      padding: 0 0 0 rpx(22);
      background-color: white;
      .good {
        display: flex;
        padding-right: rpx(30);
        padding-top: rpx(20);
        padding-bottom: rpx(20);
        image {
          flex-shrink: 0;
          @include WH(136, 136);
          background-color: #e6e6ea;
          margin-right: rpx(25);
        }
        .divname {
          flex: 1;
          display: flex;
          flex-direction: column;
          .name {
            margin-top: rpx(4);
            margin-bottom: rpx(16);
            @include FCS(#333333, 26, 34, 34);
            height: rpx(68);
          }
          .divprice {
            display: flex;
            align-items: center;

            .n-price {
              @include FCS(#F96D18, 32, 40, 40);
              width: rpx(130);
              margin-right: rpx(10);

            }
            .y-price {
              @include FCS(#333333, 26, 34, 34);
              flex: 1;

            }
            .amount {
              @include FCS(#333333, 32, 40, 40);
            }
          }
        }
      }
    }

    .count-price {
      background-color: white;
      display: flex;
      flex-direction: column;
      margin-top: rpx(28);
      padding-top: rpx(32);
      padding-left: rpx(30);
      .w1 {
        display: flex;
        flex-direction: column;
        padding-right: rpx(30);
        padding-bottom: rpx(6);
        .original-price {
          margin-bottom: rpx(32);
          display: flex;
          .t1 {
            flex: 1;
          }
          @include FCS(#333333, 32, 40, 40);

        }

        .member-price {
          @include FCS(#333333, 32, 40, 40);
          width: 100%;
          text-align: right;
        }
      }

      .w2 {
        margin: rpx(32) 0;
        padding-right: rpx(30);
        display: flex;
        .t1 {
          flex: 1;
          @include FCS(#333333, 32, 40, 40);
        }
        .t2 {
          @include FCS(#F96D18, 32, 40, 40);
        }

      }

      .w3 {
        margin: rpx(32) 0 rpx(34) 0;
        padding-right: rpx(30);
        display: flex;
        .t1 {
          text-align: right;
          flex: 1;
          @include FCS(#999999, 32, 40, 40);
        }
        .t2 {
          @include FCS(#333333, 32, 40, 40);
        }
      }

    }

    .slogan-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-bottom: rpx(98);
      .slogan {
        margin-top: rpx(42);
        @include WH(585, 144);
        margin-left: rpx(78);
        margin-bottom: rpx(42);
      }
    }

    .pay-wrapper {
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: rpx(98);
      background-color: white;
      align-items: center;
      justify-content: center;
      .btn-scan {
        text-align: center;
        @include WH(240, 78);
        @include FCS(#37D0B3, 32, 78, 78);
        border: rpx(2) solid #37D0B3;
        border-radius: rpx(40);
      }

      .btn-pay {
        text-align: center;
        @include WH(430, 78);
        background: linear-gradient(120deg, rgba(113, 229, 203, 1), rgba(57, 209, 180, 1));
        @include FCS(#FFFFFF, 32, 78, 78);
        border-radius: rpx(40);
        margin-left: rpx(20);
      }
    }

  }

</style>
