// const host = 'http://192.168.8.7:5555'//测试服
// const host = 'http://192.168.8.25:5555'//测试服
// const host = 'http://47.107.185.37:5555'//正式服
const host = 'https://wechat.mrgo.club'//正式服


const apiMobileVersion = '/mobile/v1'//api版本，移动端分类
const apiConsoleVersion = '/console/v1'//api版本，后台端分类
// const apiMallVersion = '/mall/v1'//api版本，后台端分类



export default {

  //get请求
  login: `${host + apiMobileVersion}/users/wechatLogin`, //登陆
  checkLogin: `${host + apiConsoleVersion}/users/getUserInfo`,
  getOrderDetail: `${host + apiMobileVersion}/order/getOrderDetail`,
  getOrderList: `${host + apiMobileVersion}/order/list`,//订单列表
  getOrderStatusCount: `${host + apiMobileVersion}/order/getStatusCount`,
  getCommodityStoreByRfid: `${host + apiMobileVersion}/stock/getCommodityStoreByRfid`,


  //post请求
  editUser: `${host + apiMobileVersion}/users/edit`, // 上传用户信息POST /v1/users/edit
  openDoor: `${host + apiMobileVersion}/store/sendMsgToQueueIn`, //开门
  saveShoppingCartByRfid : `${host + apiMobileVersion}/shoppingCart/saveByRfid`, //添加商品到购物车
  updateShoppingCartTypeExpired: `${host + apiMobileVersion}/shoppingCart/updateTypeExpired`, //从购物车删除物品
  saveOrderForShoppingCart : `${host + apiConsoleVersion}/order/saveForShoppingCart`, //新增订单
  wechatPay : `${host + apiMobileVersion}/wechatPay/wxPay`, //获取微信支付的参数





  // saveOrderByRfids: `${host + apiMobileVersion}/order/saveByRfids`, //新增订单
  // // coach_coachId: coachId => { return `${host}/coach/${coachId}` },// 教练详情
  // addPost:`${host+apiMobileVersion}/addPost`,//新建帖子


  //上传


}
