<template>
  <div>
    <div class="cart-list">
      <cart-list-item v-for="item in cartList" :key="item.iid" :itemInfo="item"></cart-list-item>
    </div>
    <div class="cartList_none" v-if="cartList.length === 0">
      <div class="img_wrap">
        <img src="@/assets/img/cart/cart.png" alt="">
      </div>
        <span>购物车为空</span>
        <el-button class="go_shop" @click="goShopping">逛一逛</el-button>
    </div>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";
export default {
  name: "CartList",
  components: {
    CartListItem
  },
  computed: {
    cartList() {
      return this.$store.state.cartList;
    }
  },
  methods: {
    goShopping(){
      this.$router.push('/home')
    }
  }
};
</script>
<style  scoped>
.cartList_none{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30%;
}
.img_wrap{
  background-color: #eee;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
img{
  width: 40%;
}
span{
  color: rgba(0,0,0,0.5);
  margin-top: 15px;
  font-weight: 600;
  font-size: 13px;
}
.go_shop{
  width: 30%;
  margin-top: 70px;
  /* background-color: var(--color-high-text); */
  /* color: #fff; */
}


.cart-list {
  padding-top: 50px;
}

</style>
