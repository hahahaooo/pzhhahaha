<template>
  <div class='HelloVuex'>
    <h2>我是HelloVuex组件</h2>
    <h2>{{$store.state.counter}}</h2>
    <h2>{{$store.getters.yearOver20}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloVuex', 
  data(){
    return {}
  },
  components: {},
  methods: {}
}
</script>
<style  scoped>
</style>
