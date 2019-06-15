<template>
    <div class="add-order-comment">

      <div class="comment-score-wrapper">
        <text>总体评价</text>
        <starrate></starrate>
      </div>

      <textarea placeholder-style="color:#999999;"
                maxlength='200'
                placeholder="至少14个字"></textarea>

      <div class="btn-submit" @click="payShopCarTryCatch">发表评价</div>
    </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  import starrate from '@/templates/starRate'
export default {
  config: {
    navigationBarTitleText: '评价'
  },

  components: {
    starrate
  },
  data() {
    return {
    };
  },
  mounted() {

  },

  onLoad(options) {
    console.log(options)
    console.log('怎么啦',JSON.stringify(options))
    if(JSON.stringify(options) === "{}"){
      console.log('空')
    }else{
      console.log('不为空')
    }
    console.log(this.$route)
  },
  methods: {

  }
};
</script>


<style lang="scss" scoped>
  @import "../../common/scss/base";

  .add-order-comment{
    padding: rpx(60) rpx(30) rpx(30) rpx(30);
    .comment-score-wrapper{
      display: flex;
      padding-bottom: rpx(30);
      align-items: center;
      align-content: center;
      text{
        @include FCS(#333333,32,40,40);
        margin-right: rpx(16);
      }
    }

    textarea {
      width: 100%;
      background-color: #F5F5F5;
      box-sizing: border-box;
      @include FCS(#333333, 32, 40, D);
      min-height: rpx(250);
      letter-spacing: rpx(1);
      padding: rpx(20);
    }

    .btn-submit{
      text-align: center;
      height: rpx(78);
      width: 100%;
      margin-top: rpx(112);
      background-color: #37D0B3;
      @include FCS(#FFFFFF, 32, 78, 78);
      border-radius: rpx(40);
    }
  }
</style>
