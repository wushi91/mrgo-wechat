<template>
  <div class="scroll-check" :id="viewId">mmm</div>
</template>

<script>
  /*
  * 获取scrollView的顶部位置
  * 获取当前组件的位置
  * 当组件位置等于顶部位置，触发事件
  * */
  export default {

    props: ['viewId'],

    data() {
      return {
      }
    },


    created(){
      console.log('----------scroll check creatde---'+this.viewId)
    },

    mounted(){
//      console.log('我的外卖到哪里了呢呢嫩嗯你')
//      this.checkUser()

    },
//    onLoad(options) {
////      this.checkUser()
//      console.log()
//    },

    beforeDestroy(){
      console.log('----------scroll check beforeDestroy---'+this.viewId)
    },


    methods: {


      checkUser() {

        console.log('this')
        console.log(this)
        console.log('this.viewId:'+this.viewId)
        const query = wx.createSelectorQuery().in(this)
        query.select('#'+this.viewId).boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function (res) {
          console.log('scroll-check res',res)
        })

//        const query = wx.createSelectorQuery().in(this)
//        query.select('#scroll-check-1').boundingClientRect(function (res) {
//          res.top // 这个组件内 #the-id 节点的上边界坐标
//          console.log('query.select res', res)
//        }).exec()

      },


    },


  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";


</style>
