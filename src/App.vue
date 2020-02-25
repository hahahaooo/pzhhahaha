<template>
  <div id="app">
    <h2>App内容：modules的内容</h2>
    <button @click="upDateName">修改名字</button>
    <h2>{{$store.state.a.name}}</h2>
    <h2>{{$store.getters.fullname}}</h2>
    <h2>{{$store.getters.fullname2}}</h2>
    <h2>{{$store.getters.fullname3}}</h2>
    <button @click="asyncUpdataName">异步修改名字</button>

    <button @click="addMsg">点击</button>
    <h2>{{$store.state.info}}</h2>
    <!-- 普通调用 -->
    <h2>{{$store.state.counter}}</h2>
    <button @click="addtions">+</button>
    <button @click="subtraction">-</button>
    <!-- 传参 -->
    <button @click="countClick(5)">+5</button>
    <button @click="countClick(10)">+10</button>

    <button @click="addStudent">添加学生</button>
    <h2>getters想关信息</h2>
    <h2>{{$store.getters.powerCounter}}</h2>

    <h2>获取年龄大于20岁的人名</h2>
    <h2>{{$store.getters.yearOver20}}</h2>

    <h2>获取年龄大于20岁的个数: {{$store.getters.yearOver20Length}}</h2>
    <h2>获取年龄大于age岁的人: {{$store.getters.yearOverAgeStu(20)}}</h2>
    <hello-vuex></hello-vuex>
    <router-view />
  </div>
</template>

<script>
import HelloVuex from "./components/hellovuex/HelloVuex";
// 引入mutations常量
import { INCREMENT, DECREMENT } from "./store/mutations-types";
export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {
    HelloVuex
  },
  methods: {
    addtions() {
      this.$store.commit(INCREMENT);
    },
    subtraction() {
      this.$store.commit(DECREMENT);
    },

    countClick(count) {
      // payload:负载
      // 1普通的提交封装
      // this.$store.commit('incrementCount',count)
      // 2特殊的提交封装
      this.$store.commit({
        type: "incrementCount",
        count
      });
    },
    addStudent() {
      let stu = { id: 150, name: "Jeo", height: 1.8, age: 23 };
      this.$store.commit("studentPush", stu);
      console.log(this.$store.state.students);
    },
    addMsg() {
      // 同步
      // this.$store.commit('addAddress',{birthday:'12month'})
      // this.$store.commit({
      //   type: "addAddress",
      //   birthday: "birthday",
      //   month: "January"
      // });
      // 异步
      // this.$store.dispatch("aUpdateInfo", {
      //   message: "我是携带信息",
      //   success: () => {
      //     console.log("里面已经完成了");
      //   }
      // });
      this.$store
      .dispatch("aUpdateInfo",'我是携带的信息')
      .then((res) => {
          console.log(res);    
      })
    },
    upDateName(){
      this.$store.commit('mUpDateName','杰克')
    },
    asyncUpdataName(){
      this.$store.dispatch('updatedName')
    }
  }
};
</script>

<style>
</style>
