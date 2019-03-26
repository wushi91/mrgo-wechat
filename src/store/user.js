import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    id: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ID: (state, id) => {
      state.id = id
    }
  },

  actions: {
    // 登录
    Login({ commit }, { token, id }) {
      setToken(token)
      commit('SET_TOKEN', token)
      commit('SET_ID', id)
    },

    // 获取用户信息
    GetInfo({ commit }, { imgurl, name }) {
      return new Promise((resolve, reject) => {
        console.log(imgurl, name )
        // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //   commit('SET_ROLES', data.roles)
        // } else {
        //   reject('getInfo: roles must be a non-null array !')
        // }
        commit('SET_NAME', name)
        commit('SET_AVATAR', imgurl)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
