

const TokenKey = 'Admin-Token'
const UserInfoKey = 'UserInfo'
const MemberInfoKey = 'MemberInfo'


//
export function getToken() {

  return wx.getStorageSync(TokenKey)
}

export function setToken(token) {
  return wx.setStorageSync(TokenKey,token)
}

export function removeToken() {
  return wx.removeStorageSync(TokenKey)
}

//
export function getUserInfo() {

  return wx.getStorageSync(UserInfoKey)
}

export function setUserInfo(userInfo) {
  return wx.setStorageSync(UserInfoKey,userInfo)
}

export function removeUserInfo() {
  return wx.removeStorageSync(UserInfoKey)
}


//
export function getMemberInfo() {

  return wx.getStorageSync(MemberInfoKey)
}

export function setMemberInfo(memberInfo) {
  return wx.setStorageSync(MemberInfoKey,memberInfo)
}

export function removeMemberInfo() {
  return wx.removeStorageSync(MemberInfoKey)
}
