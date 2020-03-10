<template>
  <div class="bottom-bar">
    <div class="checkButton">
      <div class="chk-btn">
        <check-button @click.native="select" :isChecked="selectAll" />
      </div>
      <div class="all">全选</div>
    </div>
    <div class="counter">
      <div class="totalPrice">合计:{{totalPrice}}</div>
      <div class="calc" @click="toCalc">去计算({{checkLength}})</div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  data() {
    return {};
  },
  components: {
    CheckButton
  },
  computed: {
    // store的cartList
    ...mapGetters(["cartList"]),
    // 总价格
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => item.isChecked)
          .reduce((preValue, item) => {
            return item.count * item.price.substr(1) + preValue;
          }, 0)
      );
    },
    // 已选中商品的长度
    checkLength() {
      return this.cartList.filter(item => item.isChecked).length;
    },
    // 商品全部选中，全选选中，有一个不选中，全选不选中
    selectAll() {
      if (this.cartList.length === 0) return false;
      // 1.filter
      // return !(this.cartList.filter(item => !item.isChecked).length);
      // 2find
      // return !this.cartList.find(item => !item.isChecked)
      // 普通遍历
      for (let item of this.cartList) {
        if (!item.isChecked) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    // 全选按钮
    select() {
      if (this.selectAll) {
        this.cartList.forEach(item => (item.isChecked = false));
      } else {
        this.cartList.forEach(item => (item.isChecked = true));
      }
    },
    // 没有选中商品时
    toCalc() {
      
      this.cartList.every(item => {
        if (!item.isChecked && !this.cartList[this.cartList.length-1].isChecked) {
          this.$toast.show("还没有选择商品");
          return
        }
      });
      // if(!this.selectAll){
      //   this.$toast.show('还没有选购商品')
      // }
    }
  }
};
</script>
<style  scoped>
.bottom-bar {
  height: 40px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 49px;
  display: flex;
  border-top: 1px solid rgba(0,0,0,0.05);
}
.checkButton {
  height: 100%;
  display: flex;
  width: 60px;
  justify-content: center;
  align-items: center;
}
.all {
  padding-left: 3px;
  font-size: 13px;
}
.counter {
  display: flex;
  width: calc(100vw - 60px);
  justify-content: space-between;
  align-items: center;
}
.totalPrice {
  margin-left: 10px;
}
.calc {
  width: 100px;
  height: 100%;
  background-color: red;
  color: #fff;
  line-height: 40px;
  text-align: center;
}
</style>
