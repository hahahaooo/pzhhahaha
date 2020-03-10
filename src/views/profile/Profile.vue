<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">我的</div>
    </nav-bar>
    <!-- 用户信息 -->
    <div class="profile_content">
      <div class="user_info">
        <div class="avatar">
          <img src="@/assets/img/profile/avatar.svg" alt />
        </div>
        <div class="login_reg">
          <div class="login_or_reg" @click="loginClick">登录/注册</div>
          <div class="phone el-icon-mobile-phone">暂无绑定手机号</div>
        </div>
        <div class="more el-icon-arrow-right"></div>
      </div>
    </div>
    <!-- app信息 -->
    <div class="app_info">
      <div class="money">
        <span>
          <span class="pink">0.00</span>元
        </span>
        <span class="text">我的余额</span>
      </div>
      <div class="discount">
        <span>
          <span class="pink">0</span>个
        </span>
        <span class="text">我的优惠</span>
      </div>
      <div class="integral">
        <span>
          <span class="pink">0</span>分
        </span>
        <span class="text">我的积分</span>
      </div>
    </div>
    <!-- 服务 -->
    <div class="servers">
      <div class="message">
        <div class="message_icon">
          <img src="@/assets/img/profile/message.svg" alt />
        </div>
        <div class="title">我的消息</div>
      </div>
      <div class="shop">
        <div class="shopping_icon">
          <img src="@/assets/img/profile/shopping.svg" alt />
        </div>
        <div class="title">积分商城</div>
      </div>
      <div class="vip">
        <div class="vip_icon">
          <img src="@/assets/img/profile/vip.svg" alt />
        </div>
        <div class="title">会员卡</div>
      </div>
    </div>
    <div class="about_app">
      <div class="cart">
        <div class="cart_icon"><img src="@/assets/img/profile/cart.svg" alt=""></div>
        <div class="title" @click="toCartClick">购物车</div>
      </div>
      <div class="download">
        <div class="download_icon"><img src="@/assets/img/profile/pointer.svg" alt=""></div>
        <div class="title">下载购物APP</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import Login from "components/common/user/Login";
export default {
  name: "profile",
  data() {
    return {};
  },
  components: {
    NavBar,
    Login
  },
  methods: {
    loginClick(){
      this.$router.push('/register')
    },
    toCartClick(){
      this.$router.push('/cart')
    }
  }
};
</script>
<style  scoped>
.profile {
  background-color: #eee;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.user_info {
  background-color: var(--color-tint);
  display: flex;
  padding: 15px 10px;
  justify-content: center;
}
.user_info img {
  width: 50px;
  height: 50px;
}
.avatar {
  width: 50px;
}
.login_reg {
  flex: 1;
  color: #fff;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5px;
  margin-left: 5px;
}
.login_reg div {
  padding: 2px 0;
}
.more {
  font-weight: 700;
  display: flex;
  align-items: center;
  color: #fff;
  margin-right: 10px;
}
.app_info {
  display: flex;
  padding: 15px 0;
  background: #fff;
  font-size: 13px;
}
.app_info div:nth-child(-n + 2) {
  border-right: 1px solid #eee;
}
.money,
.discount,
.integral {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.text {
  margin-top: 8px;
  font-weight: normal;
  font-size: 13px;
}
.pink {
  color: var(--color-tint);
}
.servers ,.about_app{
  margin-top: 10px;
  padding: 5px 15px;
  background-color: #fff;
}
.servers img , .about_app img {
  width: 20px;
  height: 20px;
}
.message,
.shop,
.vip ,.cart, .download{
  display: flex;
  padding: 5px 0;
  align-items: center;
  font-size: 13px;
}
.servers .title,.about_app .title {
  margin-left: 10px;
  flex: 1;
  padding: 12px 0;
  font-weight: 700;
  border-bottom: 1px solid #eeeeee;
}
.servers  div:last-child .title,.about_app div:last-child .title{
  border-bottom:none;
  padding-bottom: 6px;
}

</style>
