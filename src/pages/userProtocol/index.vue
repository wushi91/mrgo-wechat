<template>
  <div class="user-protocol">
    <web-view src="https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=1503979103&version=1&lang=zh_CN&platform=2"></web-view>
  </div>

</template>

<script>



  export default {
    config: {
      navigationBarTitleText: 'MGRO用户协议'
    },

    data() {
      return {

      };
    },
    mounted() {

    },

    methods: {}
  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";
</style>
