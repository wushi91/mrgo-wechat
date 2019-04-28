<template>
  <div class="confirm-order">

    <div class="info-wrapper">
      <div class="store-info">
        <div class="name">
          <image src="/static/images/store-location-map.png"></image>
          <text>{{offlineShop.name}}</text>
        </div>
        <text class="location">{{offlineShop.address}}</text>
      </div>


      <div class="good-list">

        <div v-for="(good,index) in goodList" :key="index" class="good-item">

          <i-swipeout i-class="ordergooditem-swipeout" :operateWidth="swipeLeftPx">
            <view slot="content">
              <ordergooditem :goodInfo="good"></ordergooditem>
            </view>
            <view slot="button" class="delete-wrapper" @click="deleteGood(good.commodityId)">
              <image src="/static/images/icon-shanchu.png"></image>
            </view>
          </i-swipeout>
          <div class="line-1-px" v-if="index<goodList.length-1"></div>
        </div>

      </div>

      <div class="count-price">
        <div class="w1">
          <!--<div class="original-price">-->
            <!--<text class="t1">商品总金额</text>-->
            <!--<text class="t2">￥{{shopCarTotal.totalPrice}}</text>-->
          <!--</div>-->

          <text class="t1">商品总金额</text>
          <text class="t2">￥{{shopCarTotal.totalPrice}}</text>

          <!--<text class="member-price">会员: ￥15.00</text>-->
        </div>

        <div class="line-1-px"></div>

        <template v-if="true">
          <div class="w2">
            <text class="t1">会员价</text>
            <text class="t2">￥{{shopCarTotal.vipAmount}}</text>
          </div>

          <div class="line-1-px"></div>
        </template>

        <div class="w2">
          <text class="t1">优惠卷</text>
          <text class="t2">已减￥0.00</text>
        </div>


        <!--<div class="w3">-->
          <!--<text class="t1">小计：</text>-->
          <!--<text class="t2">￥{{shopCarTotal.totalPrice}}</text>-->
        <!--</div>-->
      </div>
    </div>


    <div class="total-price-wrapper">
      <text class="t1">小计：</text>
      <text class="t2">￥{{shopCarTotal.totalPrice}}</text>
    </div>

    <div class="slogan-wrapper">
      <!--<image class="slogan" src="/static/images/slogan.png"></image>-->
    </div>


    <div class="pay-wrapper">
      <div class="btn-scan" @click="scanMRGOCode">继续扫码购</div>
      <div class="btn-pay" @click="payShopCarTryCatch">去支付</div>
    </div>

  </div>
</template>

<script>

  import ordergooditem from '@/components/orderGoodItem'
  import {goodQrcode} from '@/utils/scanQrcode'


  /**
   * 购物车管理解决的3个问题
   * 1.该商品已经支付，不加入购物车
   * 2.该商品已经添加到购物车，不要重复添加，通过rfid唯一值判断
   * 3.添加同一类商品，做数量增加，记得要同时加入该物品的rfid
   * */
