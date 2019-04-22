const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  orderStatus: state => state.order.orderStatus,
}
export default getters
