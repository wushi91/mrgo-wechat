<template>
  <div class="use-coupon">

    <div class="coupon-use-tab-wrapper">

      <div class="item" :class="canUseTab?'select':''" @click="canUseTab=true">
        <text>可使用</text>
        <div class="bottom-line"></div>
      </div>
      <div class="item" :class="canUseTab?'':'select'" @click="canUseTab=false">
        <text>不可用</text>
        <div class="bottom-line"></div>
      </div>
    </div>

    <div class="useCouponItem-list" v-if="canUseTab">

      <div class="useCouponItem-wrapper" v-for="(coupon,index) in canUseCouponList" :key="index">
        <useCouponItem :couponInfo="coupon" @useCouponItemClick="handleUseCouponItemClick"></useCouponItem>
      </div>

    </div>

    <div class="useCouponItem-list" v-else>

      <div class="useCouponItem-wrapper" v-for="(coupon,index) in canNoUseCouponList" :key="index">
        <useCouponItem :couponInfo="coupon"></useCouponItem>
      </div>

    </div>


    <div class="bottom-wrapper" v-if="canUseTab">
      <text>已选：0张  优惠：0元</text>
      <div class="btn-comfirm" @click="wxNavigate.goBack">确定</div>
    </div>
  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  import useCouponItem from '@/templates/useCouponItem'

  export default {
    config: {
      navigationBarTitleText: '领取优惠券'
    },

    components: {
      useCouponItem
    },
    data() {
      return {
        canUseTab:true,
        canUseCouponList:[{id:'1',canUse:true,select:false},{id:'2',canUse:true,select:false},{id:'3',canUse:true,select:false},{id:'4',canUse:true,select:false}],
        canNoUseCouponList:[{canUse:false,reason:'未满100'},{canUse:false,reason:'未满50'},{canUse:false,reason:'未满10',}],

      };
    },
    mounted() {

    },
    onUnload() {
      Object.assign(this.$data, this.$options.data())//清楚页面数据
    },

    methods: {
      handleUseCouponItemClick({couponInfo}){
        console.log('handleUseCouponItemClick',couponInfo)
        if (couponInfo.canUse){
          for(let item of this.canUseCouponList){
            if(couponInfo.id === item.id){
//              item.select = true
              item.select = !item.select
            }else{
              item.select =false
            }
          }
        }else{
          wx.showToast({
            title: '该优惠券不可用：'+couponInfo.reason,
            icon: 'none'
          });
        }

      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";
  .use-coupon{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: rpx(110) 0 rpx(100) 0;

    .coupon-use-tab-wrapper{
      display: flex;
      background-color: white;
      width: 100%;
      position: fixed;
      top:0;
      .item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: rpx(160);
        text{
          @include FCS(#666666,32,70,70);
        }
        .bottom-line{
          @include WH(100,4);
          border-radius: rpx(2);
          background-color: transparent;
        }

        &.select{
          text{
            @include FCS(#37D0B3,32,70,70);
          }
          .bottom-line{
            background-color: #37D0B3;
          }

        }

      }

    }
    .useCouponItem-wrapper{
      margin-bottom: rpx(20);
    }

    .bottom-wrapper{
      display: flex;
      width: 100%;
      position: fixed;
      bottom:0;
      background-color: white;
      height: rpx(100);
      align-items: center;
      text{
        flex:1;
        @include FCS(#666666,32,100,100);
        margin: 0 rpx(30);
      }
      .btn-comfirm{
        text-align: center;
        @include FCS(#FFFFFF,36,80,80);
        @include WH(200,80);
        border-radius: rpx(40);
        background-color: #37D0B3;
        margin-right: rpx(30);
      }
    }

  }
</style>
