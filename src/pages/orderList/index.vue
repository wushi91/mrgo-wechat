<template>
  <div class="order-list">

    <i-tabs :current="currentTab" color="#37D0B3" @change="handleChange" fixed>
      <i-tab key="tab-all" title="全部订单"></i-tab>
      <i-tab key="tab-wait" title="待付款"></i-tab>
      <i-tab key="tab-can" title="可使用"></i-tab>
      <i-tab key="tab-back" title="退款/售后"></i-tab>
    </i-tabs>


    <div class="orderitem-wrapper">
      <orderitem @orderItemClick="orderItemClick"></orderitem>
    </div>

    <div class="orderitem-wrapper">
      <orderitem @orderItemClick="orderItemClick"></orderitem>
    </div>

    <div class="orderitem-wrapper">
      <orderitem @orderItemClick="orderItemClick"></orderitem>
    </div>

    <div class="orderitem-wrapper">
      <orderitem @orderItemClick="orderItemClick"></orderitem>
    </div>

    <div class="orderitem-wrapper">
      <orderitem @orderItemClick="orderItemClick"></orderitem>
    </div>


  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  import orderitem from '@/components/orderItem'

  export default {
    config: {
      navigationBarTitleText: '我的订单'
    },
    components: {
      orderitem
    },
    data() {
      return {
        message: '我的订单hello page hha',
        currentTab: 'tab-all'
      };
    },
    mounted() {

    },

    methods: {
      handleChange({mp}) {
        this.currentTab = mp.detail.key
      },
      orderItemClick() {
        wx.navigateTo({url: `/pages/orderDetail/index`})
      }
    },

    onLoad(options) {
      if (options && options.data)
        this.currentTab = JSON.parse(options.data).tab
    }


  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .order-list {
    padding-top: 42PX;
    padding-bottom: rpx(20);

    .orderitem-wrapper {
      margin-top: rpx(20);
    }
  }


</style>
