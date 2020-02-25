import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import moduleA from './modules/moduleA'
// 安装插件
Vue.use(Vuex)

// 提取store的state
const state = {
  counter: 1000,
  students: [
    { id: 100, name: 'Jack', height: 1.66, age: 15 },
    { id: 110, name: 'Kobe', height: 2.16, age: 20 },
    { id: 120, name: 'Curry', height: 1.89, age: 18 },
    { id: 130, name: 'Jams', height: 2.20, age: 21 }
  ],
  info: {
    name: 'Sam', age: 23, height: 1.90
  }
}
// 创建实例
const store = new Vuex.Store({
  // 保存状态
  state,
  // 方法
  mutations,
  // store的计算属性
  getters,
  // 异步操作
  actions,
  modules: {
    a: moduleA
  }
})

// 导出实例对象
export default store