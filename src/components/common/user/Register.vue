<template>
  <div class="register">
    <nav-bar class="center">
      <div slot="left" class="el-icon-arrow-left" @click="back"></div>
      <div slot="center">账号注册</div>
    </nav-bar>
    <div class="content">
      <div class="main">
        <div class="inBox">
          <el-input type="text" placeholder="用户名" v-model="name"></el-input>
        </div>
        <div class="inBox">
          <el-input type="text" placeholder="手机号码" v-model="phone"></el-input>
        </div>
        <div class="inBox code">
          <el-input type="text" placeholder="短信验证码" v-model="code"></el-input>
          <el-button
            class="get_code"
            :disabled="isRun"
            @click="sendCode"
          >{{isRun?'${runTime}s后重新获取':'获取验证码'}}</el-button>
        </div>
        <div class="inBox">
          <el-input type="password" placeholder="登陆密码" v-model="password"></el-input>
        </div>
        <div class="inBox">
          <el-input type="password" placeholder="支付密码" v-model="passwordPay"></el-input>
        </div>
        <el-button round class="submit" @click="registerHandle">立即注册</el-button>
        <router-link class="toRegister" to="/login">已有帐号,去登陆！</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {
  comparedPhone,
  tellSendCode,
  checkCode,
  register
} from "network/register.js";
import md5 from "blueimp-md5";
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "Login",
  components: {
    NavBar
  },
  data() {
    return {
      name: "",
      phone: "",
      code: "",
      password: "",
      passwordPay: "",
      //倒计时
      isRun: false,
      runTime: 60
    };
  },
  methods: {
    back(){
        this.$router.go(-1)
    },
    // 获取验证码
    sendCode() {
      // 检验手机格式是否正确，防止不必要的请求 防止XSS攻击(输入恶意的js或SQL脚本)
      if (!/^1\d{10}$/.test(this.phone)) {
        this.$toast.show("手机号码不正确！");
        return;
      }
      // 验证手机号是否被注册
      // 把手机号发送给服务器验证，存在code=1 已经注册 不存在code=0 未注册
      comparedPhone(this.phone).then(res => {
        if (parseInt(res.code) === 0) {
          this.$toast.show("手机号已经注册！");
        }
      });
      // 手机号码未注册，通知服务器发送验证码 code=1 未发送 code=0 已发送
      tellSendCode(this.phone).then(res => {
        if (parseInt(res.code) === 1) {
          this.$toast.show("当前网络繁忙！");
          return;
        }
        // 开启倒计时,发送验证码按钮禁用
        this.isRun = true;
        this.Timer = setInterval(() => {
          if (this.runTime === 0) {
            // 重置时间
            this.runTime = 60;
            this.isRun = false;
            clearInterval(this.Timer);
            return;
          }
          this.runTime--;
        }, 1000);
      });
    },
    // 注册
    registerHandle() {
      //1.表单校验
      //2.验证码的有效性
      checkCode(this.phone, this.code).then(res => {
        // code=1不正确 code=0正确
        if (parseInt(res.code) !== 0) {
          this.$toast.show("验证码错误");
          return;
        }
        //完成注册
        let obj = {
          name: this.name,
          phone: this.phone,
          code: this.code,
          password: md5(this.password),
          passwordPay: md5(this.passwordPay)
        };
        register(obj).then(res => {
          // 1失败 0成功
          if (parseInt(res.code) !== 0) {
            this.$toast.show("网络繁忙，请稍后重试！");
            return;
          }
          this.$toast.show("注册成功！");
          //  跳转到登录页
          this.$router.push("/login");
        });
      });
    }
  }
};
</script>
<style  scoped>
.center{
  background-color: var(--color-tint);
  color: #fff;
}
.header {
  background-color: var(--color-tint);
  color: #fff;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
}
.inBox {
  margin-top: 10px;
}
.code {
  display: flex;
  justify-content: center;
  align-items: center;
}
.get_code {
  background-color: var(--color-tint);
  color: #fff;
  margin-left: 5px;
  border: none;
}
.submit {
  margin-top: 10px;
  color: var(--color-tint);
}
.toRegister {
  color: grey;
  font-size: 13px;
}
</style>
