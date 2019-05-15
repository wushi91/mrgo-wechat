<template>
  <div class="order-list">

    <i-tabs :current="currentTab" color="#37D0B3" @change="handleChange" fixed>
      <i-tab key="tab-all" title="全部订单"></i-tab>
      <i-tab key="tab-wait" title="待付款"></i-tab>
      <i-tab key="tab-can" title="可使用"></i-tab>
      <i-tab key="tab-back" title="退款/售后"></i-tab>
    </i-tabs>


    <div class="order-list-wrapper" v-if="currentTab==='tab-all' ">
      <div class='weui-loading-wrapper' :class="[isRefreshingAll?'':'weui-loading-wrapper-off']">
        <div class="weui-loading"></div>
      </div>
      <div class="order-blank" v-if="allOrderList&&allOrderList.length===0">
        <image src="/static/images/order-blank.png"></image>
        <text>还没有订单哦</text>
      </div>
      <div class="orderitem-wrapper" v-for="(order,index) in allOrderList" :key="index">
        <orderitem :orderInfo=order @orderItemClick="orderItemClick(order.orderId)"></orderitem>
      </div>
    </div>

    <div class="order-list-wrapper" v-if="currentTab==='tab-wait' ">
      <div class='weui-loading-wrapper' :class="[isRefreshingWait?'':'weui-loading-wrapper-off']">
        <div class="weui-loading"></div>
      </div>
      <div class="order-blank" v-if="waitOrderList&&waitOrderList.length===0">
        <image src="/static/images/order-blank.png"></image>
        <text>还没有订单哦</text>
      </div>
      <div class="orderitem-wrapper" v-for="(order,index) in waitOrderList" :key="index">
        <orderitem :orderInfo=order @orderItemClick="orderItemClick(order.orderId)"></orderitem>
      </div>


      <!--<div class="orderitem-wrapper">-->
      <!--<orderitem @orderItemClick="orderItemClick"></orderitem>-->
      <!--</div>-->


    </div>

    <div class="order-list-wrapper" v-if="currentTab==='tab-can' ">
      <div class='weui-loading-wrapper' :class="[isRefreshingCan?'':'weui-loading-wrapper-off']">
        <div class="weui-loading"></div>
      </div>
      <div class="order-blank" v-if="canOrderList&&canOrderList.length===0">
        <image src="/static/images/order-blank.png"></image>
        <text>还没有订单哦</text>
      </div>
      <div class="orderitem-wrapper" v-for="(order,index) in canOrderList" :key="index">
        <orderitem :orderInfo=order @orderItemClick="orderItemClick(order.orderId)"></orderitem>
      </div>
    </div>

    <div class="order-list-wrapper" v-if="currentTab==='tab-back' ">
      <div class='weui-loading-wrapper' :class="[isRefreshingBack?'':'weui-loading-wrapper-off']">
        <div class="weui-loading"></div>
      </div>
      <div class="order-blank" v-if="backOrderList&&backOrderList.length===0">
        <image src="/static/images/order-blank.png"></image>
        <text>还没有订单哦</text>
      </div>
      <div class="orderitem-wrapper" v-for="(order,index) in backOrderList" :key="index">
        <orderitem :orderInfo=order @orderItemClick="orderItemClick(order.orderId)"></orderitem>
      </div>
    </div>


    <orderlistcheck ref="allorderstatuscheck" orderTab="tab-all" @getPageOrders="getPageOrders"></orderlistcheck>
    <orderlistcheck ref="waitorderstatuscheck" orderTab="tab-wait" @getPageOrders="getPageOrders"></orderlistcheck>
    <orderlistcheck ref="canorderstatuscheck" orderTab="tab-can" @getPageOrders="getPageOrders"></orderlistcheck>
    <orderlistcheck ref="backorderstatuscheck" orderTab="tab-back" @getPageOrders="getPageOrders"></orderlistcheck>

  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>


