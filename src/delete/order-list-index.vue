<template>
  <div class="order-list">

    <i-tabs :current="currentTab" color="#37D0B3" @change="handleChange" fixed>
      <i-tab key="tab-all" title="全部订单"></i-tab>
      <i-tab key="tab-wait" title="待付款"></i-tab>
      <i-tab key="tab-can" title="可使用"></i-tab>
      <i-tab key="tab-back" title="退款/售后"></i-tab>
    </i-tabs>

    <!--v-if="isRefreshing"-->
    <!--<div :class="[isRefreshing?'weui-loading-wrapper-on': 'weui-loading-wrapper-off']" >-->
      <!--<div class="weui-loading" ></div>-->
    <!--</div>-->

    <div class='weui-loading-wrapper' :class="[offLoading?'weui-loading-wrapper-off': '']" v-if="isRefreshing">
      <div class="weui-loading" ></div>
    </div>

    <div class="order-list-wrapper" v-if="currentTab==='tab-all' ">

      <div class="order-blank" v-if="allOrderList&&allOrderList.length===0">
        <image src="/static/images/order-blank.png"></image>
        <text>还没有订单哦</text>
      </div>

      <!--<div class="orderitem-wrapper">-->
        <!--<orderitem @orderItemClick="orderItemClick"></orderitem>-->
      <!--</div>-->

    </div>

    <div class="order-list-wrapper" v-if="currentTab==='tab-wait' ">

      <div class="order-blank" v-if="waitOrderList&&waitOrderList.length===0">
        <image src="/static/images/order-blank.png"></image>
        <text>还没有订单哦</text>
      </div>

    </div>

    <div class="order-list-wrapper" v-if="currentTab==='tab-can' ">
      <div class="order-blank" v-if="canOrderList&&canOrderList.length===0">
        <image src="/static/images/order-blank.png"></image>
        <text>还没有订单哦</text>
      </div>
    </div>

    <div class="order-list-wrapper" v-if="currentTab==='tab-back' ">
      <div class="order-blank" v-if="backOrderList&&backOrderList.length===0">
        <image src="/static/images/order-blank.png"></image>
        <text>还没有订单哦</text>
      </div>
    </div>

  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  import orderitem from '@/components/orderItem'
//  <!--v-if="isRefreshing"-->
  export default {
    config: {
      navigationBarTitleText: '我的订单',
      enablePullDownRefresh:true

    },
    components: {
      orderitem
    },
    data() {
      return {
        currentTab: 'tab-all',
        isRefreshing:false,
        offLoading:false,
        loadingHeight:0,//rpx

        allOrderList:null,
        canOrderList:null,
        waitOrderList:null,
        backOrderList:[],
      };
    },

    onLoad(options) {

      if(this.backOrderList){
        console.log('空数组为true')
      }else{
        console.log('空数组为false')
      }



      this.loadingHeight = this.wxUtil.rpx2px(60)
      console.log('this.loadingHeight',this.loadingHeight)
      if (options && options.data)
        this.currentTab = JSON.parse(options.data).tab
      this.wxRequest.get.call(this,this.wxUrl.getAllOrder,{
        needToken: true
      }).then(res=>{
        console.log('order res',res)
      },res=>{
        console.log('order err',res)
      })

    },

    onUnload(){
      Object.assign(this.$data, this.$options.data())
    },

    onPullDownRefresh(){

//      wx.showNavigationBarLoading()
      wx.stopPullDownRefresh({
        success:()=> {
          this.isRefreshing = true
          this.offLoading = false
        }
      })
    },

    onReachBottom(){
      console.log('onReachBottom --onReachBottom onReachBottom')
    },

    onPageScroll({scrollTop}){

      if (scrollTop >= 2*this.loadingHeight) {//
        this.offLoading =  true
      }

//      if (scrollTop >= this.loadingHeight) {//
//        if (this.isRefreshing ) this.toCloseLoading = true
//      }
//      else if (scrollTop < this.loadingHeight) {
//        if (this.toCloseLoading){
//          wx.pageScrollTo({
//            scrollTop: 0,
//            duration: 0,
//            success:()=>{
//              this.isRefreshing = false
//            },
//          })
//        }
//      }

//      if(scrollTop>=this.loadingHeight){//
//        if(this.isRefreshing&&this.toCloseLoading ===false){
//          this.toCloseLoading = true
////          this.isRefreshing = false
////          wx.pageScrollTo({
////          scrollTop: this.loadingHeight
////        })
//
//      }else if(scrollTop<this.loadingHeight){
//          if(this.toCloseLoading){
//            this.isRefreshing = false
//          }
//        }
//
//        console.log(scrollTop)
//
//      }else{
//
//      }
      console.log('scrollTop',scrollTop)

    },
    mounted() {

    },

    methods: {
      handleChange({mp}) {
        this.currentTab = mp.detail.key
      },

      freshOrderList(){

      },

      orderItemClick() {

        this.isRefreshing =!this.isRefreshing
        if(this.isRefreshing){
          this.offLoading = true
        }else{
          this.offLoading = false
        }
//        wx.navigateTo({url: `/pages/orderDetail/index`})
      }
    },



  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .weui-loading-wrapper{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    transition: all 1s ease;
    .weui-loading {
      transition: all 1s ease;
      margin-top: rpx(10);
      @include WH(50,50);
      display: inline-block;
      vertical-align: middle;
      -webkit-animation: weuiLoading 1s steps(12, end) infinite;
      animation: weuiLoading 1s steps(12, end) infinite;
      background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
      background-size: 100%;
    }
  }


  .weui-loading-wrapper-off{
    height: 0;
    transition: all 1s ease;
    .weui-loading{
      opacity: 0;
    }
  }

  image{
    @include WH(118,118);
    background-color: #e6e6ea;
  }
  image+image{
    margin-left: rpx(26);
  }

  .order-list {
    padding-top: 42PX;
    padding-bottom: rpx(20);
    display: flex;
    flex-direction: column;

    .orderitem-wrapper {
      margin-top: rpx(20);
    }

    .order-list-wrapper{

    }

    .order-blank{
      display: flex;
      flex-direction: column;
      align-items: center;

      image{
        margin-top: rpx(146);
        margin-bottom: rpx(22);
        @include WH(160,127);
      }

      text{
        @include FCS(#999999,28,36,36);
      }
    }
  }


</style>
