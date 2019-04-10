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

          <i-swipeout  i-class="ordergooditem-swipeout" :operateWidth="swipeLeftPx" >
            <view slot="content">
              <ordergooditem :goodInfo="good"></ordergooditem>
            </view>
            <view slot="button" class="delete-wrapper" >
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
      <!--<image class="slogan" src="/static/images/slogan.png"></image>-->
    </div>


    <div class="pay-wrapper">
      <text class="money">￥5.00</text>
      <div class="btn-scan" @click="scanMRGOCode">继续扫码购</div>
      <div class="btn-pay" @click="toOperateResult('pay-success')">去支付</div>
    </div>

  </div>
</template>

<script>

  import ordergooditem from '@/components/orderGoodItem'
//  import vantswipecell from '@/components/vant/swipe-cell'
  import {goodQrcode} from '@/utils/scanQrcode'

//  import pageFactory from 'mpvue-page-factory'
//  // import App from './index'
//  Page(pageFactory(this))


  export default {
    config: {
      navigationBarTitleText: 'MR.GO 订单确认',
    },
    components: {
      ordergooditem
    },
    data() {
      return {
        swipeLeftRpx:148,
        swipeLeftPx:0,
        message: '订单确认',
        qrcodeUrl:'',
        goodId:'',
        goodList:[],
        actions : [
          {
            name : '删除',
            color : '#fff',
            fontsize : '20',
            width : 100,
            icon : 'trash',
            background : '#ed3f14'
          },
          {
            name : '返回',
            width : 100,
            color : '#80848f',
            fontsize : '20',
            icon : 'undo'
          }
        ]
      };
    },
    mounted() {

    },
    onLoad(options) {
      Object.assign(this.$data, this.$options.data())//清楚初始页面数据
      if (options && options.data) {
        this.qrcodeUrl = decodeURIComponent(JSON.parse(options.data).qrcodeUrl)
        this.goodId = goodQrcode.goodId(this.qrcodeUrl)
        console.log('this.goodId',this.goodId)
        this.addGood(this.goodId)
      }

      this.swipeLeftPx = this.wxUtil.rpx2px(this.swipeLeftRpx)
      console.log('this.swipeLeftPx ',this.swipeLeftPx )
    },

    methods: {
      addGood(goodId){
        goodQrcode.scanAction.call(this, goodId).then(res=>{
          let good = res.data.content
          this.goodList.push(good)
//          console.log('goodQrcode success',res.data.content)
        },res=>{
//          console.log('goodQrcode fail',res)
        })
      },

      scanMRGOCode() {
        this.wxPromise.scanCode({onlyFromCamera: true}).then(res => {
          let qrcodeUrl = res.result
          if (qrcodeUrl.startsWith(goodQrcode.path)) {
            let goodId = goodQrcode.goodId(qrcodeUrl)
            this.addGood(goodId)
          } else {
            wx.showToast({
              title: '没有找到对应的商品',
              icon: 'none'
            })
          }

        })

      },

      toOperateResult(theResult){
        wx.redirectTo({url: "/pages/operateResult/index?data=" + JSON.stringify({theResult})})
      },
    }
  };
</script>

<style lang="scss">
  page {
    display: flex;
    flex-direction: column;
  }

  .van-swipe-cell{
  }



</style>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .confirm-order {
    flex: 1;
    display: flex;
    flex-direction: column;

    .delete-wrapper{
      position: absolute;
      top:0;
      left: 0;
      bottom:0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      /*background-color: wheat;*/
      width: rpx(148);
      image{
        @include WH(56,56);
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

      .good-item{
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
      .money{
        flex:1;
        @include FCS(#FF766F,32,40,40);
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
