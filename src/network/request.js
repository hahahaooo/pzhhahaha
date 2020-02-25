import axios from 'axios'

export function request(config) {
  // 创建axios实例
  // return new Promise((resolve, reject) => {
  //   const instance = axios.create({
  //     baseURL: 'https://api.apiopen.top',
  //     timeout: 5000
  //   })
  //   // 发送真正的网络请求
  //   instance(config)
  //     .then(res => {
  //       console.log(res);
  //       resolve(res)
  //     }).catch(err => {
  //       console.log(err);
  //         reject(err)
  //     })
  // })
  // axios实例是一个promise对象
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/hy',
    // baseURL: 'http://106.54.54.237:8000/api/hy',
    timeout: 5000
  })
  // axios的拦截器
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求,都希望在界面显示一个请求图标
    // 3.某些网络请求(比如登录(token)),必须携带一些特殊的信息
    return config     
  }, err => {
    // console.log(err);
  })
  // axios的响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res
  }, err => {
    console.log(err);
  })
  return instance(config)
}

