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

    <div class="member-type-wrapper">

      <div class="youxiaoqi-wrapper" v-if="memberInfo.status ===1">
        <text class="title">尊享会员</text>
        <text class="time">会员有效期：{{memberInfo.startTime}} 至 {{memberInfo.endTime}}</text>
      </div>

      <div class="youxiaoqi-wrapper" v-else>
        <text class="title">请选择会员套餐</text>
      </div>

      <div class="inner-wrapper" v-if="freeMember">
        <div class="item" :class="[memberType===3?'select':'']" @click="memberType=3">
          <div class="member-type-check-wrapper">
            <image
              :src="memberType===3?'/static/images/member-type-check-on.png':'/static/images/member-type-check-off.png'"></image>
          </div>
          <text class="t1">7天体验套餐</text>
          <text class="t2">￥0.00</text>
          <text class="t3"></text>
        </div>
        <div class="item" :class="[memberType===0?'select':'']" @click="memberType=0">
          <div class="member-type-check-wrapper">
            <image
              :src="memberType===0?'/static/images/member-type-check-on.png':'/static/images/member-type-check-off.png'"></image>
          </div>
          <text class="t1">30天</text>
          <text class="t2">￥19.9</text>
          <text class="t3"></text>
        </div>

        <!--<div class="item" :class="[memberType===1?'select':'']" @click="memberType=1">-->
          <!--<div class="member-type-check-wrapper">-->
            <!--<image-->
              <!--:src="memberType===1?'/static/images/member-type-check-on.png':'/static/images/member-type-check-off.png'"></image>-->
          <!--</div>-->
          <!--<text class="t1">90天</text>-->
          <!--<text class="t2">￥55.0</text>-->
          <!--<text class="t3">￥59.9</text>-->
        <!--</div>-->
      </div>

      <div class="inner-wrapper" v-else>
        <div class="item" :class="[memberType===0?'select':'']" @click="memberType=0">
          <div class="member-type-check-wrapper">
            <image
              :src="memberType===0?'/static/images/member-type-check-on.png':'/static/images/member-type-check-off.png'"></image>
          </div>
          <text class="t1">30天</text>
          <text class="t2">￥19.9</text>
          <text class="t3"></text>
        </div>

        <!--<div class="item" :class="[memberType===1?'select':'']" @click="memberType=1">-->
          <!--<div class="member-type-check-wrapper">-->
            <!--<image-->
              <!--:src="memberType===1?'/static/images/member-type-check-on.png':'/static/images/member-type-check-off.png'"></image>-->
          <!--</div>-->
          <!--<text class="t1">90天</text>-->
          <!--<text class="t2">￥55.0</text>-->
          <!--<text class="t3">￥59.9</text>-->
        <!--</div>-->

        <!--<div class="item" :class="[memberType===2?'select':'']" @click="memberType=2">-->
          <!--<div class="member-type-check-wrapper">-->
            <!--<image-->
              <!--:src="memberType===2?'/static/images/member-type-check-on.png':'/static/images/member-type-check-off.png'"></image>-->
          <!--</div>-->
          <!--<text class="t1">360天</text>-->
          <!--<text class="t2">￥210.0</text>-->
          <!--<text class="t3">￥238.8</text>-->
        <!--</div>-->

      </div>
      <div class="btn-buy-index" hover-class="btn-buy-index-hover" @click="buyMemberTryCatch">{{memberInfo.status===1?'续费会员':'成为会员'}}</div>
    </div>


    <div class="info-wrapper">
      <div class="text-wrapper">
        <text class="title">尊享会员卡使用说明：</text>
        <text class="tttt" v-if="false">1、会仅需：
          <text style="color:#FF766F">100 元 </text>
          即可成为尊享会员。
        </text>
        <text class="tttt" v-if="false">2、年费缴费日至次年次日24:00（2019年1月1日缴费，到期日为2020年1月2日 24:00）</text>
        <text class="tttt" v-if="false">1、年费续费日期前2个月，续费的年费，以续费时候的年费价格为准</text>
        <text class="tttt">1、使用地区，仅限大陆地区</text>
        <text class="tttt">2、会员规则解释权，归本公司所有</text>
      </div>


    </div>

  </div>

  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>



  export default {
    config: {
      navigationBarTitleText: ''
    },

    data() {
      return {
        freeMember:false,
        memberType: 4,
        memberType0ID: '',
        memberType1ID: '',
        memberType2ID: '',
        memberTypeList: [],
      };
    },

    computed: {
      memberInfo() {
        return this.$store.getters.memberInfo
      }
    },

    onLoad(options) {
//      if (options && options.data) {
//        this.freeMember = JSON.parse(options.data).freeMember
//        this.memberType = 3
//      }
      if(this.memberInfo.memberRecord===0){
        console.log(this.memberInfo)
        this.freeMember = true
        this.memberType = 3
      }

      this.initPage()
      this.getMemberTypeList()
    },
    onUnload() {
      Object.assign(this.$data, this.$options.data())//清楚页面数据
    },


    mounted() {

    },
    methods: {

      initPage(){
        if(this.memberInfo.status ===1){
          wx.setNavigationBarTitle({title: '续费会员'})
        }else{
          wx.setNavigationBarTitle({title: '加入会员'})
        }

      },
      getMemberTypeList() {
        this.wxRequest.get.call(this, this.wxUrl.getMemberTypeList, {needToken: true}).then(res => {
          console.log('getMemberTypeList success', res)
          this.memberTypeList = res.data.content

          for (let i = 0; i < this.memberTypeList.length; i++) {
            if (this.memberTypeList[i].purchaseTime === 360) {
              this.memberType2ID = this.memberTypeList[i].id
            } else if (this.memberTypeList[i].purchaseTime === 90) {
              this.memberType1ID = this.memberTypeList[i].id
            } else if (this.memberTypeList[i].purchaseTime === 30) {
              this.memberType0ID = this.memberTypeList[i].id
            }
          }

        }, res => {
          console.log('getMemberTypeList fail', res)
        })
      },


      async buyMemberTryCatch() {
        try {
          await this.buyMember()
        } catch (err) {

          wx.showToast({
            title: err.message,
            icon: 'none'
          })

        }
      },

      async buyMember() {

        if(this.memberType===3){
          await this.buyFreeMember()
          return
        }
        let memberId = ''
        if (this.memberType === 0) {
          memberId = this.memberType0ID
        } else if (this.memberType === 1) {
          memberId = this.memberType1ID
        } else if (this.memberType === 2) {
          memberId = this.memberType2ID
        }
        if (!memberId) {
          throw new Error("请选择会员套餐")
        }

        wx.showLoading({mask:true})
        let wxpayData = await this.wxRequest.post.call(this, this.wxUrl.memberUserWechatPay, {
          needToken: true,
          memberId: memberId
        }).then(res => {
          console.log('memberUserWechatPay success', res)
          return res.data.content
        }, res => {
          console.log('memberUserWechatPay fail', res)
          return null
        })

        if (!(wxpayData && wxpayData.paySign)) {
          throw new Error("支付失败，请重新购买")
        }

        let payStatus = await this.wxPromise.requestPayment(wxpayData).then(res => {
          console.log('微信支付 success', res)
          wx.showToast({title: '支付成功'})
          return true
        }, res => {
          console.log('requestPayment fail', res)
          return false
        })

        if (!payStatus) {
          throw new Error("支付失败，请重新购买")
        }


//        更新会员信息
        this.memberType = 4
        this.wxRequest.get.call(this, this.wxUrl.checkLogin, {needToken: true}).then(res => {
          console.log('-----',res.data.content.member)
          this.$store.dispatch('Member', {memberInfo: res.data.content.member})
        }, res => {
        })
      },

      async buyFreeMember(){
        let buyStatus = await this.wxRequest.post.call(this, this.wxUrl.giftExperienceMember, {needToken: true}).then(res => {
          console.log('giftExperienceMember sucess',res.data.content)
          wx.showToast({title: '购买成功'})
          this.freeMember = false
          this.memberType = 4
          return true
        }, res => {
          console.log('giftExperienceMember fail',res)
          return false
        })

        if (!buyStatus) {
          throw new Error("购买失败")
        }

        this.wxRequest.get.call(this, this.wxUrl.checkLogin, {needToken: true}).then(res => {
          console.log('-----',res.data.content.member)
          this.$store.dispatch('Member', {memberInfo: res.data.content.member})
        }, res => {
        })

      }

    }
  };
