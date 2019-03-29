<template>
  <div class="index">


    <div class="page-content">
      <innerpagehome v-if="tabIndex===0"></innerpagehome>
      <innerpagescan v-if="tabIndex===1"></innerpagescan>
      <innerpagemy v-if="tabIndex===2"></innerpagemy>
    </div>


    <div class="mytabbar">
      <mytabbar :tabIndex=tabIndex @chooseTab=chooseTab></mytabbar>
    </div>

  </div>
</template>

<script>
  import mytabbar from '@/components/myTabBar'
  import innerpagehome from './innerPageHome'
  import innerpagescan from './innerPageScan'
  import innerpagemy from './innerPageMy'

  export default {
    data() {
      return {
        tabIndex:0,
      };
    },
    mounted() {

    },
    components: {
      mytabbar,innerpagehome,innerpagescan,innerpagemy
    },


    methods: {
      chooseTab(v){
        this.tabIndex = v.tabIndex

      }
    }

  };
</script>



<style lang="scss" scoped>
  @import "../../common/scss/base";
  .index{
    .page-content{
      padding-bottom: rpx(98);
      height: 100%;
    }
  }
  .mytabbar{
    position: fixed;
    bottom:0;
    left:0;
    right:0;
  }

</style>
