const user = {
  state: {
    token: '',

  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
  },

  actions: {
    // 登录
    Login({commit}, {token}) {
      commit('SET_TOKEN', token)
    },

  }
}

export default user
