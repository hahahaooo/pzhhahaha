<template>
  <div class="params" v-if="Object.keys(goodsParams).length !== 0">
    <table class="info-size" v-for="(table,index) in goodsParams.sizes" :key="index">
      <tr v-for="(tr,indetr) in table" :key="indetr">
        <td v-for="(td,indetd) in tr" :key="indetd">{{td}}</td>
      </tr>
    </table>
    <table class="info-params">
      <tr v-for="(info,index) in goodsParams.infos" :key="index">
        <td>{{info.key}}</td>
        <td>{{info.value}}</td>
      </tr>
    </table>
    <!-- <div v-for="(img,indeg) in goodsParams.image" :key="indeg"><img :src="img" alt=""></div> -->
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    goodsParams: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style  scoped>
.params {
  padding: 0 5px;
    border-bottom: 10px solid #eee;
}

table {
  border-collapse: collapse; /* 设置这个才能给tr设置border */
  table-layout: fixed;
  width: 100%;
}
table tr {
  border-bottom: 1px solid #eee;
  display: flex; /* 设置了display:flex,tr就能设置padding */
  padding: 8px 0;
  justify-content: center;
  align-items: center;
}
.info-size tr td:first-child{
  width: 50px;
}
.info-size tr td:nth-last-child(-n + 4) {
  flex: 1;
  text-align: left;
}
.info-size tr td:nth-child(2) {
  margin-left: 20px;
}
.info-size tr:last-child {
  border-bottom: 1px solid #ccc;
}
.info-params tr td:first-child {
  width: 50px;
}
.info-params tr td:last-child {
  flex: 1;
  padding-left: 30px;
  color: var(--color-tint);
}
.info-params tr:last-child {
  /* border-bottom: 1px solid #ccc; */
}
</style>
