<template>
  <div class="home">
    <template v-for="item in arr">
      <text>我的信息{{item}}</text>
      <br/>
    </template>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        arr:[1],
      };
    },

  };
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";


</style>
