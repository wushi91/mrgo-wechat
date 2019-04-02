// 对一些微信接口的promise，异步都改成同步格式写法了


// import Promise from 'es6-promise'

const Promise = require('es6-promise').Promise


Promise.prototype.finally = function (callback) {
  let P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
}

const promisify = (api) => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, { success: resolve, fail: reject }), ...params);
    });
  }
}

export default {
  getSetting: promisify(wx.getSetting),
  getUserInfo: promisify(wx.getUserInfo),
  login: promisify(wx.login),
  chooseImage: promisify(wx.chooseImage),
  chooseVideo: promisify(wx.chooseVideo),
  request:promisify(wx.request),
  uploadFile:promisify(wx.uploadFile),
}
