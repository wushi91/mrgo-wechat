<template>
  <div>
    首页
    <p class="card">
      <i-button type="primary" @click="openSuccesstt">这是一个按钮</i-button>
      
<view class="touch" :style='moveDataTouch' :animation="moveData" @touchstart='startMoveEvent' @touchmove="ballMoveEvent" @touchend="tapMoveEvent">移动</view>
    </p>
  </div>
</template>

<script>
export default {
  config: {
        navigationBarTitleText: '首页'
    },
  data() {
    return {
      code:'',
      moveData:null,
      widthScreen:'',
      touchy:0,
      moveDataTouch:''
    };
  },
  mounted() {
  
  },
  methods: {
    startMoveEvent(e){
      var touchs = e.touches[0];
      var pageY = touchs.pageY;
      this.touchy=pageY
    },
    ballMoveEvent(e){
      var _this=this; 
      var touchs = e.touches[0];
      var pageY = touchs.pageY;
      if(pageY>this.touchy){
        var page=Number(pageY)-Number(this.touchy)
        if(page<51){
          console.log('pageY: ' +page)
          this.moveDataTouch='margin-top: '+page+'px';
        }
        
      }
      
    },
    tapMoveEvent(e){
      this.touchy=0
       this.moveDataTouch='margin-top: 0px';
    },
    moveClick: function(){
    
  },
    handleClick() {
      console.log("123");
      const url = "/packageB/index";
      this.$router.push(url);
    },
    openSuccesstt() {
      var _this=this;
        wx.login({
            success: (rest) => {
                _this.code=rest.code
                _this.$ajaxs.post("/mobile/v1/wechatPay/wxPay?orderId=303992207395008512&addressId=00&code="+_this.code)
                .then(res => {
                    console.log(res)
                    var { status, content } = res;
                        if (status == "200") {
                         wx.requestPayment({
                            timeStamp: content.timeStamp,
                            nonceStr: content.nonceStr,
                            package: content.package,
                            signType: 'MD5',
                            paySign: content.paySign,
                            success(res) {
                              if(res.errMsg=='requestPayment:ok'){
                                
                              }
                            },
                            fail(res) {
                              console.log(res,"失败")
                             }
                          })  
                        }
                
                })
            }
        })
    }
  }
};
</script>

<style>
.card {
  padding: 10px;
  margin-top: -50;

}
.touch{
    width:60px;height:60px;background-color:yellow;
    transition: margin 0.2s;
    -moz-transition: margin 0.2s; /* Firefox 4 */
    -webkit-transition: margin 0.2s; /* Safari 和 Chrome */
    -o-transition: margin 0.2s; /* Opera */
}
</style>