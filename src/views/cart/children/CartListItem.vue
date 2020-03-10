<template>
  <div class="content-cart">
    <div class="cart-itemInfo">
      <div class="checkButton">
        <check-button :isChecked="itemInfo.isChecked" @click.native="checkClick" />
      </div>
      <div class="itemInfo-img">
        <img mode="widthFix" :src="itemInfo.image" alt="商品图片" />
      </div>
      <div class="cart-info">
        <div class="itemInfo-title">{{itemInfo.title}}</div>
        <div class="itemInfo-calc">
          <span class="price">{{itemInfo.price}}</span>
          <span class="count">x{{itemInfo.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartListitemInfo",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  methods: {
    checkClick() {
      this.itemInfo.isChecked = !this.itemInfo.isChecked;
    }
  }
};
</script>
<style  scoped>
.cart-itemInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 5px;
  border-bottom: 1px solid #eee;
}
.checkButton {
  margin-right: 5px;
}
.cart-itemInfo .itemInfo-img{
  /* overflow: hidden; */
}
.cart-itemInfo .itemInfo-img img {
  width: 70px;
  height:80px;
  border-radius: 5px;
  object-fit: cover;/* 图片会撑开不会压缩的样子 */
}
.cart-itemInfo .cart-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 5px;
}
.itemInfo-title {
  line-height: 20px;
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.itemInfo-calc {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
.itemInfo-calc .price {
  color: var(--color-high-text);
  font-weight: 600;
}
.itemInfo-calc .count {
  padding-right: 10px;
}
</style>
