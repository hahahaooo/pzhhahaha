export default {
  aUpdateInfo(context, payload) {   //context=>store
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit('updatedInfo', payload)
        console.log(payload);
        resolve('里面执行完了')
      }, 1000);
    })
  }
}