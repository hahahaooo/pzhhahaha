import Vue from 'vue'
import Vuex from 'vuex'

// 引入mutatios常量
import { INCREMENT, DECREMENT } from './mutations-types'
// 安装插件
Vue.use(Vuex)

const moduleA = {
  state: {
    name: '吉姆'
  },
  getters: {
    fullname(state) {
      return state.name + '-华莱士'
    },
    fullname2(state, getters) {
      return getters.fullname + "汤姆森"
    },
    fullname3(state, getters, rootState) {
      return getters.fullname2 + rootState.counter
    }
  },
  mutations: {
    mUpDateName(state, payload) {
      state.name = payload
    }
  },
  actions: {
    updatedName(context) {
      console.log(context);
      
      setTimeout(() => {
        context.commit('mUpDateName','wangwu')
      }, 1000);
    }
  }
}
// 创建实例
const store = new Vuex.Store({
  // 保存状态
  state: {
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
  },
  // 方法
  mutations: {
    // mutations的常量
    [INCREMENT](state) {
      state.counter++
    },
    [DECREMENT](state) {
      state.counter--
    },
    // 带参数
    incrementCount(state, payload) {
      state.counter += payload.count
    },
    studentPush(state, student) {
      state.students.push(student)
    },
    // mutations的载荷payload
    addAddress(state, payload) {
      console.log(payload);
      // state.info.name = 'ME'
      // state.info['address']='休斯顿'    //界面不是响应式的
      Vue.set(state.info, 'address', '洛杉矶')    //添加属性
      Vue.set(state.info, payload.birthday, payload.month)    //添加属性
      // delete(state.info.age)//也不是响应式的
      Vue.delete(state.info, 'age')
    },
    updatedInfo(state, msg) {
      state.info.name = msg   //也是响应式
    }
  },
  // store的计算属性
  getters: {
    powerCounter(state) {
      return state.counter * state.counter
    },
    // 获取年龄小于20岁的人
    yearOver20(state) {
      return state.students.filter(v => v.age < 20).map(v => v.name)
    },
    // 获取年龄小于20岁的人的个数
    yearOver20Length(state, getters) {    //参数调用getters
      return getters.yearOver20.length
    },
    // 年龄大于age的人
    //getters不接收外面的参数,但是可以创建function接收参数
    yearOverAgeStu: state => {
      return age => {
        return state.students.filter(s => s.age > 20)
      }
    }
  },
  // 异步操作
  actions: {
    aUpdateInfo(context, payload) {   //context=>store
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('updatedInfo', payload)
          console.log(payload);
          resolve('里面执行完了')
        }, 1000);
      })
    }
  },

  modules: {
    a: moduleA
  }
})

// 导出实例对象
export default store