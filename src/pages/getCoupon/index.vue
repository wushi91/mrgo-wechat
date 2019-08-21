<template>
  <div class="get-coupon">

    <div class="getCouponItem-wrapper" v-for="(coupon,index) in receiveCouponList" :key="index">
      <getCouponItem :couponInfo="coupon" @receiveCoupon="receiveCoupon"></getCouponItem>
    </div>


  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  import getCouponItem from '@/templates/getCouponItem'

  export default {
    config: {
      navigationBarTitleText: '领取优惠券'
    },

    components: {
      getCouponItem
    },
    data() {
      return {
        receiveCouponList: [],
        surplusTimeInterval: null,
      };
    },

    onLoad(options) {

      this.clearSurplusTimeInterval()
      this.surplusTimeInterval = setInterval(() => {
        this.freshCouponSurplusTime(this.receiveCouponList)
      }, 1000)

      this.updateCouponList()
    },

    onUnload() {

      this.clearSurplusTimeInterval()
      Object.assign(this.$data, this.$options.data())//清楚页面数据
    },
    mounted() {

    },

    methods: {

      clearSurplusTimeInterval() {
        if (this.surplusTimeInterval) {//清除定时器
          clearInterval(this.surplusTimeInterval)
        }
      },

      receiveCoupon(v){
        this.wxRequest.post.call(this, this.wxUrl.couponReceive, {needToken: true,couponId:v.couponId}).then(res => {
          console.log('v.couponId couponReceive res',res)
          if(res.data.status===200){
            wx.showToast({
              title: '领取成功'
            });
            this.updateCouponList()
          }

        }, res => {
        }).catch(err => {
          console.log(err)
        })
      },

      updateCouponList(){
        this.wxRequest.get.call(this, this.wxUrl.couponReceiveList, {needToken: true,pageNum:1,pageSize:100}).then(res => {
//          res.data.content.list.map((item)=>{
//            item.endTime = '2019/08/14 14:56:00'
//          })
          this.freshCouponSurplusTime(res.data.content.list)
        }, res => {
        }).catch(err => {
          console.log(err)
        })
      },
      freshCouponSurplusTime(receiveCouponList) {
        let _receiveCouponList = [].concat(receiveCouponList)
        if (_receiveCouponList.length > 0) {
          _receiveCouponList.map((coupon) => {

            coupon.endTime = coupon.endTime.split('-').join('/')
            let endTimeStamp = new Date(coupon.endTime).getTime()
            let nowTimeStamp = new Date().getTime()

            if(coupon.receiveStatus === 1&&coupon.surplusQuantity<=0){//未领取的优惠券，剩余数量为0，即被领完
              coupon.receiveStatus = 3 //被领完
            }else if(coupon.receiveStatus === 1 && nowTimeStamp > endTimeStamp){
              coupon.surplusTime = '已结束'
              coupon.receiveStatus = 4 //活动已经结束
            }else {
              let surplusTimeStamp = endTimeStamp - nowTimeStamp
              coupon.surplusTime = this.computeSurplusTime(parseInt(surplusTimeStamp/1000))
            }

          })
        }

        this.receiveCouponList = _receiveCouponList

      },

      computeSurplusTime(surplusTime) {
        let hours = parseInt(surplusTime / (60 * 60))//60分*60秒
        let minutes = parseInt(surplusTime % (60 * 60) / (60))//余数为剩下的分
        let seconds = parseInt(surplusTime % (60 * 60) % (60))//
        return [hours, minutes, seconds].map(this.formatNumber).join(':')
      },
      formatNumber(n) {
        let i = parseInt(n)//取整数
        const str = i.toString()
        return str[1] ? str : `0${str}`
      }
    }
  };
</script>


<style lang="scss" scoped>
  @import "../../common/scss/base";

  .get-coupon {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: rpx(40);
    .getCouponItem-wrapper {
      margin-bottom: rpx(20);
    }

  }
</style>
