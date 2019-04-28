<template>
  <div class="index">
    <div class="page-content">
      <div v-show="tabIndex===0">
        <innerpagehome :userInfo='userInfo' :memberInfo="memberInfo"></innerpagehome>
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

    <scancheck v-if="qrcodeUrl" :qrcodeUrl="qrcodeUrl"></scancheck>
    <usercheck v-else></usercheck>
    <!--<testcheck></testcheck>-->
    <orderstatuscheck :orderStatus='orderStatus' ref="orderstatuscheck" v-if="showPage"></orderstatuscheck>

  </div>
</template>

<script>
  import mytabbar from '@/components/myTabBar'
  import usercheck from '@/components/userCheck'
  import scancheck from '@/components/scanCheck'
  import testcheck from '@/components/testCheck'
  import orderstatuscheck from '@/components/orderStatusCheck'
  import innerpagehome from './innerPageHome'
  import innerpagescan from './innerPageScan'
  import innerpagemy from './innerPageMy'

  export default {
    data() {
      return {
        tabIndex: 0,
        qrcodeUrl:'',
        showPage:true
      };
    },
    components: {
      mytabbar,usercheck, scancheck,orderstatuscheck,innerpagehome, innerpagescan, innerpagemy,testcheck
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

//      wx.setEnableDebug({enableDebug:true})
//      wx.chooseInvoiceTitle({})

      if (options && options.data && JSON.parse(options.data).qrcodeUrl) {
        this.qrcodeUrl = decodeURIComponent(JSON.parse(options.data).qrcodeUrl)
//        this.tabIndex = 1
      }else if(options&&options.q){//微信扫一扫二维码参数是q
        this.qrcodeUrl = decodeURIComponent(options.q)
//        this.tabIndex = 1
      }

    },

    onShow(){
      this.showPage = true
    },
    onHide(){
      this.showPage = false
    },
    mounted() {

    },

    methods: {
      chooseTab(v) {
        if(v.tabIndex===1){//打开扫描
          this.$refs.innerpagescan.scanMRGOCode()
          return
        }

        if(this.tabIndex===0&&v.tabIndex===0){//

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
