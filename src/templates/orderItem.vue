<template>
  <div class="order-item" @click="orderItemClick">
    <div class="header-wrapper">
      <text class="store-name">{{orderInfo.storeName}}</text>
      <image src="/static/images/order-item-arrow.png"></image>
      <text class="order-status-orange" v-if="orderInfo.status===1||orderInfo.status===2||orderInfo.status===4">{{orderInfo.statusName}}</text>
      <text class="order-status" v-else>{{orderInfo.statusName}}</text>
    </div>

    <div class="time-wrapper">
      <text class="time">{{orderInfo.createTime}}</text>
    </div>

    <div class="line-1-px-ee"></div>

    <div class="good-wrapper">

      <template v-if="imageList&&imageList.length>0">
        <div class="pic-wrapper" v-for="(imgUrl,index) in imageList" :key="index" v-if="index<5">

          <template v-if="imgUrl">
            <image class="pic" :src="imgUrl" ></image>
          </template>
          <template v-else>
            <image class="default-pic" src="/static/images/icon-good-default.png"></image>
          </template>

        </div>
      </template>
      <template v-else>
        <div class="pic-wrapper">
          <image class="default-pic" src="/static/images/icon-good-default.png"></image>
        </div>
      </template>

    </div>

    <div class="line-1-px-ee"></div>

    <div class="action-wrapper">
      <div class="price-wrapper">
        <text class="t1">共{{orderInfo.num}}件</text>
        <text class="t2">￥{{orderInfo.payable}}</text>
      </div>


      <div class="action" v-if="orderInfo.status===1">去付款</div>
      <div class="action" v-if="orderInfo.status===2">去使用</div>

    </div>
  </div>
</template>

<script>


  /**
   * 订单的状态 1：待付款 2：可使用 3：已完成 4：退款/售后 5：已取消
   */
  export default {

    props: ['orderInfo'],
    computed: {
      imageList() {
        return this.orderInfo.imgUrlStr?this.orderInfo.imgUrlStr.split(','):[]
      }

    },
    data() {
      return {
//        tabIndex:1
      }
    },
    methods: {
      orderItemClick() {
        this.$emit('orderItemClick', {name: ''})
      }

    },
  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";

  .order-item {
    background-color: white;

    .header-wrapper {
      display: flex;
      align-items: center;
      padding: rpx(18) rpx(30) rpx(8) rpx(30);
      .store-name {
        @include FCS(#333333, 32, 40, 40);
      }
      image {
        @include WH(16, 27);
        margin-left: rpx(18);
      }
      .order-status {
        flex: 1;
        text-align: right;
        @include FCS(#333333, 32, 40, 40);
      }
      .order-status-orange{
        flex: 1;
        text-align: right;
        @include FCS(#FF766F, 32, 40, 40);
      }
    }

    .time-wrapper {
      display: flex;
      padding: 0 rpx(30) rpx(10) rpx(30);
      .time {
        @include FCS(#999999, 24, 32, 32);
        flex: 1;
      }
    }
    .good-wrapper {
      display: flex;
      align-items: center;
      background-color: #FFFFFF;
      height: rpx(158);
      padding: 0 rpx(34);

      .pic-wrapper {
        flex-shrink: 0;
        @include WH(118, 118);
        background-color: white;
        /*border: rpx(2) solid rgba(238, 238, 238, 1);*/
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: rpx(25);
        image {
          @include WH(118, 118);
          /*background-color: #e6e6ea;*/

        }
        .default-pic{
          @include WH(118, 118);
        }
      }

    }



    .action-wrapper {
      display: flex;
      align-items: center;
      padding: rpx(20) rpx(30) rpx(36) rpx(30);

      .price-wrapper {
        display: flex;
        align-items: center;
        flex:1;
        .t1 {
          flex: 1;
          text-align: right;
          @include FCS(#333333, 26, 34, 34);
        }
        .t2 {
          @include FCS(#FF766F, 32, 40, 40);
          margin-left: rpx(20);
        }
      }

      .action {
        text-align: center;
        margin-left: rpx(96);
        padding: rpx(10) rpx(26);
        @include FCS(#37D0B3, 32, 40, 40);
        border: 1PX solid #37D0B3;
        border-radius: rpx(30);
      }
    }
  }

</style>
