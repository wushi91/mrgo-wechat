<template>
  <div class="order-status-check"></div>
</template>

<script>
  export default {

    data() {
      return {

      }
    },
    onLoad() {
//      this.freshOrderData()
    },

    methods: {
      freshOrderData(){
//        console.log('freshOrderData-----------------------------------------')
        this.wxRequest.get.call(this, this.wxUrl.getOrderStatusCount, {needToken: true}).then(res => {//获取个人页面的订单数量
          let orderStatus = {tabAll:0,tabWait:0,tabBack:0,tabCan:0}
          for(let i = 0 ;i<res.data.content.length;i++){
            switch (res.data.content[i].value){
              case '1':
                orderStatus.tabWait = res.data.content[i].num
                break
              case '2':
                orderStatus.tabCan = res.data.content[i].num
                break
              case '3':
//                orderStatus.tabCan = res.data.content[i].count
                break
              case '4':
                orderStatus.tabBack = res.data.content[i].num
                break
            }
          }

          this.$store.commit('SET_ORDER_STATUS',orderStatus)
        })
      },

    },


  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";


</style>
