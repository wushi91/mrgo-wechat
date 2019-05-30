<template>
  <div class="member-card" @click="toBuyVipPage">

    <div class="inner-wrapper vip" v-if="cardInfo.status===1" >
      <image class="bg" src="/static/images/member-card-vip-bg.png"></image>
      <div class="info">
        <image class="member-card-title" src="/static/images/member-card-vip-title.png"></image>
        <div class="center">
          <div class="image-wrapper">
            <image class="member-card-normal-text1" src="/static/images/member-card-vip-text1.png"></image>
            <image class="member-card-normal-text2" src="/static/images/member-card-vip-text2.png"></image>
          </div>

          <text class="card-time">{{cardInfo.endTime?cardInfo.endTime:''}}到期</text>
        </div>
        <text class="number">{{cardNumber}}</text>
      </div>
    </div>

    <div class="inner-wrapper normal" v-else>
      <image class="bg" src="/static/images/member-card-normal-bg.png"></image>
      <div class="info">
        <image class="member-card-title" src="/static/images/member-card-normal-title.png"></image>
        <div class="center">
          <image class="member-card-normal-text" src="/static/images/member-card-normal-text.png"></image>

        </div>
        <text class="number">{{cardNumber}}</text>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    props: ['cardInfo'],
    data() {
      return {
      }
    },

    computed:{
      cardNumber(){
        if(this.cardInfo&&this.cardInfo.id){
          return this.cardInfo.id.replace(/(.{4})/g, "$1 ")
        }else{
          return ''
        }

      }

    },

    methods: {
      toBuyVipPage(){
        this.wxNavigate.navigateToPackageAPage('buyVIP')
      }
    },


  }

</script>

<style lang="scss" scoped>
  @import "../common/scss/base";
  .member-card{
    .inner-wrapper{
      @include WH(710, 318);
      position: relative;

      .bg{
        @include WH(710, 318);
        /*box-shadow:rpx(2) rpx(2) rpx(4) 0 rgba(204,204,204,0.5);*/

      }
      .info{
        position: absolute;
        top:0;
        left:0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        padding: rpx(20) rpx(30) rpx(24) rpx(30);
        .member-card-title{
          @include WH(241,28);
        }
        .center{
          flex:1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          .member-card-normal-text{
            @include WH(143,34);
          }
          .member-card-normal-text1{
            @include WH(97,53);
            margin-left: rpx(38);
            margin-right: rpx(26);
          }
          .member-card-normal-text2{
            @include WH(143,34);
          }
          .card-time{
            position: absolute;
            top:rpx(130);
            left:rpx(160);
            @include FCS(#B68D6A, 24, 40, 40);
          }
        }

      }
    }
    .normal{
      .info{
        .number{
          @include FCS(white, 32, 40, 40);
        }
      }
    }

    .vip{
      .info{
        .number{
          @include FCS(#99704E, 32, 40, 40);
        }
      }
    }
  }


</style>