<script>


  import orderitem from '@/templates/orderItem'
  import orderlistcheck from '@/components/orderListCheck'

  export default {
    config: {
      navigationBarTitleText: '我的订单',
      enablePullDownRefresh: true

    },
    components: {
      orderitem, orderlistcheck
    },
    data() {
      return {
        currentTab: 'tab-all',
        loadingHeight: 0,//rpx

        isRefreshingAll: false,
        isRefreshingWait: false,
        isRefreshingCan: false,
        isRefreshingBack: false,

        allOrderList: null,
        canOrderList: null,
        waitOrderList: null,
        backOrderList: null,
      };
    },

    onLoad(options) {

      if (options && options.data) {
        this.currentTab = JSON.parse(options.data).tab
      }
      this.loadingHeight = this.wxUtil.rpx2px(60)

      if (this.allOrderList === null) {
        this.isRefreshingAll = true
      }
      if (this.canOrderList === null) {
        this.isRefreshingWait = true
      }
      if (this.waitOrderList === null) {
        this.isRefreshingCan = true
      }
      if (this.backOrderList === null) {
        this.isRefreshingBack = true
      }

    },

    onUnload() {
      Object.assign(this.$data, this.$options.data())
    },

    onPullDownRefresh() {

      wx.stopPullDownRefresh({
        success: () => {
          if (this.currentTab === 'tab-all') {
            this.isRefreshingAll = true
          } else if (this.currentTab === 'tab-wait') {
            this.isRefreshingWait = true
          } else if (this.currentTab === 'tab-can') {
            this.isRefreshingCan = true
          } else if (this.currentTab === 'tab-back') {
            this.isRefreshingBack = true
          }
          this.freshOrderList(this.currentTab, 1)
        }
      })
    },

    onReachBottom() {
      this.freshOrderList(this.currentTab)//下一页
    },
    mounted() {
      this.freshOrderList(this.currentTab, 1)
    },

    onPageScroll({scrollTop}) {
      if (scrollTop >= 2 * this.loadingHeight) {//
        if (this.currentTab === 'tab-all') {
          this.isRefreshingAll = false
        } else if (this.currentTab === 'tab-wait') {
          this.isRefreshingWait = false
        } else if (this.currentTab === 'tab-can') {
          this.isRefreshingCan = false
        } else if (this.currentTab === 'tab-back') {
          this.isRefreshingBack = false
        }
      }
    },


    methods: {
      handleChange({mp}) {
        this.currentTab = mp.detail.key

        if (this.currentTab === 'tab-all' && this.allOrderList === null) {
          this.freshOrderList(this.currentTab, 1)
        } else if (this.currentTab === 'tab-wait' && this.waitOrderList === null) {
          this.freshOrderList(this.currentTab, 1)
        } else if (this.currentTab === 'tab-can' && this.canOrderList === null) {
          this.freshOrderList(this.currentTab, 1)
        } else if (this.currentTab === 'tab-back' && this.backOrderList === null) {
          this.freshOrderList(this.currentTab, 1)
        }
      },

      getPageOrders(v) {
        let tab = v.orderTab
        console.log('v',v)
        if (tab === 'tab-all') {
          if (v.pageNum === 1) {
            this.isRefreshingAll = false
            this.allOrderList = [].concat(v.pageOrders)
          } else {
            this.allOrderList = this.allOrderList.concat(v.pageOrders)
          }
        } else if (tab === 'tab-wait') {
          if (v.pageNum === 1) {
            this.isRefreshingWait = false
            this.waitOrderList = [].concat(v.pageOrders)
          } else {
            this.waitOrderList = this.waitOrderList.concat(v.pageOrders)
          }
        } else if (tab === 'tab-can') {
          if (v.pageNum === 1) {
            this.isRefreshingCan = false
            this.canOrderList = [].concat(v.pageOrders)
          } else {
            this.canOrderList = this.canOrderList.concat(v.pageOrders)
          }
        } else if (tab === 'tab-back') {
          if (v.pageNum === 1) {
            this.isRefreshingBack = false
            this.backOrderList = [].concat(v.pageOrders)
          } else {
            this.backOrderList = this.backOrderList.concat(v.pageOrders)
          }
        }

      },

      freshOrderList(tab, pageNum) {
        if (tab === 'tab-all') {
          this.$refs.allorderstatuscheck.getOrders(pageNum)
        } else if (tab === 'tab-wait') {
          this.$refs.waitorderstatuscheck.getOrders(pageNum)
        } else if (tab === 'tab-can') {
          this.$refs.canorderstatuscheck.getOrders(pageNum)
        } else if (tab === 'tab-back') {
          this.$refs.backorderstatuscheck.getOrders(pageNum)
        }

      },

      orderItemClick(orderId) {
        this.wxNavigate.navigateToPage('orderDetail',{orderId})
      }
    },


  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .weui-loading-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    transition: all 1s linear;
    .weui-loading {
      transition: all 1s linear;
      margin-top: rpx(10);
      @include WH(50, 50);
      display: inline-block;
      vertical-align: middle;
      -webkit-animation: weuiLoading 1s steps(12, end) infinite;
      animation: weuiLoading 1s steps(12, end) infinite;
      background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
      background-size: 100%;
    }
  }

  .weui-loading-wrapper-off {
    height: 0;
    transition: all 1s linear;
    .weui-loading {
      /*opacity: 0;*/
    }
  }

  .order-list {
    padding-top: 42PX;
    padding-bottom: rpx(20);
    display: flex;
    flex-direction: column;

    .orderitem-wrapper {
      margin-top: rpx(20);
    }

    .order-list-wrapper {

    }

    .order-blank {
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        margin-top: rpx(146);
        margin-bottom: rpx(22);
        @include WH(160, 127);
      }

      text {
        @include FCS(#999999, 28, 36, 36);
      }
    }
  }


</style>
