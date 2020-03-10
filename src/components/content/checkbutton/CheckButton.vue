<template>
  <div class='check-button'>
      <img src="@/assets/img/cart/check.svg" alt="" :class="buttonStyle">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    // 返回按钮样式
    buttonStyle(){
      return this.isChecked?'check':'not-check'
    }
  }
}
</script>
<style  scoped>
.check-button{
  overflow: hidden;
  border-radius: 50%;
}
img{
  height: 20px;
  width: 20px;
  margin-bottom:-2px;
  border-radius: 50%;
}
.not-check{
  border: 2px solid #eee;
  box-sizing: border-box;
}
.check{
  border:none;
  background-color: var(--color-tint);
  box-sizing: border-box;
}
</style>
