export function rpx2px(rpx) {
  return rpx / 750 * wx.getSystemInfoSync().windowWidth;
}


export default {
  rpx2px
}
