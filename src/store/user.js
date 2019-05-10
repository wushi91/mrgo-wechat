import { getToken, setToken, removeToken,getUserInfo,setUserInfo,removeUserInfo,getMemberInfo,setMemberInfo ,removeMemberInfo} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userInfo:getUserInfo(),
    memberInfo:getMemberInfo(),

  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_MEMBERINFO: (state, memberInfo) => {
      state.memberInfo = memberInfo
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

    ClearLogin({commit}) {
      commit('SET_TOKEN', '')
      commit('SET_USERINFO', '')
      commit('SET_MEMBERINFO', '')
      removeToken()
      removeUserInfo()
      removeMemberInfo()
    },

    Member({commit},{memberInfo}){
      setMemberInfo(memberInfo)
      commit('SET_MEMBERINFO', memberInfo)
    }


  }
}

export default user
