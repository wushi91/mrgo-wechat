<template>
  <div>
    <text >{{message}}</text>
    <text >{{count}}<br/></text>
    <text >{{token}}</text>
    <button @click="totoken">fhfhf</button>

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
    computed:{
      count(){
        return this.$store.state.count
      },
      token(){
        return this.$store.getters.token
      }
    },
    onLoad(){
    },
    components: {
      mytabbar
    },
    mounted() {

    },

    methods: {
      chooseTab(v){
        this.tabIndex = v.tabIndex
      },
      totoken(){
        this.$store.dispatch('Login', { token:'222fefefegsgdfg'})
      }
    }
  };
</script>

<style scoped>
</style>
