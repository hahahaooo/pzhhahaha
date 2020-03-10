<template>
  <div class="detail">
    <detail-nav-bar ref="nav" class="detail-nav-bar" @titleClick="titleClick"></detail-nav-bar>
    <scroll ref="scroll" class="content" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-params-info :goods-params="goodsParams" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./children/DetailNavBar";
import DetailSwiper from "./children/DetailSwiper";
import DetailBaseInfo from "./children/DetailBaseInfo";
import DetailShopInfo from "./children/DetailShopInfo";
import DetailGoodsInfo from "./children/DetailGoodsInfo";
import DetailParamsInfo from "./children/DetailParamsInfo";
import DetailCommentInfo from "./children/DetailCommentInfo";
import DetailBottomBar from "./children/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  goodsInfo,
  shopInfo,
  GoodsParams,
  getRecommend
} from "network/detail.js";

import { itemListenerMixin, backTopMixin } from "common/mixin.js";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParams: {},
      commentInfo: [],
      recommends: [],
      themetTopYs: [],
      currentIndex: null
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin, backTopMixin], //混入Mixin,减少代码的重复
  created() {
    //获取商品id,要跟index的路由参数一致iid
    this.iid = this.$route.params.iid;
    this.getDetail();
    this.getRecommend();
  },
  mounted() {},
  updated() {},
  destroyed() {
    //deactivated要缓存了才能触发
    this.$bus.$off("itemImageLoad", this.itemImagListener);
  },
  methods: {
    // ......mapActions({add:'addCart'})  调用add()
    ...mapActions(["addCart"]),
    /**
     *数据获取相关方法
     */
    // 获取详情数据
    getDetail() {
      getDetail(this.iid).then(res => {
        const data = res.result;
        // 轮播图数据图片
        this.topImages = data.itemInfo.topImages;

        // 获取商品信息
        this.goods = new goodsInfo(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 获取店铺信息
        this.shop = new shopInfo(data.shopInfo);
        // 获取商品详细信息
        this.detailInfo = data.detailInfo;
        // 获取产品参数
        this.goodsParams = new GoodsParams(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list;
        }
      });
    },
    // 获取推荐商品
    getRecommend() {
      getRecommend().then(res => {
        this.recommends = res.data.list;
      });
    },
    /**
     *事件监听相关方法
     */
    // 图片加载完成
    imageLoad() {
      //父子组件监听图片加载，也达到了防抖效果
      this.$refs.scroll.refresh();
      this.$nextTick(() => {
        // 保证$el有值
        this.themetTopYs = [];
        this.themetTopYs.push(0);
        this.themetTopYs.push(this.$refs.params.$el.offsetTop - 49);
        this.themetTopYs.push(this.$refs.comment.$el.offsetTop - 49);
        this.themetTopYs.push(this.$refs.recommend.$el.offsetTop - 49);
        this.themetTopYs.push(Number.MAX_VALUE);
      });
    },
    // 点击标题内容自动置顶
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themetTopYs[index], 100);
    },
    // 内容滚动显示对应的标题
    contentScroll(position) {
      // 获取y值
      const positionY = -position.y;
      let length = this.themetTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themetTopYs[i] &&
          positionY < this.themetTopYs[i + 1]
        ) {
          // this.currentIndex !==i 不等于i时才打印
          this.currentIndex = i;
          // 绑定nav
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //是否显示回到顶部
      this.listenShowBack(position);
    },
    //加入购物车事件
    addToCart() {
      // 1.获取购物需要展示的东西
      // const product = {};
      // product.image = this.topImages[0];
      // product.title = this.goods.title;
      // product.desc = this.goods.desc;
      // product.price = this.goods.newPrice;
      // //iid一定要传进去的，因为购买的时候需要传到服务器上
      // product.iid = this.iid;
      const product = {
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.newPrice,
        //iid一定要传进去的，因为购买的时候需要传到服务器上
        iid: this.iid
      };

      // 2.将商品添加到购物车里面(1.Promise,2.mapActions)
      // console.log(product);
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart',product)
      this.addCart(product).then(res => {
        console.log(this.$toast);
        // 3.添加到购物车成功
        this.$toast.show(res, 2000);
      });
      // this.$store.dispatch("addCart", product).then(res => {
      //   console.log(res);
      // });

      
    }
  }
};
</script>
<style  scoped>
.detail {
  padding-bottom: 49px;
  padding-top: 44px;
  position: relative;
  z-index: 999;
  background-color: #fff;
}
.content {
  height: calc(100vh - 49px);
}
.detail-nav-bar {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  background: #fff;
}
</style>