//  disableSwipeBack: true,
  export default {
    config: {
      navigationBarTitleText: 'MR.GO 订单确认',

    },
    components: {
      ordergooditem
    },

    data() {
      return {
        swipeLeftRpx: 148,
        swipeLeftPx: 0,

        offlineShop: {},
        goodList: [],
        shopCarTotal: {
          totalPrice: 0,
          totalCount: 0,
          vipAmount:0,
        }
      };
    },
    mounted() {

    },
    onLoad(options) {

      this.swipeLeftPx = this.wxUtil.rpx2px(this.swipeLeftRpx);
      if (options && options.data) {
        let qrcodeUrl = decodeURIComponent(JSON.parse(options.data).qrcodeUrl);
        this.addGood(goodQrcode.goodRFId(qrcodeUrl))
      }

    },

    onUnload() {
      Object.assign(this.$data, this.$options.data())//清楚页面数据
    },

    methods: {

      addGood(goodRFId) {
        goodQrcode.scanAction.call(this, goodRFId, this.goodList.length === 0 ? 1 : 0).then(res => {

          console.log('添加商品',res)

          this.goodList = res.data.content.commodityCarts.reverse();
          this.offlineShop = res.data.content.store?res.data.content.store:{};
          console.log('res.data.content.store',res.data.content.store)
          this.shopCarTotal.totalPrice = res.data.content.amount
          this.shopCarTotal.vipAmount = res.data.content.vipAmount
        }, res => {
          if (res.data.message) {
            wx.showToast({title: res.data.message, icon: 'none'})
          }
        })
      },

      deleteGood(commodityId) {
        this.wxRequest.post.call(this, this.wxUrl.updateShoppingCartTypeExpired, {
          needToken: true,
          commodityId: commodityId,
        }).then(res => {
          console.log('删除商品',res)
          this.goodList = res.data.content.commodityCarts.reverse();
          this.shopCarTotal.totalPrice = res.data.content.amount
          this.shopCarTotal.vipAmount = res.data.content.vipAmount
        }, res => {
          if (res.data.message) {
            wx.showToast({title: res.data.message, icon: 'none'})
          }
        })
      },

      scanMRGOCode() {
        this.wxPromise.scanCode({onlyFromCamera: true}).then(res => {
          let qrcodeUrl = res.result;
          if (qrcodeUrl.startsWith(goodQrcode.path)) {
            this.addGood(goodQrcode.goodRFId(qrcodeUrl))
          } else {
            wx.showToast({
              title: '没有查询到商品信息',
              icon: 'none'
            })
          }
        })

      },

      toOperateResult(theResult) {
        wx.redirectTo({url: "/pages/operateResult/index?data=" + JSON.stringify({theResult})})
      },

      async payShopCarTryCatch(){
        try {
          await this.payShopCar()
        } catch (err) {

          wx.showToast({
            title: err.message,
            icon: 'none'
          })

          if(err.message.startsWith('支付失败')){
            //清空购物车，这里的逻辑是业务规定的，不是很好的体验
            console.log('clear shop car ---- --- -- -')
            this.goodList = []
            this.shopCarTotal.totalPrice = 0
            this.shopCarTotal.vipAmount = 0
          }


        }
      },

      async payShopCar(){


        wx.showLoading({mask:true})
        if(!(this.goodList&&this.goodList.length>0)){
          throw new Error("请扫码添加商品")
        }

        let shoppingCartIds = this.shopCarRfids(this.goodList)
        let orderId = await this.wxRequest.post.call(this, this.wxUrl.saveOrderForShoppingCart, {
          needToken: true,
          status:1,//待付款
          shoppingCartIds:shoppingCartIds,
          isSalePrice:0,//0不是会员，1是会员
          sourceType:2,//订单来源，2表示的是线下扫码购
          storeId:this.offlineShop.id
        }).then(res => {
          console.log('下订单 success', res.data)
          return res.data.content.orderId
        }, res => {
          console.log('saveOrderForShoppingCart fail', res)
          return null
        })

        if(!orderId){
          throw new Error("订单生成失败")
        }

        let wxpayData = await this.wxRequest.post.call(this, this.wxUrl.wechatPay, {
          needToken: true,
          orderId:orderId
        }).then(res => {
          console.log('支付参数 success', res.data)
          return res.data.content
        }, res => {
          console.log('wechatPay fail', res)
          return null
        })

        if(!(wxpayData&&wxpayData.paySign)){
          throw new Error("支付失败，请重新扫码购买")
        }


        let payStatus = await this.wxPromise.requestPayment(wxpayData).then(res=>{
          console.log('微信支付 success',res)
          wx.showToast({title:'支付成功'})
          this.wxNavigate.waitRedirectToage('operateResult','',1000,{theResult:'pay-success',orderId:orderId})
          return true
        },res=>{
          console.log('requestPayment fail',res)
          return false
        })

        if(!payStatus){
          throw new Error("支付失败，请重新扫码购买")
        }
      },
      shopCarRfids(goodList) {
        let rfids = '';
        for (let i = 0; i < goodList.length; i++) {
          rfids = i===0? rfids+goodList[i].idsStr: rfids+','+goodList[i].idsStr
        }
        return rfids
      },

    }
  };
</script>

<style lang="scss">
  page {
    display: flex;
    flex-direction: column;
  }

  .van-swipe-cell {
  }


</style>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .confirm-order {
    flex: 1;
    display: flex;
    flex-direction: column;

    .delete-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      /*background-color: wheat;*/
      width: rpx(148);
      image {
        @include WH(56, 56);
      }
    }
    .line-1-px {
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
      /*padding: 0 0 0 rpx(22);*/
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

      }

      .good-item {
        display: flex;
        flex-direction: column;
        .line-1-px {
          margin: rpx(2) 0 rpx(2) rpx(40);
        }
      }
    }

    .count-price {
      background-color: white;
      display: flex;
      flex-direction: column;
      margin-top: rpx(20);

      .w1 {
        margin: rpx(32) 0;
        padding: 0 rpx(30);
        display: flex;
        .t1 {
          flex: 1;
          @include FCS(#333333, 32, 40, 40);
        }
        .t2 {
          @include FCS(#333333, 32, 40, 40);
        }
      }

      .w2 {
        margin: rpx(32) 0;
        padding: 0 rpx(30);
        display: flex;
        .t1 {
          flex: 1;
          @include FCS(#333333, 32, 40, 40);
        }
        .t2 {
          @include FCS(#FF766F, 32, 40, 40);
        }

      }

      .line-1-px{
        margin-left: rpx(30);
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
    .total-price-wrapper{
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

    .slogan-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-bottom: rpx(98);
      height: rpx(98);
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
      background-color: #F9FCFB;
      padding: 0 rpx(30);
      bottom: 0;
      left: 0;
      right: 0;
      height: rpx(100);

      justify-content: center;

      .btn-scan {
        text-align: center;
        @include WH(240, 78);
        @include FCS(#37D0B3, 32, 78, 78);
        border: rpx(2) solid #37D0B3;
        border-radius: rpx(40);
        background-color: #F9FCFB;
      }

      .btn-pay {
        text-align: center;
        @include WH(240, 78);
        background-color: #37D0B3;
        @include FCS(#FFFFFF, 32, 78, 78);
        border-radius: rpx(40);
        margin-left: rpx(80);
      }
    }

  }

</style>
