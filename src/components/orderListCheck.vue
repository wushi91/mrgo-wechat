<template>
  <div class="order-list-check"></div>
</template>

<script>

  /**
   * 维护分页加载的数据，
   * 如何返回数据，
   * 如何实现刷新，
   * 如何底部触发分页加载，
   * 解决方法：每次请求的是单页的数据，直接返回订单列表，同时返回pageNum，父组件根据pageNum去判断叠加数据还是置空数据处理，
   * */
  export default {

    props: ['orderTab'],

    data() {
      return {
        pageSize: 20,
        pageNum: 1,
        totalPageNum:1,

      }
    },

    onLoad() {
//      console.log('bbbbbbbbbbbbbbbbbbbbbbb')
    },


    methods: {
      getOrders(pageNum) {
        if (!pageNum) {
          pageNum = this.pageNum+1//下一页
        }

        if(pageNum>this.totalPageNum){
          return
        }

        // status 1：待付款 2：可使用 3：完成 4：退款 5已取消

        let status = -1
        if(this.orderTab ==='tab-all'){
          status = -1
        }else if(this.orderTab ==='tab-wait'){
          status =1
        }else if(this.orderTab ==='tab-can'){
          status =2
        }else if(this.orderTab ==='tab-back'){
          status = 4
        }


        let queryData  = status===-1?{needToken: true,pageSize:this.pageSize,pageNum}:{needToken: true,status,pageSize:this.pageSize,pageNum}

        this.wxRequest.get.call(this, this.wxUrl.getOrderList, queryData).then(res => {

          console.log('order success', res.data)
          this.pageNum = res.data.content.pageNum
          this.totalPageNum = res.data.content.pages===0?1:res.data.content.pages
          this.$emit('getPageOrders', {orderTab: this.orderTab, pageNum: this.pageNum,pageOrders:res.data.content.list})
        }, res => {
          console.log('order fail', res)
          this.$emit('getPageOrders', {orderTab: this.orderTab, pageNum: this.pageNum,pageOrders:[]})
        })
      },

    },


  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";


</style>
