export default {
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
}