<template>
  <div>
    <text >{{message}}</text>

    <mytabbar :tabIndex=tabIndex @chooseTab=chooseTab></mytabbar>
    <card text="大师额"></card>
  </div>
</template>

<script>

  import mytabbar from '@/components/myTabBar'
  import card from '@/components/card'

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
      mytabbar,card
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
