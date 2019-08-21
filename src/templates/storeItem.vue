<template>
  <div class="store-item">
    <!--<image class="icon-store-item-select" src="/static/images/icon-store-item-select.png"></image>-->
    <div style="display:flex;flex-direction:column;flex: 1;">
      <text class="store-name">{{storeInfo.name}}</text>
      <div style="display: flex;align-items: center;">
        <image class="icon-store-item-location" src="/static/images/icon-store-item-location.png"></image>
        <text class="store-address">{{storeInfo.address?storeInfo.address:''}}</text>
      </div>
    </div>
    <div>
      <!--<text class="store-juli">1.2km</text>-->
    </div>

  </div>
</template>

<script>


  /**
   * 领取优惠券的状态 1：可领取 2：已领取 3：领取完
   */
  export default {

    props: {
      storeInfo:{
        type:Object,
        default:{}
      },
    },
    data() {
      return {

      }
    },

    computed: {},

    created() {

    },
    methods: {


      orderItemClick() {
//        this.$emit('orderItemClick', {name: ''})
      },



    },
  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";

  .store-item{
    display: flex;
    padding:rpx(35);
    align-items: center;
    .store-name{
      @include FCS(#333333,32,40,40);
      margin-bottom: rpx(14);
    }
    .store-address{
      @include FCS(#666666,24,32,32);
      font-weight: 400;
    }
    .store-juli{
      @include FCS(#666666,24,32,32);
      font-weight: 400;
    }
    .icon-store-item-location{
      @include WH(24,27);
      margin-right: rpx(8);
      flex-shrink: 0;
    }
    .icon-store-item-select{
      @include WH(30,21);
      margin-right: rpx(20);
    }
  }
</style>
