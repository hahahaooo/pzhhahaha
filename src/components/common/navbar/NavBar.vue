<template>
  <div class='nav-bar'>
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: 'navbar',
  data(){
    return {}
  },
  components: {
    NavBar
  },
  methods: {}
}
</script>
<style  scoped>
.nav-bar{
  display: flex;
  line-height: 44px;
  height: 44px;
  box-shadow: 0 1px 1px #ccc;
}
.left,.right{
  width: 60px;
}
.center{
  flex: 1;
  font-size: 18px;
  text-align: center;
}
</style>
