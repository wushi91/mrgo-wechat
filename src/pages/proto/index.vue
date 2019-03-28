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
    navigationBarTitleText: '原型页'
  },

  components: {
    mytabbar
  },
  data() {
    return {
        message:'hello page hha',

    };
  },
  mounted() {

  },

  methods: {

  }
};
</script>

<style lang="scss" scoped>
  @import "../../common/scss/base";
</style>
