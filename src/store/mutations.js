// 引入mutatios常量
import { INCREMENT, DECREMENT } from './mutations-types'
export default {

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
}