<template>
  <div class="my-coupon">

    <div class="myCouponItem-wrapper" v-for="(coupon,index) in myCouponList" :key="index">
      <myCouponItem :couponInfo="coupon"></myCouponItem>
    </div>
  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>
  import myCouponItem from '@/templates/myCouponItem'

  export default {
    config: {
      navigationBarTitleText: '我的优惠券'
    },

    components: {
      myCouponItem
    },
    data() {
      return {
        myCouponList:[]
      };
    },
    mounted() {

    },
    onLoad(options) {


      this.updateCouponList()
    },

    onUnload() {
      Object.assign(this.$data, this.$options.data())//清楚页面数据
    },

    methods: {
      updateCouponList(){
        this.wxRequest.get.call(this, this.wxUrl.getCouponList, {needToken: true,pageNum:1,pageSize:100}).then(res => {

          console.log('getCouponList',res.data.content)
          this.myCouponList = res.data.content.list
        }, res => {
        }).catch(err => {
          console.log(err)
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";
  .my-coupon{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: rpx(40);
    .myCouponItem-wrapper{
      margin-bottom: rpx(20);
    }

  }
</style>