</script>


<style>
  page {
    height: 100%;
  }
</style>

<style lang="scss" scoped>
  @import "../../../common/scss/base";

  .buy-vip {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    .top-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      padding: rpx(20);
      .buy-vip-banner {
        @include WH(710, 264);
      }

      .benefit-wrapper {
        display: flex;
        width: 100%;
        padding-top: rpx(46);
        padding-bottom: rpx(28);
        .item {
          display: flex;
          flex-direction: column;
          flex: 1;
          align-items: center;
          justify-content: center;
          image {
            @include WH(42, 42);
            margin-bottom: rpx(28);

          }
          text {
            @include FCS(#777777, 24, 32, 32);
          }
        }
      }
    }

    .member-type-wrapper {
      margin-top: rpx(20);
      background-color: white;
      width: 100%;
      box-sizing: border-box;
      padding: rpx(30) rpx(50) 0 rpx(50);
      .youxiaoqi-wrapper {
        display: flex;
        flex-direction: column;
        .title {
          @include FCS(#666666, 24, 32, 32);
        }
        .time {
          margin-top: rpx(12);
          @include FCS(#999999, 24, 32, 32);
        }
      }

      .inner-wrapper {
        margin-top: rpx(32);
        display: flex;
        /*justify-content: space-between;*/

        .item {
          @include WH(200, 180);
          background-color: #F5F5F5;
          display: flex;
          flex-direction: column;
          border-radius: rpx(10);
          align-items: center;
          margin-right: rpx(20);
          .member-type-check-wrapper {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            image {
              @include WH(27, 27);
              margin: rpx(10) rpx(10) rpx(16) rpx(10);
            }
          }
          .t1 {
            @include FCS(#777777, 26, 34, 34);
          }
          .t2 {
            margin-top: rpx(2);
            @include FCS(#666666, 30, 38, 38);
          }
          .t3 {
            text-decoration: line-through;
            margin-top: rpx(2);
            @include FCS(#999999, 24, 32, 32);
          }

          &.select {
            background: linear-gradient(66deg, rgba(255, 248, 232, 1), rgba(251, 236, 195, 1));
            .t1, .t2 {
              color: #99704E;
            }
          }
        }
      }

      .btn-buy-index {
        display: flex;
        justify-content: center;
        text-align: center;
        @include FCS(#99704E, 36, 98, D);
        @include WH(580, 98);
        background: linear-gradient(66deg, rgba(251, 221, 155, 1), rgba(245, 215, 132, 1));
        box-shadow: 0 0 rpx(9) 0 rgba(12, 78, 66, 0.28);
        border-radius: rpx(50);
        margin-top: rpx(50);
        margin-left: rpx(35);
        margin-bottom: rpx(10);
      }

      .btn-buy-index-hover{
        box-shadow: none;
      }

    }

    .info-wrapper {
      flex: 1;
      display: flex;
      width: 100%;
      box-sizing: border-box;
      flex-direction: column;
      background-color: white;
      align-items: center;
      padding: rpx(50) rpx(40) 0 rpx(40);
      .text-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
        .title {
          @include FCS(#333333, 32, 40, 40);
          margin-bottom: rpx(10);
        }
        .tttt {
          @include FCS(#666666, 26, 46, D);
        }
      }

    }

  }

</style>
