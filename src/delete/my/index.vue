<template>
    <div class="page">
      <div class="tudev" style="background: url('../../../static/tabs/0.png') no-repeat;background-size: 100%">
        <navigator v-if="token&&token.imageUrl" url="../my/myMessage" class="weui-media-box weui-media-box_appmsg myclasstop" hover-class="weui-cell_active">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" :src="token.imageUrl" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg" style="text-align: left">
              <div class="weui-media-box__title">{{token.nickName}}</div>
              <div class="weui-media-box__title ipone">13697871879</div>
          </div>
          <div class="weui-cell__ft weui-cell__ft_in-tubiaoa" ></div>
        </navigator>
        <div v-else class="myclasstop">
          <button class="login_btn_t" @getuserinfo="handleClick" open-type='getUserInfo'>微信登录</button>
        </div>
      </div>
    </div>
</template>

<script>
import '@/css/weui.css'
import { userInfo } from 'os';
export default {
    config: {
        navigationBarTitleText: '我的'
    },
  data() {
    return {
        sisx:'男',
        token:'',
        userInfo:{},
        userInfos:{},
        myimageUrl:false,
        touchy:0,
        moveDataTouch:'',
        
    };
  },
  mounted() {
    var token = wx.getStorageSync('token')
    // 调用API从本地缓存中获取数据
     if(token.token){
       this.token=token
       if(this.token.imageUrl){
        this.myimageUrl=true
       }else{
          this.myimageUrl=false
       }
       console.log(this.token)
     }
  },
   created () {
    
  },
  methods: {
    fundingFiling(){
        this.$router.push({
        path: "/packageB/index"
      });
    },
     gocart(){
        this.$router.push({
        path: "/packageB/cart"
      });
    },
    handleClick(e) {
      var _this = this
      _this.userInfo=e.mp.detail.userInfo
      _this.token.imageUrl=_this.userInfo.avatarUrl
      if(_this.token.imageUrl){
        _this.myimageUrl=true
       }
      _this.token.nickName=_this.userInfo.nickName
      console.log(_this.token)
      wx.setStorage({//存储到本地
        key:"token",
        data:_this.token
      })
      
    },
    myorld(od){
       this.$router.push({
        path: "../my/orlder",
        query: {id:od}
      });
    },
    startMoveEvent(e){
      var touchs = e.touches[0];
      var pageY = touchs.pageY;
      this.touchy=pageY
    },
    ballMoveEvent(e){
      var _this=this; 
      var touchs = e.touches[0];
      var pageY = touchs.pageY;
    wx.getSystemInfo({
      success:function(res){
        if(res.platform == "devtools"){
            if(pageY>_this.touchy){
            var page=Number(pageY)-Number(_this.touchy)
              // console.log('pageY: ' +page)
              _this.moveDataTouch='margin-top: -35px';
          }
        }else if(res.platform == "ios"){
        }else if(res.platform == "android"){
            if(pageY>_this.touchy){
            var page=Number(pageY)-Number(this.touchy)
              // console.log('pageY: ' +page)
              _this.moveDataTouch='margin-top: -35px';
          }
        }
      }
    })
     
      
    },
    tapMoveEvent(e){
      this.touchy=0
       this.moveDataTouch='margin-top: -85px';
    },
  }
};
</script>

<style>
.card {
  padding: 10px;
}
.weui-media-box__thumb{
    border-radius: 50%;
}
.myclasstop{
  text-align: center;
  padding: 10px;
  padding-bottom: 5px;
  height: 75px;
  background: #FA4D93;
}
.listTop{
  display: flex;
  justify-content:space-between;
  /* width: 100%; */
  /* height: 50px; */
  padding: 10px 0 10px 0;
  margin: 0 30px;
}
.listTops{
  display: flex;
  justify-content:space-between;
  padding: 10px 30px 20px 30px;
}
.listBody{
  /* flex: 1; */
  text-align: center;
}
.listBody_img{
  width: 32px;
  height: 32px;
}
.listBody .listBody_size{
  width: 55px;
  font-size: 12px;
  font-weight:500;
  color:rgba(102,102,102,1);
  line-height:17px;
 
}
.login_btn_t{
  width:145px;
  height:38px;
  background:rgba(255,255,255,0.6);
  border-radius:19px;
  font-size:16px;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:38px;
}
</style>