<template>
  <div class="cart" slot="center">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <div class="center" slot="center">
        购物车
        <span v-if="length">({{length}})</span>
      </div>
    </nav-bar>
    <!-- 列表 -->
    <scroll ref="scroll" class="content">
      <cart-list />
    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import CartList from "./children/CartList";
import CartBottomBar from "./children/CartBottomBar";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";

export default {
  name: "cart",
  data() {
    return {};
  },
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar
  },
  methods: {
  },
  computed: {
    // 虽然封装了getters但是用的时候还要写这么长的计算属性
    // cartLength(){
    //   return this.$store.getters.cartLength
    // }
    // mapGetters辅助函数
    // 两种语法
    // ...mapGetters([
    //   'cartLength'
    // ])
    ...mapGetters({
      length: "cartLength"
    })
  },
    activated() {
    this.$refs.scroll.refresh();
  }
};
</script>
<style  scoped>
.content {
  height: calc(100vh - 44px - 40px);
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
</style>
