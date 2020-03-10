<template>
  <div id="home">
    <nav-bar class="home-nav" v-show="goods">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tabFixed"
      v-show="isTabControlFixed"
      :titles="titles=['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="LoadMore"
    >
      <home-swiper :cbanners="banners" @SwiperImageLoad="SwiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="titles=['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./children/HomeSwiper";
import RecommendView from "./children/RecommendView";
import FeatureView from "./children/FeatureView";
import GoodsList from "components/content/goods/GoodsList";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { itemListenerMixin,backTopMixin } from "common/mixin.js";
export default {
  name: "home",
  data() {
    return {
      banners: [], //轮播图
      recommends: [], //推荐
      goods: {
        //商品数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabControlFixed: false,
      scrollY: 0,
      itemImagListener: null
    };
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    NavBar,
    TabControl,
    Scroll
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    /* 获取首页多个数据 */
    this.getHomeData();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
  },
  destroyed() {
    console.log("destroyed");
  },
  activated() {
    //回到Y轴的位置
    this.$refs.scroll.scrollTo(0, this.scrollY, 0);
    // 重新调用refresh()刷新高度
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //记录离开轴的Y轴信息
    this.scrollY = this.$refs.scroll.getScrollY();

    // 取消全局事件监听,页面离开后，取消监听，其他页面接收监听时，此页面就不会触发监听事件
    // this.$bus.$off('itemImageLoad',接收全局监听事件要后触发的事件)
    this.$bus.$off("itemImageLoad");
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    // 判断y轴上滑距离,接收自子组件
    contentScroll(position) {
      this.listenShowBack(position);
      // 决定tanControl是否吸顶(position:fixed)
      this.isTabControlFixed = -position.y + 43 > this.tabOffsetTop;
    },
    //上拉加载更多,来自子组件
    LoadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp(); //调用方法
    },
    // 点击通过下标赋值currentType
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 两个tabControl需要同步，修改tabControl组件的currentIndex
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 轮播图图片加载完成监听tabControl的offsetTop
    // 所有组件都有一个属性$el:用于获取组件中的元素
    SwiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关代码
     */
    // 请求多个数据
    getHomeData() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        console.log(this.banners);
        
        this.recommends = res.data.recommend.list;
      });
    },

    // 请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //数据解析拼接
        // this.goods[type].list = [...this.goods[type].list, ...res.data.list];
        this.goods[type].list.push(...res.data.list);
        //页码加1
        this.goods[type].page += 1;
      });
    }
  },
  computed: {
    // GoodsList的绑定值
    showGoods() {
      return this.goods[this.currentType].list;
    }
  }
};
</script>
<style  scoped>
.tabFixed {
  position: fixed;
  left: 0;
  top: 44px;
  z-index: 9;
  width: 100%;
}
.content {
  height: calc(100vh - 93px);
}
#home {
  padding: 44px 0 49px 0;
  font-size: var(--font-size);
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
}
/* 很多浏览器不支持这个属性
 *移动端一般都支持
*/
/* .tab-control {
  position: sticky;
  top: 44px;
} */
</style>
