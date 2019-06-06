const genePageUrl = {
  main: pageName => `/pages/${pageName}/index`,
  packageA: pageName => `/packageA/pages/${pageName}/index`
}

const page = {
  //package main
  test: genePageUrl.main('text'),
  index: genePageUrl.main('index'),
  onlineStore: genePageUrl.main('onlineStore'),
  login: genePageUrl.main('login'),
  operateResult: genePageUrl.main('operateResult'),
  orderDetail: genePageUrl.main('orderDetail'),
  offlineSCar: genePageUrl.main('offlineSCar'),
  orderList: genePageUrl.main('orderList'),
  offlineStore: genePageUrl.main('offlineStore'),
  userProtocol: genePageUrl.main('userProtocol'),

  //packageA
  addOrderComment: genePageUrl.packageA('addOrderComment'),
  buyVIP: genePageUrl.packageA('buyVIP'),
  aboutUs: genePageUrl.packageA('aboutUs'),
  personInfo: genePageUrl.packageA('personInfo'),
}

const pageUrl = pageName =>page[pageName]

const pageParam = data =>{
  let param = ''
  for(let key in data){
    if(!param){
      param =  `?${key}=${data[key]}`
    }else{
      param =  `${param}&${key}=${data[key]}`
    }
  }
  return param
}

const navigateToPage = (pageName, data) => {
  wx.navigateTo({url: pageUrl(pageName)+pageParam(data)})
}

const redirectToPage = (pageUrl,data)=>{
  wx.redirectTo({url: pageUrl(pageName)+pageParam(data)})
}


//decodeURIComponent
//JSON.stringify(data) JSON.parse(options.data)

export default {
  navigateToPage,redirectToPage
}

