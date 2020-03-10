<template>
  <div class="baseinfo" v-if="Object.keys(goods).length !==0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discountDesc" class="discount">{{goods.discountDesc}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style  scoped>
.baseinfo{
  padding: 12px 5px 30px 12px;
  border-bottom: 8px solid #eee;
}
.info-title{
  font-weight: 700;
  color: #666;
}
.info-price{
  padding: 5px 0;
}
.n-price{
  color: var(--color-high-text);
  font-weight: 500;
  font-size: 25px;
}
.o-price{
  color: #999;
  text-decoration: line-through;
  padding: 0 3px;
  margin-top: 10px;
}
.discount{
  background-color: var(--color-high-text);
  color: var(--color-background);
  border-radius: 8px;
  padding: 3px;
  font-size: 14px;
  display: inline-block;
  
}
.info-other{
  display: flex;
  justify-content: space-between;
  padding: 15px 5px;
  border-bottom: 1px solid #eee;
  color: #888;
}
.info-service{
  display: flex;
  justify-content: space-between;
  color: #666;
}
.info-service-item{
  padding-top: 30px;
  justify-content: center;
  align-items: center;
}
.info-service-item img{
  width: 15px;
  height: 15px;
}
</style>
