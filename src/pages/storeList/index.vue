<template>
  <div class="storeList">
    <!--<div class="input-wrapper">-->

      <!--&lt;!&ndash;<image class="icon-store-list-search" src="/static/images/icon-store-list-search.png"></image>&ndash;&gt;-->
      <!--&lt;!&ndash;<input placeholder="搜索" v-model="searchText"&ndash;&gt;-->
             <!--&lt;!&ndash;placeholder-style="color:#CFCFCF;" maxlength='200'>&ndash;&gt;-->
    <!--</div>-->

    <div  v-for="(store,index) in storeList" :key="index">
      <storeItem :storeInfo="store"></storeItem>
      <div class="store-store-line"></div>
    </div>
  </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  import storeItem from '@/templates/storeItem'

  export default {
    config: {
      navigationBarTitleText: '所有门店'
    },

    components: {
      storeItem
    },
    data() {
      return {
//        searchText:''
        storeList:[]
      };
    },
    onLoad(options) {

      this.wxRequest.get.call(this, this.wxUrl.mobileStoreList, {needToken: true,pageNum:1,pageSize:100}).then(res => {
        console.log('mobileStoreList res',res)
        if(res.data.status===200){
          this.storeList = res.data.content.list
          console.log('storeList',this.storeList)
        }

      }, res => {
      }).catch(err => {
        console.log(err)
      })
    },
    onUnload() {
      Object.assign(this.$data, this.$options.data())//清楚页面数据
    },


    methods: {}
  };
</script>


<style lang="scss" scoped>
  @import "../../common/scss/base";
  .storeList{
    padding-top: rpx(20);
    .input-wrapper{
      position: fixed;
      display: flex;
      align-items: center;
      height: rpx(60);
      top:rpx(10);
      left: rpx(30);
      right: rpx(30);
      border-radius:30px;
      background-color: #FAFAFA;
      padding:0 rpx(22);
      input{
        flex: 1;
        @include FCS(#333333,28,60,60);
      }
      .icon-store-list-search{
        @include WH(30,30);
        margin-right: rpx(16);
      }
    }
    .store-store-line{
      height: rpx(2);
      background-color: #EEEEEE;
      margin-left: rpx(30);

    }
  }
</style>
