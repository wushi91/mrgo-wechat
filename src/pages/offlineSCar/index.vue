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

      <!--<i-swipeout  i-class="ordergooditem-swipeout" :actions="actions">-->
      <!--<view slot="content">-->
      <!--<ordergooditem></ordergooditem>-->
      <!--</view>-->
      <!--</i-swipeout>-->

      <!--<div style="background-color: white">-->
      <!--<view slot="content">-->
      <!--<ordergooditem></ordergooditem>-->
      <!--</view>-->
      <!--</div>-->


      <div class="good-list">

        <div v-for="(good,index) in goodList" :key="index" class="good-item">

          <!--<van-swipe-cell :right-width="swipeLeftPx">-->
          <!--<ordergooditem :goodInfo="good"></ordergooditem>-->
          <!--<div slot="right" class="delete-wrapper" >-->
          <!--<image src="/static/images/icon-shanchu.png"></image>-->
          <!--</div>-->
          <!--</van-swipe-cell>-->

          <i-swipeout i-class="ordergooditem-swipeout" :operateWidth="swipeLeftPx">
            <view slot="content">
              <ordergooditem :goodInfo="good"></ordergooditem>
            </view>
            <view slot="button" class="delete-wrapper" @click="deleteGood(index)">
              <image src="/static/images/icon-shanchu.png"></image>
            </view>
          </i-swipeout>
          <div class="line-1-px" v-if="index<goodList.length-1"></div>
        </div>


      </div>

      <div class="count-price">
        <div class="w1">
          <div class="original-price">
            <text class="t1">商品总金额</text>
            <text class="t2">￥{{shopCarTotal.totalPrice}}</text>
          </div>

          <!--<text class="member-price">会员: ￥15.00</text>-->
        </div>

        <div class="line-1-px"></div>

        <template v-if="false">
          <div class="w2">
            <text class="t1">优惠卷</text>
            <text class="t2">已减￥1.00</text>
          </div>

          <div class="line-1-px"></div>
        </template>

        <div class="w3">
          <text class="t1">小计：</text>
          <text class="t2">￥{{shopCarTotal.totalPrice}}</text>
        </div>
      </div>
    </div>


    <div class="slogan-wrapper">
      <!--<image class="slogan" src="/static/images/slogan.png"></image>-->
    </div>


    <div class="pay-wrapper">
      <text class="money">￥{{shopCarTotal.totalPrice}}</text>
      <div class="btn-scan" @click="scanMRGOCode">继续扫码购</div>
      <!--<div class="btn-scan" @click="shopCarFrids">继续扫码购</div>-->
      <!--<div class="btn-pay" @click="toOperateResult('pay-success')">去支付</div>-->
      <div class="btn-pay" @click="shopCarFrids">去支付</div>
    </div>

  </div>
</template>

<script>

  import ordergooditem from '@/components/orderGoodItem'
  import {goodQrcode} from '@/utils/scanQrcode'


  export default {
    config: {
      navigationBarTitleText: 'MR.GO 订单确认',
    },
    components: {
      ordergooditem
    },
    computed: {
      shopCarTotal() {

        let totalPrice = 0
        let totalCount = 0

        for (let i = 0; i < this.goodList.length; i++) {
          totalPrice = totalPrice + (this.goodList[i].price * this.goodList[i].count)
          totalCount = totalCount + this.goodList[i].count
        }

        return {
          totalPrice: totalPrice.toFixed(2),
          totalCount: totalCount
        }
      }
    },
    data() {
      return {
        swipeLeftRpx: 148,
        swipeLeftPx: 0,

        qrcodeUrl: '',
        goodRFId: '',

        offlineShop: {},
        goodList: [],
      };
    },
    mounted() {

    },
    onLoad(options) {
      Object.assign(this.$data, this.$options.data())//清楚初始页面数据
      this.swipeLeftPx = this.wxUtil.rpx2px(this.swipeLeftRpx)
      if (options && options.data) {
        this.qrcodeUrl = decodeURIComponent(JSON.parse(options.data).qrcodeUrl)
        this.goodRFId = goodQrcode.goodRFId(this.qrcodeUrl)
        this.addGood(this.goodRFId)
      }

    },


    methods: {
      addGood(goodRFId) {
        goodQrcode.scanAction.call(this, goodRFId).then(res => {
          console.log('goodQrcode success', res.data)
          this.shopCarManage(this.goodList,res.data.content.commodity)
          this.offlineShop = res.data.content.store
        }, res => {
          console.log('goodQrcode fail', res)
          if (res.data.message) {
            wx.showToast({title: res.data.message, icon: 'none'})
          }
        })
      },

      deleteGood(index) {
        this.goodList.splice(index, 1)
        console.log('delete good', index)
      },

      scanMRGOCode() {
        this.wxPromise.scanCode({onlyFromCamera: true}).then(res => {
          let qrcodeUrl = res.result
          if (qrcodeUrl.startsWith(goodQrcode.path)) {
            let goodRFId = goodQrcode.goodRFId(qrcodeUrl)
            this.addGood(goodRFId)
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

      shopCarManage(goodList,good){

        /**
         * 购物车管理解决的3个问题
         * 1.该商品已经支付，不加入购物车
         * 2.该商品已经添加到购物车，不要重复添加，通过rfid唯一值判断
         * 3.添加同一类商品，做数量增加，记得要同时加入该物品的rfid
         * */
        {
          good.count = 1 //购物车有商品计数功能
          good.rfids = [good.rfid] //增加一个新的属性rfids，数组类型
          good.price = good.price.toFixed(2)//价格保留小数点后两位
        }


        if (good.status === 1) {//支付了的商品就提示已经支付，不加入购物车
          wx.showToast({title: '该商品已经支付', icon: 'none'})
          return
        }

        for (let i = 0; i < goodList.length; i++) {//rfid一致，扫描的是同一个商品
          for (let j = 0; j < goodList[i].rfids.length; j++) {
            if (goodList[i].rfids[j] === good.rfid) {
              wx.showToast({title: '该商品已经添加到购物车', icon: 'none'})
              return
            }
          }
        }

        for (let i = 0; i < goodList.length; i++) {//id一致，同一个商品的做数量的叠加
          if (goodList[i].id === good.id) {
            goodList[i].count++
            goodList[i].rfids.push(good.rfid)
            return
          }
        }
        goodList.push(good)//全新的商品
      },

      shopCarFrids(){
        let frids = []
        for(let i= 0;i<this.goodList.length;i++){
          frids = frids.concat(this.goodList[i].rfids)
        }
        return frids
      }
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
      background-color: #F5F5F5;
      padding: 0 rpx(30);
      bottom: 0;
      left: 0;
      right: 0;
      height: rpx(98);
      align-items: center;
      justify-content: center;
      .money {
        flex: 1;
        @include FCS(#FF766F, 32, 40, 40);
      }
      .btn-scan {
        text-align: center;
        @include WH(240, 78);
        @include FCS(#37D0B3, 32, 78, 78);
        border: rpx(2) solid #37D0B3;
        border-radius: rpx(40);
        background-color: #F5F5F5;
      }

      .btn-pay {
        text-align: center;
        @include WH(240, 78);
        background-color: #37D0B3;
        @include FCS(#FFFFFF, 32, 78, 78);
        border-radius: rpx(40);
        margin-left: rpx(20);
      }
    }

  }

</style>
