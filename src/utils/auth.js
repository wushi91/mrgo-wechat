

const TokenKey = 'Admin-Token'
const TokenExpiresKey = 'TokenExpires'
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
export function getTokenExpires() {
  let timestamp = wx.getStorageSync(TokenExpiresKey)
  if(timestamp){
    return timestamp
  }else{
    return 0 //老版本可能不存在这个timestamp，为了避免出错
  }
}

export function setTokenExpires(token) {
  return wx.setStorageSync(TokenExpiresKey,token)
}

export function removeTokenExpires() {
  return wx.removeStorageSync(TokenExpiresKey)
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
