<template>
  <div class="category" v-if="categoryList">
    <div
      class="cate-item"
      v-for="(item,index) in categoryList"
      :key="index"
      @click="itemClick(index)"
      :class="{active:currentIndex === index}"
    >{{item.title}}</div>
  </div>
</template>

<script>
import { getCategory } from "network/category.js";
export default {
  name: "CategoryLeft",
  props: {},
  data() {
    return {
      categoryList: [],
      currentIndex: 0,
      isActive: false,
      currMaitKey:null
    };
  },
  mounted() {
    this.getCategory();
  },
  watch: {
    categoryList(newVal,oldVal){
      this.categoryList = newVal
      newVal && this.itemClick(0)
    }
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        if (res) {
          this.categoryList = res.data.category.list;
          console.log(res);
          
        }
      });
    },
    itemClick(index) {
      // 保存当前的index
      this.currentIndex = index;
      // 点击向父组件发送maitKey
      this.currMaitKey = this.categoryList[index].maitKey;
      this.$emit('selectItem',this.currMaitKey)

      // 发送事件总线
      this.$bus.$emit('itemClick')
    }
  }
};
</script>
<style  scoped>
.category {
  width: 100px;
}
.cate-item {
  width: 80px;
  height: 40px;
  color: #333;
  font-weight: 500;
  background-color: rgba(167, 165, 165, 0.1);
  line-height: 40px;
  text-align: center;
  box-sizing: border-box;
}
.active {
  border-left: 3px solid red;
  color: var(--color-high-text);
  background-color: #fff;
}
</style>
