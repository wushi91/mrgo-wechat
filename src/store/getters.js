const getters = {
  token: state => state.user.token,
  tokenExpires: state => state.user.tokenExpires,
  userInfo: state => state.user.userInfo,
  memberInfo: state => state.user.memberInfo,
  orderStatus: state => state.order.orderStatus,

}
export default getters
