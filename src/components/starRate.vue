<template>
  <div class="wrapper-star-rate">
    <image class="icon-star" :src="starValue>=1?'/static/images/store-star-fill.png':'/static/images/store-star-kong.png'" @click="clickStar(1)"></image>
    <image class="icon-star" :src="starValue>=2?'/static/images/store-star-fill.png':'/static/images/store-star-kong.png'" @click="clickStar(2)"></image>
    <image class="icon-star" :src="starValue>=3?'/static/images/store-star-fill.png':'/static/images/store-star-kong.png'" @click="clickStar(3)"></image>
    <image class="icon-star" :src="starValue>=4?'/static/images/store-star-fill.png':'/static/images/store-star-kong.png'" @click="clickStar(4)"></image>
    <image class="icon-star" :src="starValue>=5?'/static/images/store-star-fill.png':'/static/images/store-star-kong.png'" @click="clickStar(5)"></image>
  </div>
</template>

<script>
  export default {
    props: {
      starValue:{
        default:2
      }
    },
    data() {
      return {
      }
    },

    methods:{
      clickStar(val){
        this.starValue = val
        this.$emit('clickStar',{starType:this.starType,starValue:val})
      }
    },

  }
</script>

<style lang="scss" scoped>
  @import "../common/scss/base";

  .wrapper-star-rate{
    .icon-star{
      @include WH(32,32);
      padding:rpx(4);
    }
  }
</style>
