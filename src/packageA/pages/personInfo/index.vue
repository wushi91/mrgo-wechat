<template>
  <div class="person-info">
    <div class="item avater-item">
      <image class="avater" :src="userInfo.imageUrl"></image>
      <text class="title"></text>
      <image class="arrow" src="/static/images/menu-arrow.png"></image>
    </div>

    <div class="line-1-px"></div>

    <div class="item">
      <text class="title">昵称</text>
      <text class="content">{{userInfo.nickname}}</text>
      <image class="arrow" src="/static/images/menu-arrow.png"></image>
    </div>

    <div class="line-1-px"></div>

    <div class="item">
      <text class="title">性别</text>
      <text class="content">{{userInfo.sex==1?'男':userInfo.sex==2?'女':'未知'}}</text>
      <image class="arrow" src="/static/images/menu-arrow.png"></image>
    </div>

    <div class="line-1-px"></div>

    <div class="item">
      <text class="title">手机号</text>
      <text class="content">{{userInfo.mobile}}</text>
      <image class="arrow" src="/static/images/menu-arrow.png"></image>
    </div>

    <div class="line-1-px"></div>

    <div class="item">
      <text class="title">国籍</text>
      <text class="content">{{userInfo.nationality}}</text>
      <image class="arrow" src="/static/images/menu-arrow.png"></image>
    </div>

    <div class="line-1-px"></div>

    <div class="item">
      <text class="title">省份</text>
      <text class="content">{{userInfo.province}}</text>
      <image class="arrow" src="/static/images/menu-arrow.png"></image>
    </div>

    <div class="line-1-px"></div>

    <div class="item">
      <text class="title">城市</text>
      <text class="content">{{userInfo.cities}}</text>
      <image class="arrow" src="/static/images/menu-arrow.png"></image>
    </div>

    <div class="line-1-px"></div>


  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>


  export default {
    config: {
      navigationBarTitleText: '我的信息'
    },

    data() {
      return {};
    },

    computed: {
      userInfo() {
        console.log(this.$store.getters.userInfo)
        return this.$store.getters.userInfo
      }
    },
    mounted() {

    },

    methods: {}
  };
</script>

<style>
  page {
    background-color: #FFFFFF;
    height: 100%;
  }
</style>

<style lang="scss" scoped>
  @import "../../../common/scss/base";

  .person-info{
    display: flex;
    flex-direction: column;

    .item{
      padding: rpx(35) rpx(30) rpx(35) rpx(35);
      display: flex;
      align-items: center;
      .title{
        @include FCS(#999999,32,40,40);
        flex:1;
      }
      .content{
        @include FCS(#666666,32,40,40);
        margin-right: rpx(25);
      }
      .avater{
        border-radius: 50%;
        @include WH(98,98);
      }
      .arrow{
        @include WH(16, 27);
        flex-shrink: 0;
      }

      &.avater-item{
        padding: rpx(28) rpx(30) rpx(20) rpx(30);
      }
    }

    .line-1-px{
      margin-left: rpx(30);
    }
  }
</style>
