<template>
    <div class="login">
      <div class="class_img">
        <!-- <img class="by_img" src="../../../static/tabs/1.png" alt="" srcset=""> -->
      </div>   
      <div class="login_btn">
        <button class="login_btn_t" @getphonenumber="mygetPhoneNumber" open-type="getPhoneNumber">微信登录</button>
      </div>
      <div class="login_ck">
        <checkbox color="#F75193" class="checks" :value="item.name" @click="checklogin" :checked="item.checked" />
        <span>已阅读并同意《用户协议》</span>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        username:'',
        password:'',
        userInfo:{},
        iv:'',
        code:'',
        encryptedData:'',
        item:{
          name:'12312',
          checked:true
        }
    };
  },
  mounted() {
      
  },
  // 下拉刷新方法，与methods方法同级

  async onPullDownRefresh() {
  // to doing..
    this.lodingtop()
  // 停止下拉刷新

  },

  // 上拉加载，拉到底部触发
  onReachBottom() {
  // 到这底部在这里需要做什么事情
    this.loadMore();
  },
  methods: {
    lodingtop(){
      console.log('下拉刷新')
      wx.stopPullDownRefresh();
    },
    loadMore(){
      console.log('上拉加载')
    },
    handleClick(data) { 
      this.$ajaxs.get("/mobile/v1/wechat/wechatLoginForMini", data)
      .then((res)=>{
         if (res.status === 200) {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
            })

            wx.setStorage({//存储到本地
              key:"token",
              data:res.content
            })
            this.handleLogin()
         }else{
            wx.showToast({
              title: res.message,
              icon: "none"
            });
            return false;
         }
      })
    },
    handleLogin(){
        var _this =this
        var url = '../my/index'
        wx.switchTab({ url })
    },
    namefunder(e){
        this.username=e.mp.detail.detail.value
        console.log(this.username)
    },
    onGotUserInfo(itm){
        console.log(itm.mp.detail.userInfo)
    },
    checklogin(){
      this.item.checked=!this.item.checked
    },
    mygetPhoneNumber(e){
      if(!this.item.checked){
          return  wx.showToast({
              title: '请先阅读并同意用户协议！',
              icon: "none"
            });
      }
       if(e.mp.detail.encryptedData){
        wx.login({
        success: (rest) => {
          this.code=rest.code
          this.encryptedData=e.mp.detail.encryptedData
          this.iv=e.mp.detail.iv
          var date={
            code:this.code,
            encryptedData:this.encryptedData,
            iv:this.iv,
          }
          // console.log(date)
          // return
          this.handleClick(date)
          }
        })
       }
    },
    wordfunder(e){
        this.password=e.mp.detail.detail.value
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (rest) => {
          this.code=rest.code
        }
      })
    },
  }
};
</script>

<style>
.card {
  padding: 10px;
}
.login{
    height: 100%;
    width: 100%;
    font-family: PingFang-SC-Medium;
}
.col-class{
    margin-bottom: 20px;
}
.icimgs{
    height: 100px;
    width: 100px;
    border-radius: 50%;
    margin: 0 auto;
}
.imgcenter{
    text-align: center;
    margin-bottom: 40px;
}
.class_img{
  padding: 62px 17px 32px 16px;
}
.class_img .by_img{
   width: 100%;
   min-height: 310px;
}
.login_btn{
  padding: 0 64px 10px 64px;
}
.login_btn .login_btn_t{
  height:40px;
  background:rgba(255,255,255,1);
  border-radius:20px;
  border:1px solid rgba(247,81,147,1);
  font-size:16px;
  font-weight:500;
  color:rgba(247,81,147,1);
}
.login_ck{
  height:17px;
  font-size:12px;
  font-weight:500;
  color:rgba(153,153,153,1);
  line-height:17px;
  text-align: center;
}
.login_ck .checks{
  font-size:19px;
}
</style>