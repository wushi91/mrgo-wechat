<template>
    <div>
      <text>{{message}}</text>
    </div>
  <!--<image src="/static/images/offline-saoyisao.png"></image>-->
</template>

<script>

  import mytabbar from '@/components/myTabBar'
export default {
  config: {
    navigationBarTitleText: ''
  },

  components: {
    mytabbar
  },
  data() {
    return {
      theResult:''

    };
  },
  mounted() {

  },

  methods: {

  },

  onLoad(options){
    this.theResult = options.data?JSON.parse(options.data).theResult:''
    console.log(this.theResult)
    if(this.theResult ==='pay-success'){
      console.log('支付成功')
      wx.setNavigationBarTitle({ title: '支付成功'})
    }else{
      wx.setNavigationBarTitle({ title: '支付成功'})
    }

  }
};
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";
</style>
