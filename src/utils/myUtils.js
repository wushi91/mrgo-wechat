
// let  welcomeVoice = null
// function creatWelcomeVoice(){
//   welcomeVoice = wx.createInnerAudioContext()
//   welcomeVoice.onPlay(() => {
//     console.log('开始播放')
//   })
//
//   welcomeVoice.onEnded(()=>{
//     console.log('welcomeVoice onStop 结束')
//     welcomeVoice.destroy()
//   })
//   welcomeVoice.onError((res) => {
//     console.log(res.errMsg)
//     console.log(res.errCode)
//   })
//   return welcomeVoice
// }



const windowWidth = wx.getSystemInfoSync().windowWidth


export function playWelcomeVoice(src = 'static/wav/welcome-mrgo.wav') {
  let  welcomeVoice = wx.createInnerAudioContext()
  console.log('播放playWelcomeVoice')
  welcomeVoice.src = src
  welcomeVoice.obeyMuteSwitch = false
  // welcomeVoice.play()
  wx.setInnerAudioOption({
    obeyMuteSwitch: false, success: () => {
      welcomeVoice.play()
    }
  })
}


export function rpx2px(rpx) {
  return rpx / 750 * windowWidth;
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

function encodeUTF8(s) {
  var i, r = [], c, x;
  for (i = 0; i < s.length; i++)
    if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
    else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
    else {
      if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
        c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
          r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
      else r.push(0xE0 + (c >> 12 & 0xF));
      r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
    };
  return r;
};

// 字符串加密成 hex 字符串
export function sha1(s) {
  var data = new Uint8Array(encodeUTF8(s))
  var i, j, t;
  var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
  s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
  for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
  s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
  s[l - 1] = data.length << 3;
  var w = [], f = [
      function () { return m[1] & m[2] | ~m[1] & m[3]; },
      function () { return m[1] ^ m[2] ^ m[3]; },
      function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
      function () { return m[1] ^ m[2] ^ m[3]; }
    ], rol = function (n, c) { return n << c | n >>> (32 - c); },
    k = [1518500249, 1859775393, -1894007588, -899497514],
    m = [1732584193, -271733879, null, null, -1009589776];
  m[2] = ~m[0], m[3] = ~m[1];
  for (i = 0; i < s.length; i += 16) {
    var o = m.slice(0);
    for (j = 0; j < 80; j++)
      w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
        t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
        m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
    for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
  };
  t = new DataView(new Uint32Array(m).buffer);
  for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);

  var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
    return (e < 16 ? "0" : "") + e.toString(16);
  }).join("");

  return hex;
};


//形成key=value&key1=value&...的字符串
export function getRawString(args) {
  let keys = Object.keys(args);
  keys = keys.sort()
  let newArgs = {};
  keys.forEach(function (key) {
    newArgs[key] = args[key];
  });

  let string = '';
  for (let k in newArgs) {
    //如果参数的值为空不参与签名
    if (newArgs[k]) {
      string += '&' + k + '=' + newArgs[k];
    }
  }
  string = string.substr(1);
  return string;
}

export default {
  rpx2px, getQueryString, playWelcomeVoice,sha1,getRawString
}
