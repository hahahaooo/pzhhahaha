import { request } from './request'
import md5 from 'blueimp-md5'//加密插件
// 验证手机号是否被注册
export function comparedPhone(phone) {
  request({
    url: '/user/phone',
    method:'post',
    params:{
      phone
    }
  })
}

// 告诉服务器发送验证码
export function tellSendCode(phone) {
  request({
    url: '/user/code',
    method:'post',
    params:{
      phone
    }
  })
}

// 验证码规定时间有效性验证
export function checkCode(phone,code){
  request({
    url:'/user/checkCode',
    method:'post',
    params:{
      phone,
      //对于验证码或者密码这些东西都要传输加密(MD5不可逆转加密)
      //1.MD5靠不住(网上有很多碰撞检测数据解密的方式)，服务器都要二次加密
      //2.服务器生成验证码的时候，数据库中存储的就是MD5二次加密的结果
      code:md5(code)
    }
  })
}

// 注册
export function register(options = {}) {
  request({
    url: '/user/register',
    method:'post',
    params:{
      options
    }
  })
}

// 登录
export function login(account,password,type = 1) {
  request({
    url: '/user/login',
    method:'post',
    params:{
      account,
      password:md5(password),
      type
    }
  })
}