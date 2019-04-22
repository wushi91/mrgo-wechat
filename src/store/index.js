// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user'
import order from '@/store/order'
import getters from '@/store/getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  getters,
  state: {
    count: 0
  },
  modules: {
    user,order
  },
  mutations: {
  }
})

export default store
