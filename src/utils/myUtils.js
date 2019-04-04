
let  welcomeVoice = null
function creatWelcomeVoice(){
  welcomeVoice = wx.createInnerAudioContext()
  welcomeVoice.onPlay(() => {
    console.log('开始播放')
  })

  welcomeVoice.onEnded(()=>{
    console.log('welcomeVoice onStop 结束')
    welcomeVoice.destroy()
  })
  welcomeVoice.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  })
  return welcomeVoice
}

export function playWelcomeVoice(src = 'static/wav/welcome-mrgo.wav') {

  welcomeVoice = null
  welcomeVoice = creatWelcomeVoice()
  // console.log('播放playWelcomeVoice')
  welcomeVoice.src = src
  welcomeVoice.obeyMuteSwitch = false
  wx.setInnerAudioOption({
    obeyMuteSwitch: false, success: () => {
      welcomeVoice.play()
    }
  })
}


export function rpx2px(rpx) {
  return rpx / 750 * wx.getSystemInfoSync().windowWidth;
}

export function getQueryString(url) {

  let queryString = {}
  let params = ''
  if (url.indexOf("?") !== -1) {
    params = url.split("?")[1];
  }


  let vars = params.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0])
      queryString[pair[0]] = pair[1]
  }

  return queryString
}



export default {
  rpx2px, getQueryString, playWelcomeVoice
}
