// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  modules: {
    user
  },
  mutations: {
    increment: (state) => {
      const obj = state
      obj.count += 1
    },
    setParam(state, payload) {
      for (const i in payload) {
        state[i] = payload[i]
      }
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    }
  }
})

export default store
