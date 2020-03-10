<template>
  <nav-bar class="nav-bar">
    <div class="navleft" slot="left" @click="backClick">
      <img src="@/assets/img/common/back.svg" alt />
    </div>
    <div class="navcenter" slot="center">
      <span
        v-for="(item,index) in navList"
        :key="index"
        @click="navBarClick(index)"
        :class="{highColor:currentIndex === index}"
      >{{item}}</span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      navList: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
      NavBar
  },
  methods: {
    // 点击切换nav
    navBarClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    // 点击back()
    backClick() {
      this.$router.back();
    }
  }
};
</script>
<style  scoped>
.highColor {
  color: var(--color-tint);
}
.navleft {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
}
.navleft img {
  width: 40%;
  height: 40%;
}
.navcenter {
  display: flex;
  font-size: 16px;
}
span {
  flex: 1;
}
</style>
