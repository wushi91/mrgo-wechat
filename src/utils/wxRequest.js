import Fly from 'flyio/dist/npm/wx'

const fly = new Fly()
const Promise = require('es6-promise').Promise

import store from '@/store/index'

/**
 *
 * needToken:true必须要token的处理（有些接口不是非必须token，这个时候token需要手动传入）
 * cacheFirst:true这个是接口首先获取缓存的数据
 *
 **/


//添加请求拦截器
fly.interceptors.request.use(request => {

  // request.headers["Content-Type"] = 'application/json';

  if (request.body) {
    if(request.body.contentType){
      request.headers["Content-Type"] = request.body.contentType;
      delete request.body["Content-Type"];
    }else{
      request.headers["Content-Type"] = 'application/x-www-form-urlencoded';
    }
    if (request.body.fid === '') delete request.body['fid'];

    if (request.body.needToken) {
      request.headers["Authorization"] = store.getters.token;
      delete request.body['needToken'];
    }
  }

  return request;
})


//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  response => {
    // if (response.data.code === "1001" || response.data.code === "1002") {
    //   console.log('身份失效，重新登录')
    // } else if (response.data.code === '400') {
    //   console.log('参数错误：' + response.data.msg)
    // }

    // if (response.data.code !== '00000') {
    //   console.log('error:' + response.data.msg)
    // }

    return response
  },
  (err) => {
    //发生网络错误后会走到这里
    // console.log('网络错误')
  }
)


export default {
  fly,

  post: function (url, data) {
    return new Promise((resolve, reject) => {
      fly.post(url, data).then(res => {
        if (res.data.status === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })

    })
  },

  get: function (url, data) {
    return new Promise((resolve, reject) => {
      fly.get(url, data).then(res => {
        if (res.data.status === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(err => {
        reject(err)
      })

    })
  },


}

