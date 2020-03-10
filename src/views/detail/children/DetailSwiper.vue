<template>
  <div class='detailSwiper'>
      <swiper class="swiperH">
        <swiper-item v-for="(item,index) in topImages" :key="index">
          <img :src="item" alt="">
        </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper , SwiperItem } from 'components/common/swiper/index.js'
export default {
  name: 'DetailSwiper',
  props: {
    topImages:Array,
    default(){
      return []
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>
<style  scoped>
.swiperH {
    height: 260px;
    overflow: hidden;
}
</style>
