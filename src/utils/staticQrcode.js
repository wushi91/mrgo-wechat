/*
* 静态的二维码的字符串获取
* 格式要求：loginCode&暗文
* {"m":xx,"e":失效时间戳}   暗文：RSA公钥加密
*
* 公钥：MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJlAExGEPaDWBReWiTD2RRmRlZIJEbfX5fOjXEuUJIAm2VcD+OQCUYm6ad46Mcujxzg03xWJf8V8QvNThOsrxMcCAwEAAQ==
* */


import {JSEncrypt} from '@/common/js/wx_jsencrypt'

const RSA_PUBLIC_KEY = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJlAExGEPaDWBReWiTD2RRmRlZIJEbfX5fOjXEuUJIAm2VcD+OQCUYm6ad46Mcujxzg03xWJf8V8QvNThOsrxMcCAwEAAQ=='
const encryptByRsa = (text,publicKey) => {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(text);
}

const getEncryptQrcodeString = function(mobile){
  let expiresTime = new Date().getTime() + 1*60*1000//失效时间为当前时间 1分钟后
  let mtext = JSON.stringify({m:mobile,e:expiresTime})//需要加密的数据
  let encrypt = encryptByRsa(mtext,RSA_PUBLIC_KEY)
  return 'loginCode&'+encrypt
}
export default {

  getEncryptQrcodeString
}

