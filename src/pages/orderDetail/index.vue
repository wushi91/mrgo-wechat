<template>
  <div class="order-detail">
    <div class="store-info-wrapper">
      <div class="name-wrapper">
        <image src="/static/images/store-location-map.png"></image>
        <text class="name">朗诗未来家（月售 5241）</text>
        <text class="distance">1.2km</text>
      </div>
      <div class="star-wrapper">
        <image class="star"></image>
        <image class="star"></image>
        <image class="star"></image>
        <image class="star"></image>
        <image class="star"></image>
      </div>

      <text class="address">深圳市南山区软件产业基地B座2楼</text>
    </div>

    <div class="ordergood-wrapper">
      <ordergooditem></ordergooditem>
      <div class="line-1-px"></div>
      <ordergooditem></ordergooditem>
    </div>

    <div class="price-wrapper">
      <div class="item">
        <text>商品总金额</text>
        <text>￥6.00</text>
      </div>
      <div class="line-1-px"></div>
      <div class="item other-color">
        <text>优惠券</text>
        <text>已减￥1.00</text>
      </div>
      <div class="line-1-px"></div>
      <div class="item other-color">
        <text>实付金额</text>
        <text>￥5.00</text>
      </div>
    </div>

  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  import ordergooditem from '@/components/orderGoodItem'

  export default {
    config: {
      navigationBarTitleText: '订单详情'
    },

    components: {
      ordergooditem
    },
    data() {
      return {
        message: '订单详情',

      };
    },
    mounted() {

    },

    methods: {}
  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .order-detail {
    .store-info-wrapper {
      display: flex;
      flex-direction: column;
      padding: rpx(20);
      background-color: white;
      .name-wrapper {
        display: flex;
        align-items: center;

        image {
          @include WH(25, 32);
          margin-right: rpx(12);
        }
        .name {
          @include FCS(#333333, 32, 40, 40);
          flex: 1;
        }
        .distance {
          margin-right: rpx(10);
          @include FCS(#999999, 26, 34, 34);
        }
      }

      .star-wrapper {
        display: flex;
        margin-top: rpx(12);
        margin-left: rpx(37);
        .star {
          @include WH(32, 32);
          margin-left: rpx(6);
          background-color: #e6e6ea;
        }
      }
      .address {
        margin-top: rpx(18);
        margin-left: rpx(37);
        @include FCS(#999999, 26, 34, 34);
      }
    }

    .ordergood-wrapper {
      background-color: white;
      margin-top: rpx(20);
      padding: rpx(10) 0 rpx(10) rpx(20);
      .line-1-px{
        margin-left: rpx(10);
      }
    }

    .price-wrapper {
      margin-top: rpx(20);
      padding-left: rpx(30);
      background-color: white;
      .item {
        display: flex;
        height: rpx(112);
        padding-right: rpx(30);
        align-items: center;
        text:first-child {
          flex: 1;
          @include FCS(#333333, 32, 40, 40);
        }
        text:nth-child(2) {
          @include FCS(#333333, 32, 40, 40);
        }

        &.other-color {
          text:nth-child(2) {
            @include FCS(#F96D18, 32, 40, 40);
          }
        }
      }
    }
  }
</style>
