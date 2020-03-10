<template>
  <div class="login">
    <nav-bar class="center">
      <div slot="left" class="el-icon-arrow-left" @click="back"></div>
      <div slot="center">登录</div>
    </nav-bar>
    <div class="content">
      <div class="main">
        <div v-if="type===2">
          <div class="inBox">
            <el-input type="text" placeholder="手机号码" v-model="account"></el-input>
          </div>
          <div class="inBox code">
            <el-input type="text" placeholder="短信验证码" v-model="code"></el-input>
            <el-button
              class="get_code"
              :disabled="isRun"
              @click="sendCode"
            >{{isRun?'${runTime}s后重新获取':'获取验证码'}}</el-button>
          </div>
        </div>

        <div v-if="type===1">
          <div class="inBox">
            <el-input type="text" placeholder="用户名/手机号码" v-model="account"></el-input>
          </div>
          <div class="inBox">
            <el-input type="password" placeholder="密码" v-model="password"></el-input>
          </div>
        </div>

        <el-button round type="danger" class="submit" @click="loginHandle">立即登录</el-button>
        <span class="changeBtn" @click="changeType">{{type===1?'账号密码登录':'短信验证码登录'}}</span>
        <div class="server">
          <div class="register" @click="toRegister">立即注册</div>
          <div class="forget">忘记密码</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  comparedPhone,
  tellSendCode,
  checkCode,
  login
} from "network/register.js";

import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Login",
  data() {
    return {
      type: 2, //默认1代表用户密码校验方式,2代表手机号和校验码验证方式
      account: "",
      password: "",
      code: "",
      //倒计时
      isRun: false,
      runTime: 60
    };
  },
  components: {
    NavBar
  },
  methods: {
    back(){
      this.$router.back()
    },
    toRegister(){
        this.$router.push('/register')
    },
    changeType() {
      this.type = this.type === 2 ? 1 : 2;
      this.account = "";
      this.password = "";
    },
    // 获取验证码
    sendCode() {
      // 检验手机格式是否正确，防止不必要的请求 防止XSS攻击(输入恶意的js或SQL脚本)
      if (!/^1\d{10}$/.test(this.account)) {
        this.$toast.show("手机号码不正确！");
        return;
      }
      // 验证手机号是否被注册
      // 把手机号发送给服务器验证，存在code=1 已经注册 不存在code=0 未注册
      comparedPhone(this.account).then(res => {
        if (parseInt(res.code) !== 0) {
          this.$toast.show("手机号没有注册！");
          return;
        }
      });
      // 手机号码未注册，通知服务器发送验证码 code=1 未发送 code=0 已发送
      tellSendCode(this.account).then(res => {
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
    // 登录
    loginHandle() {
      // 分情况:是手机号验证码还是账号密码登录
      //表单校验
      //验证码的有效性
      checkCode(this.account, this.code).then(res => {
        // code=1验证码错误 code=0验证码正确
        if (parseInt(res.code) !== 0) {
          this.$toast.show("验证码错误");
          return;
        }
        login(this.account, this.password, this.type).then(res => {
          // code=1登录失败 code=0登录成功
          if (parseInt(res.code) !== 0) {
            this.$toast.show("登陆失败，请检查账号或密码是否有误！");
            return;
          }
          this.$toast.show("登陆成功！");
          this.$router.push("/home");
        });
      });
    }
  }

  // methods: {
  //   ...mapMutations(["changeLogin"]),
  //   login() {
  //     let _this = this;
  //     // 判断输入框
  //     if (this.loginForm.userName === "" || this.loginForm.password === "") {
  //       this.$toast.show("账号或密码不能为空");
  //     } else {
  //       // 1、第一次登录的时候，前端调后端的登陆接口，发送用户名和密码
  //       request({
  //         method: "post",
  //         url: "/user/login",
  //         data: _this.loginForm
  //       })
  //         .then(res => {
  //           // 2、后端收到请求，验证用户名和密码，验证成功，就给前端返回一个token
  //           console.log(res.data);
  //           // 3、前端拿到token，将token存储到localStorage和vuex中，并跳转路由页面
  //           // 存储token
  //           _this.userToken = "Bearer" + res.data.data.body.token;
  //           //将用户token存储到vuex
  //           _this.changeLogin({ Authorization: _this.userToken });
  //           // 跳转到首页
  //           _this.$router.push("/home");
  //           //弹出登录成功
  //           _this.$toast.show("登录成功");
  //         })
  //         .catch(err => {
  //           // 6、后端判断请求头中有无token，有token，就拿到token并验证token，验证成功就返回数据，
  //           // 验证失败（例如：token过期）就返回401，请求头中没有token也返回401
  //           //弹出错误提示
  //           _this.$toast.show("账号或密码错误");
  //           console.log(err);
  //           // 7、如果状态码为401，就清除token信息 并跳转到登录页面
  //           if (err.response) {
  //             switch (err.response.status) {
  //               case 401:
  //                 localStorage.removeItem("Authorization");
  //                 this.$router.push("/login");
  //             }
  //           }
  //         });
  //     }
  //   }
  // }
};
</script>
<style  scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 999;
}
.center{
  background-color: var(--color-tint);
  color: #fff;
}
.header {
  color: var(--color-tint);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.content {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 80%;
  margin-left: 10%;
  margin-top: 30%;
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
  width: 100%;
  margin-top: 10px;
  background-color: var(--color-tint);
}

.changeBtn {
  display: block;
  margin-top: 15px;
  color: #666;
  font-size: 13px;
  text-align: left;
}

.server {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
}
.server div {
  padding: 0 5px;
  font-size: 14px;
}
.register {
  border-right: 1px solid #ccc;
}
</style>
