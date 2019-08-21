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

          <text class="t1">总金额</text>
          <text class="t2">￥{{shopCarTotal.totalPrice}}</text>

          <!--<text class="member-price">会员: ￥15.00</text>-->
        </div>

        <div class="line-1-px"></div>

        <template v-if="true">
          <div class="w2">
            <text class="t1">尊享会员优惠</text>
            <text class="t2">-￥{{shopCarTotal.vipAmount}}</text>
          </div>

          <div class="line-1-px" v-if="true"></div>
        </template>

        <div class="w2" @click="toPage('useCoupon')">
          <text class="t1">优惠卷</text>
          <text class="t2">-￥0.00</text>
          <image class="icon-offlineSCar-coupon-arrow" src="/static/images/icon-offlineSCar-coupon-arrow.png"></image>
        </div>


        <!--<div class="w3">-->
          <!--<text class="t1">小计：</text>-->
          <!--<text class="t2">￥{{shopCarTotal.totalPrice}}</text>-->
        <!--</div>-->
      </div>
    </div>




    <div class="slogan-wrapper">
      <!--<image class="slogan" src="/static/images/slogan.png"></image>-->
    </div>


    <div class="pay-wrapper">
      <text class="money-heji">{{shopCarTotal.currentPrice}}</text>
      <div class="btn-scan" @click="scanMRGOCode">继续扫码购</div>
      <div class="btn-pay" @click="payShopCarTryCatch">去支付</div>
    </div>

  </div>
</template>

<script>

  import ordergooditem from '@/templates/orderGoodItem'
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
          currentPrice:0,//isMember
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

      //*
      //
      //
      //
      //
      //
      //
      //
      //
      // 删掉删掉删掉删掉删掉注意以下代码要删掉的
      //
      //
      //
      //
      //
      // */
//      let qrcodeUrl = 'http://wechat.mrgo.club/mrgogood?id=190723351037813434888370';
//      this.addGood(goodQrcode.goodRFId(qrcodeUrl))

      let result = {"status":200,"message":"服务器成功返回用户请求的数据.","content":{"amount":"10.50","commodityCarts":[{"commodityId":"351450990001795072","name":"三只松鼠蟹香蚕豆三只松鼠蟹香蚕豆三只松鼠蟹香蚕豆三只松鼠蟹香蚕豆三只松鼠蟹香蚕豆三只松鼠蟹香蚕豆","secondName":null,"imgUrl":"http://image.mrgo.club/FryDQVy5NpAcD0w69KJAUev3SmvU","price":"10.50","vipPrice":"9.45","totalPrice":"10.50","vipTotalPrice":"9.45","num":1,"idList":null,"idsStr":"358693814208311296"}],"vipAmount":"9.45","store":{"id":"343807012825739264","sortId":null,"areaId":null,"userId":null,"code":null,"name":"深业U店","province":null,"city":null,"area":null,"address":"宝安区鹤洲洲石路北二路深圳U中心","longitude":null,"latitude":null,"mobile":null,"dutyPhone":null,"storeType":null,"storeLevel":null,"workTimeAm":null,"workTimePm":null,"areaSize":null,"description":null,"status":null,"createId":null,"createTime":null,"modifyId":null,"modifyTime":null,"expectedRecoveryTime":null,"purchasingCycle":null,"coefficient":null,"userName":null},"statusMessage":"服务器成功返回用户请求的数据.","statusCode":200,"isMember":true}}
      this.goodList = result.content.commodityCarts.reverse();
      this.offlineShop = result.content.store?result.content.store:{};
      this.shopCarTotal.totalPrice = result.content.amount
      this.shopCarTotal.vipAmount = result.content.vipAmount
      this.shopCarTotal.currentPrice = result.content.isMember?this.shopCarTotal.vipAmount:this.shopCarTotal.totalPrice


      //*
      //
      //
      //
      // **/
    },

    onUnload() {
      Object.assign(this.$data, this.$options.data())//清楚页面数据
    },

    methods: {

      toPage(pageUrl) {
        this.wxNavigate.navigateToPage(pageUrl)
      },
      addGood(goodRFId) {
        goodQrcode.scanAction.call(this, goodRFId, this.goodList.length === 0 ? 1 : 0).then(res => {

          console.log('添加商品',res)
          this.goodList = res.data.content.commodityCarts.reverse();
          this.offlineShop = res.data.content.store?res.data.content.store:{};
          this.shopCarTotal.totalPrice = res.data.content.amount
          this.shopCarTotal.vipAmount = res.data.content.vipAmount
          this.shopCarTotal.currentPrice = res.data.content.isMember?this.shopCarTotal.vipAmount:this.shopCarTotal.totalPrice
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
          this.shopCarTotal.currentPrice = res.data.content.isMember?this.shopCarTotal.vipAmount:this.shopCarTotal.totalPrice
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
            this.shopCarTotal.currentPrice = 0

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
        align-items: center;
        .t1 {
          flex: 1;
          @include FCS(#333333, 32, 40, 40);
        }
        .t2 {
          @include FCS(#FF766F, 32, 40, 40);
        }
        .icon-offlineSCar-coupon-arrow{
          @include WH(16,27);
          margin-left: rpx(18);
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
      bottom: 0;
      left: 0;
      right: 0;
      height: rpx(100);
      justify-content: center;

      .money-heji{
        margin: auto;
        @include FCS(#333333, 36, 42, 42);
        &:before {
          content: "合计 ￥";
          font-size: rpx(24);
        }
      }
      .btn-scan,.btn-pay{
        text-align: center;
        @include WH(200, 78);
        background-color: #37D0B3;
        @include FCS(#FFFFFF, 30, 78, 78);
        border-radius: rpx(40);
        margin-right: rpx(32);
      }

    }

  }

</style>
