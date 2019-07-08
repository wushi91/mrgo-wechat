
//
// const host = 'http://192.168.8.20:5555'//亚峰测试服
// const host = 'http://47.107.185.37:5555'//正式服
// const host = 'http://192.168.8.101:5555'//李伟测试服


//线上
const host = 'https://wechat.mrgo.club'//正式服
// const host = 'https://testwechat.mrgo.club'//测试服
const devHost = 'https://testwechat.mrgo.club' //开发者选择，不会对系统造成印象
const prodHost = 'https://wechat.mrgo.club' //生产环境的服务器地址

const version = '1.0.3'//项目版本号
const reviewV = 'c'//审核版本号，测试版本没有审核版本号


const last_version = '1.0.2'
const last_reviewV = 'b'


const genVersionPrefix = (host,version)=>{
  if(host ==='https://wechat.mrgo.club'){
    return '正式版'+version+'.'+reviewV
  }else{
    return '测试版'+version+'.'+reviewV
  }
}


const developers = ['13822542317','17748686446','18718574889']

const isDeveloper = phone=>{
  if(developers.indexOf(phone.toString())>=0){
    return true
  }
  return false
}

const genHost = function () {
  let storageHost = wx.getStorageSync('storageHost')
  if(!storageHost){//true的时候为正式服
    return prodHost
  }else{
    return devHost
  }
}



export default {
  host,
  genHost:genHost,
  version:genVersionPrefix(host,version),
  reviewVersion:reviewV,
  isDeveloper,
  last_version,
  last_reviewV
}
