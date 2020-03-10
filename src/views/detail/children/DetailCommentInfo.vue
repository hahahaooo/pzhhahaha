<template>
  <div class="comment" v-if="Object.keys(commentInfo).length !== 0">
    <div class="come-header">
      <div class="title">用户评价</div>
      <div class="more">更多</div>
    </div>
    <div class="come-main">
      <div class="user" v-for="(item,index) in commentInfo" :key="index">
        <div class="user-info">
          <img :src="item.user.avatar" alt />
          <span>{{item.user.uname}}</span>
        </div>
        <div class="come-content">
          <div class="rate">
            <span>{{item.content}}</span>
          </div>
          <div class="images">
            <img :src="img" v-for="(img,indez) in item.images" :key="indez" alt />
          </div>
          <div class="come-footer">
            <div class="date">{{item.created | showDate}}</div>
            <div class="style">{{item.style}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils.js";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  filters: {
    showDate(value) {
      // 1.将时间戳转成Date对象
      const date = new Date(value);
      // 2.将date进行格式化
      return formatDate(date, "yyyy-MM-dd:hh-mm-ss");
    }
  }
};
</script>
<style  scoped>
.comment {
  padding: 0px 5px 10px 5px;
}
.come-header {
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 10px 0 10px 0;
}
.come-header .title {
  flex: 1;
}
.come-header .more {
  padding-right: 5px;
}
.come-main {
  padding: 0 5px;
}
.user-info {
  display: flex;
  align-items: center;
  padding-top: 10px;
}
.user-info img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-info span {
  padding-left: 10px;
  font-weight: 600;
}
.come-content {
  padding-top: 5px;
}
.come-content .rate span {
  line-height: 25px;
  font-size: 13px;
}
.come-content .images {
  padding-top: 5px;
  display: flex;
}
.come-content .images img {
  width: 60px;
  height: 60px;
  padding: 0 2px;
  border-radius: 3px;
}
.come-footer {
  display: flex;
  padding-top: 8px;
  font-size: 13px;
}
.come-footer .date {
  
}
.come-footer .style {
  padding-left: 5px;
}
</style>
