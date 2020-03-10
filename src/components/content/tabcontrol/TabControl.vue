<template>
  <div class='tab-control'>
      <div @click="controlClick(index)" class="control-title" v-for="(item,index) in titles" :key="index" >
          <span :class="{'contrActive':currentIndex === index}">{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'tabControl',
  props: {
    titles:{
      type:Array,
      default(){
        return []
      } 
    }
  },
  data () {
    return {
      currentIndex:0
    }
  },
  methods: {
    controlClick(index){
      this.currentIndex=index;
      this.$emit('tabClick',index)
    }
  }

}
</script>
<style  scoped>

.contrActive{
  color: var(--color-high-text);
 border-bottom:3px solid currentColor;
}

.tab-control{
    display: flex;
    height: 50px;
    text-align: center;
    line-height: 50px;
    /* padding: 10px 0; */
    background-color: #fff;
    z-index: 999;
}
.control-title{
    flex: 1;
}
.control-title span{
    /* padding: 8px; */
}
</style>
