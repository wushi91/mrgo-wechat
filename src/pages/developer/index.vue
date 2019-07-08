<template>
  <div class="developer">
    <div class="mp-config">
      <text class="title n-gray">1.当前环境：</text>
      <text class="n-gray">{{'{'}}</text>
      <span class="suojin" v-for="(item,index) in mpConfig" :key="index">
        <text class="d-red">{{item.label}}</text><text class="d-blue"> : </text><text class="d-green">"{{item.value}}"</text><text class="n-gray"> , </text>
      </span>
      <text class="n-gray">{{'}'}}</text>
    </div>

    <div class="mp-config">
      <text class="title n-gray">2.上一个已上线版本环境：</text>
      <text class="n-gray">{{'{'}}</text>
      <span class="suojin" v-for="(item,index) in lastMpConfig" :key="index">
        <text class="d-red">{{item.label}}</text><text class="d-blue"> : </text><text class="d-green">"{{item.value}}"</text><text class="n-gray"> , </text>
      </span>
      <text class="n-gray">{{'}'}}</text>
    </div>

    <div class="mp-config">
      <text class="title n-gray">3.服务器环境：</text>
      <text class="n-gray">{{'{'}}</text>
      <span class="suojin" v-for="(item,index) in serviceMpConfig" :key="index">
        <text class="d-red">{{item.label}}</text><text class="d-blue"> : </text><text class="d-green">"{{item.value}}"</text><text class="n-gray"> , </text>
      </span>
      <text class="n-gray">{{'}'}}</text>
    </div>

    <div class="mp-config">
      <text class="title n-gray">4.当前版本是否展现体验账号：</text>
      <text class="suojin d-red">{{reviewVersion===onlineReviewVersion?'是':'否'}}</text>
    </div>

    <div class="mp-config">
      <text class="title n-gray">5.操作：</text>
      <div class="operate d-orange suojin" hover-class="operate-hover" @click="changeServer">切换服务器</div>
      <div class="operate d-orange suojin" hover-class="operate-hover" @click="setMiniAppVersionActionCofirm(reviewVersion===onlineReviewVersion?'关闭体验账号':'开启体验账号',reviewVersion)">{{reviewVersion===onlineReviewVersion?"关闭体验账号":"开启体验账号"}}</div>
      <!--<div class="operate d-orange suojin" hover-class="operate-hover">使用体验账号登录</div>-->
      <div class="operate d-orange suojin" hover-class="operate-hover" @click="toPage('login')">登录页</div>
      <div class="operate d-orange suojin" hover-class="operate-hover" @click="clearStorage">清除缓存</div>

      <!--：{{nowCache?'['+nowCache+']':'无数据'}}-->
    </div>
  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  import mytabbar from '@/templates/myTabBar'
//  navigationStyle: 'custom',
  export default {
    config: {
      navigationBarTitleText: '开发管理',
      navigationBarBackgroundColor: '#282C34',

      backgroundColor: '#282C34',
    },

    components: {
      mytabbar
    },
    data() {
      return {
        mpConfig:[{label:'版本号',value:this.wxConfig.version},
          {label:'连接主机',value:this.wxConfig.genHost()},
          {label:'用户手机号',value: this.$store.getters.userInfo.mobile},],
        lastMpConfig:[{label:'版本号',value:this.wxConfig.last_version+'.'+this.wxConfig.last_reviewV}],
        serviceMpConfig:[{label:'后台审核版本号',value:''}],
        onlineReviewVersion:'',
        reviewVersion:this.wxConfig.reviewVersion,
        nowCache:''
      };
    },

    onLoad(){
      this.getMiniAppVersion()
      wx.getStorageInfo({
        success: (res) =>{
          this.nowCache = res.keys.toString()
        }
      })
    },
    mounted() {

    },



    methods: {
      getMiniAppVersion(){
        this.wxRequest.get.call(this, this.wxUrl.getMiniAppVersion).then(res => {
          console.log('getMiniAppVersion success',res)
          this.onlineReviewVersion = res.data.content.version?res.data.content.version:'无'
          this.serviceMpConfig = [{label:'后台审核版本号',value:this.onlineReviewVersion}]
        }, res => {

          console.log('getMiniAppVersion fail',res)
        })
      },


      toPage(v){
        this.wxNavigate.navigateToPage(v)
      },

      clearStorage(){
        wx.clearStorage({success: (res) =>{
          this.nowCache = ''
        }})
      },

      changeServer(){
        let storageHost = wx.getStorageSync('storageHost')//
        if(!storageHost){//true表示正式服，需要切换测试服
          wx.setStorageSync('storageHost','测试服')
        }else{
          wx.setStorageSync('storageHost','')
        }
        wx.showToast({title: '请重启微信，连接测试服需要打开调试模式', icon: 'none'})

      },

      setMiniAppVersionActionCofirm(title,version){

        console.log('setMiniAppVersionActionCofirm this.reviewVersion',version)

        let dialogContent = ''
        if(title === '关闭体验账号'){//审核通过，
          dialogContent = '清空服务器审核版本号'
          version = '无'
        }else if(title === '开启体验账号'){//开启审核，
          dialogContent = '设置服务器审核版本号为'+version
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

      },

      setMiniAppVersion(version){

        this.wxRequest.post.call(this, this.wxUrl.postMiniAppVersion,{needToken:true,version:version}).then(res => {
          console.log('postMiniAppVersion success',res)
          wx.showToast({title:'操作成功'})
          this.getMiniAppVersion()
        }, res => {
          wx.showToast({title:'请先登录',icon:'none'})
          console.log('postMiniAppVersion fail',res)
        })
      },


    }
  };
</script>

<style>
  page {
    /*background-color: #FFFFFF;*/
    /*background-color: red;*/
    height: 100%;
    background-color: #282C34;
  }
</style>
<style lang="scss" scoped>
  @import "../../common/scss/base";

  .developer {
    padding: rpx(30);

    .d-gray {
      color: rgb(92, 99, 112);
    }
    .n-gray {
      color: rgb(171, 178, 191);
    }
    .d-blue {
      color: rgb(97, 175, 239);
    }
    .d-red {
      color: rgb(224, 108, 117);
    }
    .d-green {
      color: rgb(152, 195, 121);
    }
    .d-orange{
      color: rgb(209, 154, 102);
    }

    .mp-config{
      font-size: rpx(30);
      line-height: 1.4;
      display: flex;
      flex-direction: column;
      margin-bottom: rpx(30);
      .suojin{
        padding-left:rpx(30);
      }
      .title {
        margin-bottom: rpx(10);
      }

      .operate{
        padding-top:rpx(15);
        padding-bottom: rpx(15);
        text-decoration:underline;
      }
      .operate-hover{
        background-color: rgb(62,68,81);
      }
    }

  }
</style>
