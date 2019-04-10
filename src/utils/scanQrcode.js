const getParamByName = function (name, url) {
  let match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' ').replace('#', ''));
}


export const storeQrcode = {
  path: 'http://wechat.mrgo.club/mrgostore',
  goalPage: 'offlineStore',
  goalfullPage: 'pages/offlineStroe/index',
  storeId: function (qrcodeUrl) {
    return getParamByName('id', qrcodeUrl)
  },
  scanAction: function (storeId) {//请求开门
    return new Promise((resolve, reject) => {
      this.wxRequest.post.call(this, this.wxUrl.openDoor, {
        needToken: true,
        id: storeId,
        type: 1
      }).then(res => resolve(res), res => reject(res))
    })
  }
}

export const goodQrcode = {
  path: 'http://wechat.mrgo.club/mrgogood',
  goalPage: 'offlineSCar',
  goalfullPage: 'pages/offlineSCar/index',
  goodId: function (qrcodeUrl) {
    return getParamByName('id', qrcodeUrl)
  },
  scanAction: function (goodId) {//请求商品信息
    return new Promise((resolve, reject) => {
      this.wxRequest.get.call(this, this.wxUrl.getCommodity, {
        needToken: true,
        id: goodId,
      }).then(res => resolve(res), res => reject(res))
    })
  }
}

export function scanToPage(isLogin, qrcodeUrl, duration) {

  //如果路径是空的，登录后跳转到首页
  if (!isLogin) {
    this.wxNavigate.waitRedirectToage('login', '', duration, {qrcodeUrl: encodeURIComponent(qrcodeUrl),redirectPage:'index'})
    // return
  }else{
    this.wxNavigate.waitRedirectToage('index', '', duration, {qrcodeUrl: encodeURIComponent(qrcodeUrl),tabIndex:1})
    // this.wxNavigate.waitRedirectToage('index', '', duration,)
  }



  // if (qrcodeUrl.startsWith(storeQrcode.path)) {
  //   this.wxNavigate.waitRedirectToage(storeQrcode.goalPage, '', duration, {qrcodeUrl: encodeURIComponent(qrcodeUrl)})
  // } else {
  //   this.wxNavigate.waitRedirectToage('index', '', duration,)
  // }


  // this.wxPromise.setTimeout(duration).then(res => {
  //   if (!isLogin) {
  //     this.wxNavigate.redirectToPage('login', {qrcodeUrl: encodeURIComponent(qrcodeUrl)})
  //     return
  //   }
  //   if (qrcodeUrl.startsWith(storeQrcode.path)) {
  //     this.wxNavigate.redirectToPage(storeQrcode.goalPage, {qrcodeUrl: encodeURIComponent(qrcodeUrl)})
  //   } else {
  //     this.wxNavigate.redirectToPage('index')
  //   }
  // })
}


// export function scanDoor(storeId) {
//   this.wxRequest.post.call(this, this.wxUrl.openDoor, {needToken: true, id: storeId, type: 1}).then(res => {
//     console.log('openDoor success', res)
//     wx.showToast({title: "欢迎光临", icon: 'none'})
//     this.wxUtil.playWelcomeVoice()
//   }, res => {
//     if (res.data.status === 401) {
//       this.wxNavigate.navigateToPage('login')
//     }
//     console.log('openDoor fail', res)
//   })
// }


//
// export function scanGood() {
//
//   return new Promise()
// }
//
//
// export function scanBackUrl(url) {
//   let queryString = {}
//   let params = ''
//   let path = ''
//   if (url.indexOf("?") !== -1) {
//     path = url.split("?")[0];
//     params = url.split("?")[1];
//   } else {
//     path = url
//   }
//   let vars = params.split("&");
//   for (let i = 0; i < vars.length; i++) {
//     let pair = vars[i].split("=");
//     if (pair[0])
//       queryString[pair[0]] = pair[1]
//   }
//
//   return {
//     path: path,
//     params: queryString
//   }
// }
