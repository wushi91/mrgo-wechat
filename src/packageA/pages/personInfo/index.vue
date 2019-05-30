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


    <template v-if="userInfo.mobile==='13822542317'">

      <div class="item" >
        <text class="title">连接主机</text>
        <text class="content">{{host}}</text>
        <image class="arrow" src="/static/images/menu-arrow.png"></image>
      </div>

      <div class="line-1-px"></div>

      <div class="item" >
        <text class="title">审核版本号</text>
        <text class="content">{{reviewVersion}}</text>
        <image class="arrow" src="/static/images/menu-arrow.png"></image>
      </div>

      <div class="line-1-px"></div>

      <div class="item">
        <text class="title">是否展示体验账号</text>
        <text class="content">{{reviewVersion===onlineReviewVersion?"是":"否"}}</text>
        <image class="arrow" src="/static/images/menu-arrow.png"></image>
      </div>

      <div class="line-1-px"></div>


      <div class="item" @click="setMiniAppVersionActionCofirm(reviewVersion===onlineReviewVersion?'关闭体验账号':'开启体验账号',reviewVersion)">
        <text class="title">{{reviewVersion===onlineReviewVersion?"关闭体验账号":"开启体验账号"}}</text>
        <text class="content"></text>
        <image class="arrow" src="/static/images/menu-arrow.png"></image>
      </div>

      <div class="line-1-px"></div>






      <!--<div class="item">-->
      <!--<text class="title">线上审核版本号</text>-->
      <!--<text class="content">{{onlineReviewVersion}}</text>-->
      <!--<image class="arrow" src="/static/images/menu-arrow.png"></image>-->
      <!--</div>-->

      <!--<div class="line-1-px"></div>-->
    </template>

  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>


  export default {
    config: {
      navigationBarTitleText: '我的信息'
    },

    data() {
      return {
        reviewVersion:this.wxConfig.reviewVersion,
        onlineReviewVersion:'',
        host:this.wxConfig.host,
      };
    },

    onLoad(){
      this.getMiniAppVersion()
    },
    computed: {
      userInfo() {
        return this.$store.getters.userInfo
      }
    },
    mounted() {

    },

    methods: {

      getMiniAppVersion(){
        console.log('getMiniAppVersion')
        this.wxRequest.get.call(this, this.wxUrl.getMiniAppVersion).then(res => {
          console.log('onlineReviewVersion success',res)
          this.onlineReviewVersion = res.data.content.version?res.data.content.version:'无'

        }, res => {
          console.log('onlineReviewVersion fail',res)
        })
      },

      setMiniAppVersion(version){

        this.wxRequest.post.call(this, this.wxUrl.postMiniAppVersion,{needToken:true,version:version}).then(res => {
          console.log('postMiniAppVersion success',res)
          this.getMiniAppVersion()
        }, res => {
          console.log('postMiniAppVersion fail',res)
        })
      },

      setMiniAppVersionActionCofirm(title,version){

        console.log('setMiniAppVersionActionCofirm this.reviewVersion',version)

        let dialogContent = ''
        if(title === '关闭体验账号'){
          dialogContent = '审核通过，清空线上版本号'
          version = '无'
        }else if(title === '开启体验账号'){
          dialogContent = '开启审核，设置审核版本号为'+version
        }

        wx.showModal({
          title: title,
          content: dialogContent,
          confirmText: '确定',
          cancelText: '取消',
          showCancel: true,
          confirmColor: '#37D0B3',
          cancelColor: '#777777',
          success: (res)=>{
            if (res.confirm) {
              this.setMiniAppVersion(version)
            } else if (res.cancel) {}
          },

        });

      }

    }
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
