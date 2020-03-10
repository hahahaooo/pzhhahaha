<template>
  <div class='recommend'>
      <div class="remd-item" v-for="(item,index) in recommends" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
  </div>
</template>

<script>
export default {
  name: 'recommendView',
  props: {
      recommends:{
        type:Array,
        default(){
          return[]
        }
      }
  },  
  data(){
    return {}
  },
  components: {},
  methods: {}
}
</script>
<style  scoped>
.recommend{
  display: flex;
  padding: 12px 0 28px 0;
  border-bottom: 10px solid #eee;
}
.remd-item{
  width: 25%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.remd-item img{
  width: 76%;
  padding-bottom: 10px;
}
</style>
