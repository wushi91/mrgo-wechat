
const host = 'http://192.168.8.7:5555'
const apiVersion = '/mobile/v1'//测试服


// const host = 'https://api.feitengshidai.com/coach-api'//正式服




export default {



  //get请求
  checkLogin: `${host}/console/v1/users/getUserInfo`,


  //post请求
  login :`${host+apiVersion}/users/wechatLogin`, //登陆
  editUser :`${host+apiVersion}/users/edit`, // 上传用户信息POST /v1/users/edit




  openDoor :`${host+apiVersion}/store/sendMsgToQueueIn`, //开门
  // coach_coachId: coachId => { return `${host}/coach/${coachId}` },// 教练详情
  addPost:`${host+apiVersion}/addPost`,//新建帖子



  //上传



}
