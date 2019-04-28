<template>
  <div class="operate-result">

    <div class="pay-success" v-if="theResult==='pay-success'">

      <img class="icon-pay-sucess" src="/static/images/icon-pay-sucess.png"/>
      <text class="operate-title">支付成功</text>

      <div class="detail-wrapper">
        <div class="item">
          <text class="t1">订单编号：</text>
          <text class="t2">{{orderId}}</text>
        </div>

        <div class="item">
          <text class="t1">下单时间：</text>
          <text class="t2">{{orderDetail.createTime}}</text>
        </div>

        <div class="item">
          <text class="t1">支付状态：</text>
          <text class="t2">支付成功</text>
        </div>

        <div class="item">
          <text class="t1">订单状态：</text>
          <text class="t2">已完成</text>
        </div>

        <div class="item">
          <text class="t1">用户姓名：</text>
          <text class="t2">{{nickname?nickname:'无'}}</text>
        </div>

      </div>
      <div class="btn-wrapper">
        <div class="btn-back" @click="toBackPage">继续浏览</div>
        <div class="btn-order" @click="toOrderDetailPage">查看订单</div>
      </div>

    </div>
    <div class="pay-member-success" v-if="theResult==='pay-member-success'">

      <img class="icon-pay-sucess" src="/static/images/icon-pay-sucess.png"/>
      <text class="operate-title">支付成功</text>


      <div class="btn-wrapper">
        <div class="btn-back" @click="toBackPage">返回首页</div>
        <div class="btn-order" @click="toOrderDetailPage">查看订单</div>
      </div>

    </div>
    <text>{{message}}</text>
  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  import mytabbar from '@/components/myTabBar'

  export default {
    config: {
      navigationBarTitleText: ''
    },

    components: {
      mytabbar
    },
    data() {
      return {
        theResult: '',
        orderDetail:{},
        orderId:'',
        nickname:this.$store.getters.userInfo.nickname
      };
    },
    mounted() {

    },

    methods: {
      toBackPage(){
        this.wxNavigate.goBack()
      },
      toOrderDetailPage(){
        this.wxNavigate.redirectToPage('orderDetail',{orderId:this.orderId})
      },

      paySuccess(orderId){
        console.log(this.orderId)
        console.log('支付成功 orderId',this.orderId)
        this.orderId = orderId
        wx.setNavigationBarTitle({title: '支付成功'})
        this.wxRequest.get.call(this, this.wxUrl.getOrderDetail, {needToken: true,orderId}).then(res => {
          console.log('order detail success', res.data)
          this.orderDetail = res.data.content.order
        })
      }

    },

    onLoad(options) {
      this.theResult = options&&options.data ? JSON.parse(options.data).theResult : ''
      console.log('this.theResult',this.theResult)
//      this.theResult = 'pay-member-success'

      switch (this.theResult){
        case 'pay-success':
          this.paySuccess(JSON.parse(options.data).orderId)
          break
      }


    }


  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .operate-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    .pay-success {
      margin-top: rpx(30);
      background-color: white;
      width: rpx(690);
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius:rpx(10);
      .icon-pay-sucess {
        @include WH(244, 244);
        margin: rpx(30) 0 rpx(60) 0;
      }

      .operate-title{
        @include FCS(#393939,36,44,44);
        margin-bottom: rpx(90);
      }

      .detail-wrapper{
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-left:rpx(86);
        box-sizing: border-box;
        .item{
          display: flex;
          margin-bottom: rpx(26);
          .t1{
            @include FCS(#666666,32,40,40);
          }
          .t2{
            @include FCS(#999999,32,40,40);
          }
        }
      }

      .btn-wrapper{
        display: flex;
        margin-top: rpx(64);
        margin-bottom: rpx(90);
        .btn-back {
          text-align: center;
          @include WH(260, 78);
          background-color: #37D0B3;
          @include FCS(#FFFFFF, 32, 78, 78);
          border-radius: rpx(40);
        }

        .btn-order {
          text-align: center;
          @include WH(260, 78);
          @include FCS(#37D0B3, 32, 78, 78);
          border: rpx(2) solid #37D0B3;
          border-radius: rpx(40);
          margin-left: rpx(20);
        }
      }

    }

    .pay-member-success {
      margin-top: rpx(30);
      background-color: white;
      width: rpx(690);
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius:rpx(10);
      .icon-pay-sucess {
        @include WH(244, 244);
        margin: rpx(30) 0 rpx(60) 0;
      }

      .operate-title{
        @include FCS(#393939,36,44,44);
        margin-bottom: rpx(90);
      }

      .detail-wrapper{
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-left:rpx(86);
        box-sizing: border-box;
        .item{
          display: flex;
          margin-bottom: rpx(26);
          .t1{
            @include FCS(#666666,32,40,40);
          }
          .t2{
            @include FCS(#999999,32,40,40);
          }
        }
      }

      .btn-wrapper{
        display: flex;
        margin-top: rpx(64);
        margin-bottom: rpx(90);
        .btn-back {
          text-align: center;
          @include WH(260, 78);
          background-color: #37D0B3;
          @include FCS(#FFFFFF, 32, 78, 78);
          border-radius: rpx(40);
        }

        .btn-order {
          text-align: center;
          @include WH(260, 78);
          @include FCS(#37D0B3, 32, 78, 78);
          border: rpx(2) solid #37D0B3;
          border-radius: rpx(40);
          margin-left: rpx(20);
        }
      }

    }
  }

</style>
