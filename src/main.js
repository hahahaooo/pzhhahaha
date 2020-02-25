import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import { request } from './network/request'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,     //$route
  store,       //$store
  render: h => h(App)
})
// 使用全局的axios和对应的配置进行网络请求
// axios({
//   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
//   method: 'get'
// }).then(res => {
//   console.log(res);
// })

// axios({
//   url: 'https://api.zbztb.cn/api/public/v1/categories',
//   params:{
//     type:'',
//     page:1
//   }
// }).then(res => {
//   console.log(res);
// })

// axios并发请求
// axios.all([axios({
//   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata'

// }), axios({
//   url: 'https://api.zbztb.cn/api/public/v1/categories'
// })]).then(results => {
//   console.log(results);
// })
// spread()把数组分成两个单独的数据
// axios的配置
// axios.defaults.baseURL = "https://api.zbztb.cn/api/public/v1"
// axios.defaults.timeout = 3000
// axios.all([axios({
//   url: '/home/swiperdata'

// }), axios({
//   url: '/categories'
// })]).then(axios.spread((res1, res2) => {
//   console.log(res1);
//   console.log(res2);

// }))

// 创建对应的axios实例
// const instance1 = axios.create({
//   baseURL: 'https://api.zbztb.cn/api/public/v1',
//   timeout: 5000
// })

// 创建多个axios实例
// instance1({
//   url: 'https://api.apiopen.top/musicRankingsDetails?type=1'
// }).then(res => {
//   console.log(res);
// }).catch(err => {
//   console.log(err);
// })

// const instance2 = axios.create({

// })
// instance2({
//   url: 'https://api.apiopen.top/musicRankingsDetails?type=1'
// }).then(res => {
//   console.log(res);

// })

// request({ url: '' },
//   res => console.log(res),
//   err => {
//     console.log(err);

//   });

// request({
//   baseConfig:{url:"/musicRankingsDetails?type=1"},
//   success(res){
//       console.log(res);
      
//   },
//   failure(err){
//       console.log(err);
      
//   }
// })
request({
  url:"/home/multidata"
}).then(res => {
    console.log(res);
    
}).catch(err => {
  console.log(err);
  
})