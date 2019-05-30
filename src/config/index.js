
//
// const host = 'http://192.168.8.20:5555'//亚峰测试服
// const host = 'http://47.107.185.37:5555'//正式服
// const host = 'http://192.168.8.101:5555'//李伟测试服


//线上
// const host = 'https://wechat.mrgo.club'//正式服
const host = 'https://testwechat.mrgo.club'//测试服

const version = '1.0.1'//项目版本号
const reviewV = 'A'//审核版本号，测试版本没有审核版本号
// const reviewV = 'B'
// const reviewV = 'C'
// const reviewV = 'D'


const genVersionPrefix = (host,version)=>{
  if(host ==='https://wechat.mrgo.club'){
    return 'V'+version+reviewV
  }else{
    return '体验/测试版t.'+version
  }
}






export default {
  host,
  version:genVersionPrefix(host,version),
  reviewVersion:reviewV
}
