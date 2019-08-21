<template>
  <div class="index">
    <div class="page-content">
      <div v-show="tabIndex===0">
        <innerpagehome :userInfo='userInfo' :memberInfo="memberInfo" @chooseTab=chooseTab></innerpagehome>
      </div>
      <div v-show="tabIndex===1">
        <innerpagescan ref="innerpagescan" :userInfo='userInfo'></innerpagescan>
      </div>
      <div v-show="tabIndex===2">
        <innerpagemy :userInfo='userInfo' :orderStatus="orderStatus" :memberInfo="memberInfo"></innerpagemy>
      </div>
    </div>

    <div class="mytabbar">
      <mytabbar :tabIndex=tabIndex @chooseTab=chooseTab></mytabbar>
    </div>


    <!--<scancheck v-if="qrcodeUrl" :qrcodeUrl="qrcodeUrl"></scancheck>-->
    <!--<usercheck ref="usercheck" :qrcodeUrl="qrcodeUrl"></usercheck>-->
    <usercheck ref="usercheck"></usercheck>
    <!--<testcheck></testcheck>-->
    <orderstatuscheck :orderStatus='orderStatus' ref="orderstatuscheck" ></orderstatuscheck>

  </div>
</template>

<script>
  import mytabbar from '@/templates/myTabBar'
  import usercheck from '@/components/userCheck'
  import testcheck from '@/components/testCheck'
  import orderstatuscheck from '@/components/orderStatusCheck'
  import innerpagehome from './innerPageHome'
  import innerpagescan from './innerPageScan'
  import innerpagemy from './innerPageMy'

//  navigationStyle
  export default {
    config: {
//      "navigationStyle": 'custom',
    },
    data() {
      return {
        tabIndex: 0,
//        qrcodeUrl:'',
        showPage:true,
        showTime:0,
        isLoadReady:false
      };
    },
    components: {
      mytabbar,usercheck,orderstatuscheck,innerpagehome, innerpagescan, innerpagemy,testcheck
    },
    computed: {
      token() {
        return this.$store.getters.token
      },
      userInfo() {
        return this.$store.getters.userInfo
      },
      memberInfo() {
        return this.$store.getters.memberInfo
      },
      orderStatus(){
        return this.$store.getters.orderStatus
      }
    },
    onLoad(options) {

//
//      console.log(JSON.stringify({m:'13822545555',e:new Date().getTime()}))
//      console.log('staticQrcode',staticQrcode.getEncryptQrcodeString(13822542317))
//      if (options && options.data && JSON.parse(options.data).qrcodeUrl) {
//        this.qrcodeUrl = decodeURIComponent(JSON.parse(options.data).qrcodeUrl)
//      }else if(options&&options.q){//微信扫一扫二维码参数是q
//        this.qrcodeUrl = decodeURIComponent(options.q)
//      }


//      console.log('genHost',this.wxConfig.genHost())
//      console.log(this.wxConfig.host)
    },

    onShow(){

      if(this.isLoadReady){
        this.$refs.usercheck.freshMemberInfo()//更新会员信息
        this.$refs.orderstatuscheck.freshOrderData()//更新订单状态数量
      }

    },

    mounted() {
      this.$refs.usercheck.freshMemberInfo()//更新会员信息
      this.$refs.orderstatuscheck.freshOrderData()//更新订单状态数量
      this.isLoadReady = true
    },

    methods: {
      chooseTab(v) {
        if(v.tabIndex===1){//打开扫描
          this.$refs.innerpagescan.scanMRGOCode()
          return
        }

        if(this.tabIndex===0&&v.tabIndex===0){//
          if(this.wxConfig.isDeveloper(this.userInfo.mobile)){
            this.wxNavigate.navigateToPackageAPage('developer')
          }
        }
        this.tabIndex = v.tabIndex
      },



    }

  };
</script>


<style lang="scss" scoped>
  @import "../../common/scss/base";

  .index {
    .page-content {
      padding-bottom: rpx(98);
      height: 100%;
    }
  }

  .mytabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

</style>
