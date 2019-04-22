<template>
  <div class="buy-vip">
    <div class="top-wrapper">
      <image class="buy-vip-banner" src="/static/images/buy-vip-banner.png"></image>

      <div class="benefit-wrapper">
        <div class="item">
          <image src="/static/images/buy-vip-jifen.png"></image>
          <text>双倍积分</text>
        </div>
        <div class="item">
          <image src="/static/images/buy-vip-libao.png"></image>
          <text>年费礼包</text>
        </div>
        <div class="item">
          <image src="/static/images/buy-vip-buqingling.png"></image>
          <text>积分不清零</text>
        </div>
        <div class="item">
          <image src="/static/images/buy-vip-zhekou.png"></image>
          <text>特约折扣</text>
        </div>
      </div>
    </div>

    <div class="info-wrapper">
      <div class="text-wrapper">
        <text class="title">尊享会员卡使用说明：</text>
        <text class="tttt">1、会仅需：<text style="color:#FF766F">100 元 </text>即可成为尊享会员。</text>
        <text class="tttt">2、年费缴费日至次年次日24:00（2019年1月1日缴费，到期日为2020年1月2日 24:00）</text>
        <text class="tttt">3、年费续费日期前2个月，续费的年费，以续费时候的年费价格为准</text>
        <text class="tttt">4、使用地区，仅限大陆地区</text>
        <text class="tttt">5、次会员规则解释权，归本公司所有</text>
      </div>


      <div class="btn-buy-index">成为会员</div>
    </div>

  </div>

  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  import mytabbar from '@/components/myTabBar'

  export default {
    config: {
      navigationBarTitleText: '加入会员'
    },

    components: {
      mytabbar
    },
    data() {
      return {};
    },
    mounted() {

    },

    methods: {}
  };
</script>


<style>
  page {
    height: 100%;
  }
</style>

<style lang="scss" scoped>
  @import "../../common/scss/base";

  .buy-vip{
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    .top-wrapper{
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      padding: rpx(20);
      .buy-vip-banner{
        @include WH(710,264);
      }

      .benefit-wrapper{
        display: flex;
        width:100%;
        padding-top: rpx(46);
        padding-bottom: rpx(28);
        .item{
          display: flex;
          flex-direction: column;
          flex:1;
          align-items: center;
          justify-content: center;
          image{
            @include WH(42,42);
            margin-bottom: rpx(28);

          }
          text{
            @include FCS(#777777,24,32,32);
          }
        }
      }
    }

    .info-wrapper{
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-top: rpx(20);
      background-color: white;
      align-items: center;
      padding:rpx(50) rpx(40) 0 rpx(40);
      .text-wrapper{
        display: flex;
        flex-direction: column;
        flex: 1;
        .title{
          @include FCS(#333333,32,40,40);
          margin-bottom: rpx(10);
        }
        .tttt{
          @include FCS(#666666,26,46,D);
        }
      }

      .btn-buy-index{
        display: flex;
        justify-content: center;
        margin-bottom: rpx(20);
        text-align: center;
        @include FCS(#99704E,36,98,D);
        @include WH(580,98);
        background:linear-gradient(66deg,rgba(251,221,155,1),rgba(245,215,132,1));
        box-shadow:0 0 rpx(9) 0 rgba(12,78,66,0.28);
        border-radius:rpx(50);
      }
    }

  }

</style>
