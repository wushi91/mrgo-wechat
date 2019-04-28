
const page = pageUrl =>`/pages/${pageUrl}/index`
const packageAPage = pageUrl =>`/packageA/pages/${pageUrl}/index`

const navigateToPage = (pageUrl,data)=>{
  if (data) {
    // encodeURIComponent()
    wx.navigateTo({url: page(pageUrl) + "?data=" + JSON.stringify(data)})
  }else{
    wx.navigateTo({url: page(pageUrl)})
  }
}

const navigateToPackageAPage = (pageUrl,data)=>{
  if (data) {
    // encodeURIComponent()
    wx.navigateTo({url: packageAPage(pageUrl) + "?data=" + JSON.stringify(data)})
  }else{
    wx.navigateTo({url: packageAPage(pageUrl)})
  }
}

const waitNavigateToPage = (pageUrl,toastText,duration=1500,data)=>{
  if(toastText)wx.showToast({title:toastText,duration:duration,icon:'none'})
  setTimeout(function () {
    if (data) {
      wx.navigateTo({url: page(pageUrl) + "?data=" + JSON.stringify(data)})
    }else{
      wx.navigateTo({url: page(pageUrl)})
    }
  },duration)
}

const waitRedirectToage = (pageUrl,toastText,duration=1500,data)=>{
  if(toastText)wx.showToast({title:toastText,duration:duration,icon:'none'})
  setTimeout(function () {
    if (data) {
      wx.redirectTo({url: page(pageUrl) + "?data=" + JSON.stringify(data)})
    }else{
      wx.redirectTo({url: page(pageUrl)})
    }
  },duration)
}

const redirectToPage = (pageUrl,data)=>{
  if (data) {
    wx.redirectTo({url: page(pageUrl) + "?data=" + JSON.stringify(data)})
  }else{
    wx.redirectTo({url: page(pageUrl)})
  }
}

const goBack = (duration=100)=>{
  setTimeout(function () {
    wx.navigateBack({
      delta: 1
    })
  }, duration)
}


export default {
  navigateToPage,
  redirectToPage,
  waitNavigateToPage,
  waitRedirectToage,

  //分包
  navigateToPackageAPage,
  goBack
}

