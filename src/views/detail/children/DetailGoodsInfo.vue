<template>
  <div class="goodsinfo" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imageLoad" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data () {
    return {
      counter:0,
      imageLength:0
    }
  },
  methods: {
    imageLoad(){
        this.counter+=1;
        if(this.counter === this.imageLength){
            this.$emit('imageLoad')
        }
    }
  },
  //监听数组长度变化
  watch: {
    detailInfo(){
      this.imageLength = this.detailInfo.detailImage[0].list.length
    }
  }
};
</script>
<style  scoped>
.goodsinfo {
  padding: 12px 5px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #eee;
}

.start {
  width: 100px;
  border-bottom: 1px solid gray;
  position: relative;
}

.start::before {
  position: absolute;
  content:'';
  left: -1px;
  bottom: -1px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #666;
}
.desc{
  padding: 20px 5px;
  font-weight: 500;
  color: #666;
  text-indent: 20px;
}
.end {
  width: 100px;
  border-bottom: 1px solid gray;
  float: right;
  position: relative;
}
.end::after {
  position: absolute;
  content:'';
  right: -1px;
  bottom: -1px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #666;
}
.info-key {
  font-weight: 600;
  color: #333;
  padding-top: 10px;
}
.info-list {

}
.info-list img {
  width: 100%;
  box-shadow: 1px 1px 1px #ccc;
}
</style>
