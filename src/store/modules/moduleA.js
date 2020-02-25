export default {
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
          context.commit('mUpDateName', 'wangwu')
        }, 1000);
      }
    }
  }