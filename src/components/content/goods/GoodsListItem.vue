<template>
  <div class="goodslistitem" @click="goDetail">
    <a href="javascript:0"><!-- item.clientUrl -->
      <img v-lazy="showImage" alt @load="imageLoad"/>
      <div class="goods-title">{{item.title}}</div>
        <div class="goods-info">
          <span class="price">{{item.price}}</span>
          <span class="collect">{{item.cfav}}</span>
        </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    //判断外部传入image的路径
    showImage(){
      return this.item.image || this.item.show.img
    },

  },
  methods: {
    imageLoad(){
      // 发射到事件总线(类似Vuex,但事件总线只监听事件的变化)
      //作用:避免层级太深,方便监听子组件
      // 通过路由判断发送给的事件
      // if(this.$route.path.indexOf('/home')){
      //   this.$bus.$emit('homeImageLoad');
      // }else if(this.$route.path.indexOf('/detail'))
      //   this.$bus.$emit('detailImageLoad');
        this.$bus.$emit('itemImageLoad');
    },
    goDetail(){            
      this.$router.push('/detail/'+ this.item.iid || this.item.shop_id)
    }
  }
};
</script>
<style  scoped>
.goodslistitem{
  width: 48%;
  /* float: left; */
  /* margin-left: 2%; */
}
.goods-title{
  padding: 0 1px;
  display: -webkit-box;
  -webkit-line-clamp:1;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.goodslistitem img{
  width: 100%;
  border-radius: 5px;
}
.goods-info{
    text-align: center;
    padding: 3px 0;
}
.collect{
  position: relative;
  margin-left: 15px;
}
.collect::before{
  position: absolute;
    content: '';
    width: 14px;
    height: 14px;
    left: -15px;
    top: 1px;
    opacity: 0.8;
    background: url('../../../assets/img/common/collect.svg') no-repeat 0 0/14px 14px;
}
.price{
    color: var(--color-tint);
    padding-right: 5px;
}
</style>
