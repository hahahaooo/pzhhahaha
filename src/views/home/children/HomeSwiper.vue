<template>
    <swiper class="home-swiper">
    <swiper-item v-for="(item,index) in cbanners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgaeLoad">
      </a>
    </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  name: "homeswiper",
  props: {
    cbanners: {
      type: Array
    }
  },
  data () {
    return {
      isLoad:false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    //只要有一次发出去就行了
    imgaeLoad(){
      if(!this.isLoad){
        this.$emit('SwiperImageLoad')
        this.isLoad=true
      }
      
    }
  }
};
</script>
<style  scoped>
</style>
