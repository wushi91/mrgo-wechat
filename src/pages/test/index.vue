<template>
  <div>
    <text >{{message}}</text>

    <mytabbar :tabIndex=tabIndex @chooseTab=chooseTab></mytabbar>
    <web-view src="/static/html/hello.html"></web-view>
  </div>
</template>


<script>

  import mytabbar from '@/components/myTabBar'

  export default {
    config: {
      navigationBarTitleText: '测试',
    },
    data() {
      return {
        tabIndex:1,
        message: 'hello page test',

      };
    },
    components: {
      mytabbar
    },
    mounted() {

    },

    methods: {
      chooseTab(v){
        this.tabIndex = v.tabIndex
      }
    }
  };
</script>

<style scoped>
</style>
