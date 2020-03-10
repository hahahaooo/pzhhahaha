<template>
  <div class="tabbar-item" @click="tabItemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#ff5777"
    }
  },
  data() {
    return {};
  },
  components: {},
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    tabItemClick() {
      this.$router.replace(this.path);
    }
  }
};
</script>
<style scoped>
.active {
  color: #ff8198;
}
.tabbar {
  display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
  display: -moz-box; /* Firefox 17- */
  display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
  display: -moz-flex; /* Firefox 18+ */
  display: -ms-flexbox; /* IE 10 */
  display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -1px 1px #ccc;
}
.tabbar .tabbar-item {
  flex: 1;
  height: 49px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content:space-around; */
  font-size: 14px;
}
.tabbar-item img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-top: 3px;
}
.tabbar-item div {
  margin-top: 1px;
}
</style>
