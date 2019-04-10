<template>
  <div class="index">
    <div class="page-content">
      <div v-show="tabIndex===0">
        <innerpagehome :userInfo='userInfo'></innerpagehome>
      </div>
      <div v-show="tabIndex===1">
        <innerpagescan :userInfo='userInfo'></innerpagescan>
      </div>
      <div v-show="tabIndex===2">
        <innerpagemy :userInfo='userInfo' :orderStatus="orderStatus"></innerpagemy>
      </div>
    </div>

    <div class="mytabbar">
      <mytabbar :tabIndex=tabIndex @chooseTab=chooseTab></mytabbar>
    </div>

    <scancheck v-if="qrcodeUrl" :qrcodeUrl="qrcodeUrl"></scancheck>
    <usercheck v-else></usercheck>

  </div>
</template>

<script>
  import mytabbar from '@/components/myTabBar'
  import usercheck from '@/components/userCheck'
  import scancheck from '@/components/scanCheck'
  import innerpagehome from './innerPageHome'
  import innerpagescan from './innerPageScan'
  import innerpagemy from './innerPageMy'

  export default {
    data() {
      return {
        tabIndex: 0,
        qrcodeUrl:''
      };
    },
    computed: {
      token() {
        return this.$store.getters.token
      },
      userInfo() {
        console.log('index page computed userInfo')
        return this.$store.getters.userInfo
      }
    },
    onLoad(options) {
      if (options && options.data && JSON.parse(options.data).qrcodeUrl) {
        this.qrcodeUrl = decodeURIComponent(JSON.parse(options.data).qrcodeUrl)
        this.tabIndex = 1
      }else if(options&&options.q){
        this.qrcodeUrl = decodeURIComponent(options.q)
        this.tabIndex = 1
      }

//      this.initData()
    },

    onShow(){
      this.freshOrderData()
    },

    mounted() {

    },
    components: {
      mytabbar,usercheck, scancheck,innerpagehome, innerpagescan, innerpagemy
    },


    methods: {
//      async initData() {
//        if (!this.token) {//本地都没有token，直接登录页
//          this.wxNavigate.redirectToPage('login', {redirectPage: 'index'})
//          return
//        }
//        await this.wxRequest.get.call(this, this.wxUrl.checkLogin, {needToken: true}).then(res => {//判断token是否失效
//        }, res => {
//          if (res.data.status === 401) {
//            this.wxNavigate.redirectToPage('login', {redirectPage: 'index'})
//          }
//        })
//      },
      freshOrderData(){
        this.wxRequest.get.call(this, this.wxUrl.getOrderStatusCount, {needToken: true}).then(res => {//获取个人页面的订单数量
          let orderStatus = {tabAll:0,tabWait:0,tabBack:0,tabCan:0}
          for(let i = 0 ;i<res.data.content.length;i++){
            switch (res.data.content[i].value){
              case '1':
                orderStatus.tabWait = res.data.content[i].count
                break
              case '2':
                orderStatus.tabCan = res.data.content[i].count
                break
              case '3':
                orderStatus.tabCan = res.data.content[i].count
                break
              case '4':
                orderStatus.tabBack = res.data.content[i].count
                break
            }
          }

          this.orderStatus = orderStatus
        })
      },
      chooseTab(v) {
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
