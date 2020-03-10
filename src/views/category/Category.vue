<template>
  <div class="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="category-content">
      <scroll class="content menu">
        <category-left @selectItem="selectItem" />
      </scroll>
      <scroll ref="scroll" class="content rightContent">
        <category-right :right-content="rightContent" />
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CategoryLeft from "./children/CategoryLeft";
import CategoryRight from "./children/CategoryRight";
import Scroll from "components/common/scroll/Scroll";

import { getCategoryInfo } from "network/category";

export default {
  name: "category",
  data() {
    return {
      rightContent: {}
    };
  },
  components: {
    CategoryLeft,
    CategoryRight,
    NavBar,
    Scroll
  },
  methods: {
    selectItem(maitKey) {
      getCategoryInfo(maitKey).then(res => {
        this.rightContent = res.data;
        // console.log(this.rightContent);
        this.$refs.scroll.scrollTo(0,0,500);
      });
    }
  },
  deactivated () {

    this.$bus.$off('itemClick')
  }
};
</script>
<style  scoped>
.category-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  height: calc(100vh - 93px);
  overflow: hidden;
}
.category-content {
  display: flex;
}
.menu {
  width: 80px;
}
.rightContent {
  flex: 1;
}
</style>
