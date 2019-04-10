<template>
  <div class="user-check"></div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    onLoad(options) {
      this.checkUser()
    },

    methods: {
      checkUser() {
        if (!this.$store.getters.token) {//本地都没有token，直接登录页
          this.wxNavigate.redirectToPage('login', {redirectPage: 'index'})
          return
        }
        this.wxRequest.get.call(this, this.wxUrl.checkLogin, {needToken: true}).then(res => {
        }, res => {
          if (res.data.status === 401) {
            this.wxNavigate.redirectToPage('login', {redirectPage: 'index'})
          }
        })
      }
    },


  }

</script>

<style lang="scss" scoped>

  @import "../common/scss/base";


</style>
