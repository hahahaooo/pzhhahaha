<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// 使用时在scroll上添加content类,并设置height:calc(100vh - 93px)
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {    //监听滚动
      type: Number,
      default: 0 //不是每个使用BScroll都要监听滚动事件,默认不监听
    },
    pullUpLoad: {     //下拉刷新
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null //BScroll对象
    };
  },
  mounted() {
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType, //0或1不监听,2只有触屏时才监听,3触屏或离开后的惯性动作也监听
      pullUpLoad: this.pullUpLoad //开启上拉加载
    });

    // 监听滚动的位
    //严谨一点判断一下
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        //让调用者执行逻辑代码 position => (x,y)
        this.$emit("scroll", position);
      });
    }

    //监听上拉加载
    this.scroll.on("pullingUp", () => {
      // 监听到滚动到底部
      this.$emit("pullingUp");
    });
  },
  methods: {
    //以为图片加载太快，有可能scroll还没初始化完成,
    //scroll对象此时为null,Home页面就调用了就会报错找不到refresh()这个函数
    //this.scroll() &&判断scroll初始化完成才执行&&后面的函数
    //封装backTop给调用的$refs添加属性
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 上拉加载事件
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 重新渲染
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll? this.scroll.y : 0;
    }
  }
};
</script>
<style  scoped>
.wrapper {
  overflow: hidden;
}
</style>
