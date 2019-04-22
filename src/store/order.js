

const user = {
  state: {
    orderStatus: {tabAll:0,tabWait:0,tabBack:0,tabCan:0}

  },

  mutations: {
    SET_ORDER_STATUS: (state, orderStatus) => {
      state.orderStatus = orderStatus
    },

  },

  actions: {
    // 登录
    // Login({commit}, {token,userInfo}) {
    //   if(token){
    //     setToken(token)
    //     commit('SET_TOKEN', token)
    //   }
    //   if(userInfo){
    //     setUserInfo(userInfo)
    //     commit('SET_USERINFO', userInfo)
    //   }
    //
    // },


  }
}

export default user
