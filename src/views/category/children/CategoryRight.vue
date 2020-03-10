<template>
  <div class="category-content">
    <div class="category-main">
      <div class="category-item" v-for="(item,index) in rightContent.list" :key="index">
        <img :src="item.image" alt />
        <div class="text">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CategoryRight",
  props: {
    rightContent: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["categoryInfo"])
  }
};
</script>
<style  scoped>
.category-main {
  width: 200px;
  padding: 10px 0 49px 0;
}
.category-item {
  float: left;
  margin-left: 30px;
  margin-top: 20px;
}

img {
  width: 70px;
}
.text {
  color: #333;
  text-align: center;
  font-size: 13px;
  margin-top: 5px;
}
</style>
