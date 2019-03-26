//src/utils/net.js
// import { getToken } from '@/utils/auth'

// import { bmobConfig } from '../config/bmob';//bmob配置文件
const ajaxUrl = process.env.NODE_ENV === 'development'
  // 测试接口地址
  ? 'https://wechat.wehealth.net.cn'
  // 线上接口地址
  : 'https://wechat.wehealth.net.cn';
const ajaxs = {
  get(url, data) {
    var mtoken = wx.getStorageSync('token') 
console.log(mtoken)
    wx.showLoading({
      title: '加载中',//数据请求前loading，提高用户体验
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url:ajaxUrl + url,
        data: data,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Authorization":mtoken.token, // 让每个请求携带自定义token 请根据实际情况自行修改
          'Content-Type': 'application/json'
        }, // 设置请求的 header
        success: function (res) {
          // success
          wx.hideLoading();
          if(res.statusCode!=200){
            wx.showToast({
              title: "网络出错，稍后再试",
              icon: "none"
            });
            return false;
          }
          resolve(res.data);
        },
        fail: function (error) {
          // fail
          wx.hideLoading();
          reject(error);//请求失败
        },
        complete: function () {
          wx.hideLoading();
          // complete
        }
      })
    })
  },
  post(url, data) {
    var mtoken = wx.getStorageSync('token')
    wx.showLoading({
      title: '加载中',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: ajaxUrl + url,
        data: data,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Authorization":mtoken.token, // 让每个请求携带自定义token 请根据实际情况自行修改
          'Content-Type': 'application/json'
        }, // 设置请求的 header
        success: function (res) {
          // success
          wx.hideLoading();
          resolve(res.data);
        },
        fail: function (error) {
          // fail
          wx.hideLoading();
          reject(error);
        },
        complete: function () {
          // complete
          wx.hideLoading();
        }
      })
    })
  }
}

export default ajaxs;//暴露出来供其他文件引用