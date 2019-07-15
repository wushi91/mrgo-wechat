import config from '@/config/index'

const host = config.genHost()

const apiMobileVersion = '/mobile/v1'//api版本，移动端分类
const apiConsoleVersion = '/console/v1'//api版本，后台端分类
// const apiMallVersion = '/mall/v1'//api版本，后台端分类


export default {

  //get请求
  login: `${host + apiMobileVersion}/users/wechatLogin`, //登陆
  checkLogin: `${host + apiMobileVersion}/users/getUserInfo`,
  getUserInfo: `${host + apiMobileVersion}/users/getUserInfo`,
  getOrderDetail: `${host + apiMobileVersion}/order/getOrderDetail`,
  getOrderList: `${host + apiMobileVersion}/order/list`,//订单列表
  getOrderStatusCount: `${host + apiMobileVersion}/order/getStatusCount`,
  getCommodityStoreByRfid: `${host + apiMobileVersion}/stock/getCommodityStoreByRfid`,

  getMemberTypeList: `${host + apiConsoleVersion}/member/list`,
  getGenerateLoginCode: `${host + apiMobileVersion}/qrLogin/generateLoginCode`,

  getBannerAdv: `${host + apiMobileVersion}/adv/query`,//轮播图

  getOpenOfflinePayViewParam: `${host + apiMobileVersion}/wechatPay/getOpenOfflinePayViewParam`,//打开付款码


  //post请求
  editUser: `${host + apiMobileVersion}/users/edit`, // 上传用户信息POST /v1/users/edit
  openDoor: `${host + apiMobileVersion}/store/sendMsgToQueueIn`, //开门
  saveShoppingCartByRfid: `${host + apiMobileVersion}/shoppingCart/saveByRfid`, //添加商品到购物车
  updateShoppingCartTypeExpired: `${host + apiMobileVersion}/shoppingCart/updateTypeExpired`, //从购物车删除物品
  saveOrderForShoppingCart: `${host + apiMobileVersion}/order/saveForShoppingCart`, //新增订单POST /v1/order/saveForShoppingCart
  wechatPay: `${host + apiMobileVersion}/wechatPay/wxPay`, //获取微信支付的参数
  memberUserWechatPay: `${host + apiMobileVersion}/memberUserWechatPay/wxPay`, //购买会员
  giftExperienceMember: `${host + apiMobileVersion}/memberUser/giftExperienceMember`, //7天体验套餐


  // saveOrderByRfids: `${host + apiMobileVersion}/order/saveByRfids`, //新增订单
  // // coach_coachId: coachId => { return `${host}/coach/${coachId}` },// 教练详情
  // addPost:`${host+apiMobileVersion}/addPost`,//新建帖子


  //上传


  //审核相关接口
  getReviewStatus: `${host + apiMobileVersion}/users/getReviewStatus`,//判断是否开启体验账号
  getTestUser: `${host + apiMobileVersion}/users/getTestUser`,//获取体验账号的token
  getMiniAppVersion: `${host + apiMobileVersion}/users/getMiniAppVersion`,//获取线上审核版本好
  postMiniAppVersion: `${host + apiMobileVersion}/users/setMiniAppVersion`,//设置线上审核版本好

}
