<template>
  <div id="banner">
    <!-- 图片 -->
    <div class="banner-item" v-if="banners[0]">
      <a :href="banners[currentIndex].link">
        <img :src="banners[currentIndex].image" />
      </a>
    </div>
    <div class="page" v-if="banners.length > 1">
      <ul>
        <li @click="gotoPage(prevIndex)">&lt;</li>
        <li
          v-for="(item,index) in banners"
          :key="index"
          @click="gotoPage(index)"
          :class="{'current':currentIndex === index}"
        ></li>
        <li @click="gotoPage(nextIndex)">&gt;</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "swiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0, //默认显示图片
      timer: null //定时器
    };
  },
  created() {
    this.runInv()
  },
  methods: {
    gotoPage(index) {
      this.currentIndex = index;
    },
    //定时器
    runInv() {
      this.timer = setInterval(() => {
        this.gotoPage(this.nextIndex);
        // console.log("下一张");
      }, 5000);
    }
  },
  computed: {
    //上一张
    prevIndex() {
      if (this.currentIndex == 0) {
        return this.banners.length - 1;
      } else {
        return this.currentIndex - 1;
      }
    },
    nextIndex() {
      if (this.currentIndex == this.banners.length - 1) {
        return 0;
      } else {
        return this.currentIndex + 1;
      }
    }
  }
};
</script>
<style  scoped>
.current{
  background-color: orange;
}
#banner{
    width: 100%;
    position: relative;
}
.banner-item img{
  width: 100%;
}
.page{
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 10px;
}
ul{
  padding: 0;
  margin: 0;
  display: flex;
  justify-content:center;
  transform: translateX(-20px);
}
li{
  list-style: none;
  width: 15px;
  height: 15px;
  background-color: #666;
  border-radius: 50%;
  margin-left: 20px;
}
</style>
