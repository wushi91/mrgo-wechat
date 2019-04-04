import { getToken, setToken, removeToken,getUserInfo,setUserInfo } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userInfo:getUserInfo()

  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
  },

  actions: {
    // 登录
    Login({commit}, {token,userInfo}) {
      if(token){
        setToken(token)
        commit('SET_TOKEN', token)
      }
      if(userInfo){
        setUserInfo(userInfo)
        commit('SET_USERINFO', userInfo)
      }

    },


  }
}

export default user
