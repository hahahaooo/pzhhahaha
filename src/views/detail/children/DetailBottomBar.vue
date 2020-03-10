<template>
  <div class='nav'>
    <div class="chat">
        <div class="icon-chat"></div>
        <div class="chat-text">客服</div>
    </div>
    <div class="shop">
      <div class="icon-shop"></div>
      <div class="shop-text">店铺</div>
    </div>
    <div class="collect">
      <div class="icon-collect"></div>
      <div class="collect-text">收藏</div>
    </div>
    <div class="cart" @click="addToCart">加入购物车</div>
    <div class="buy">购买</div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addToCart(){
      this.$emit('addCart');
      
    }
  }
}
</script>
<style  scoped>
.nav{
  background-color: #fff;
  height: 49px;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  text-align: center;
  box-shadow: 0 -1px 1px #eee;
}
.chat,.shop,.collect{
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.chat div,.shop div,.collect div{
  width: 100%;
  flex: 1;
}

.chat .icon-chat{
  height: 20px;
  background: url('~assets/img/detail/detail_bottom.png') no-repeat 10px -50px/50% 150px;
  overflow: hidden;
}
.shop .icon-shop{
  background: url('~assets/img/detail/detail_bottom.png') no-repeat 10px -96px/50% 150px;
}
.collect .icon-collect{
  background: url('~assets/img/detail/detail_bottom.png') no-repeat 10px 3px/50% 150px;
}
.cart{
  background-color: yellow;
  width: 30%;
  line-height: 49px;
}
.buy{
  background-color: var(--color-high-text);
  color: #fff;
  width: 25%;
  line-height: 49px;
}
</style>
