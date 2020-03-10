<template>
  <div class='detailshopinfo' v-if="Object.keys(shop).length !== 0">
      <div class="shop-name">
          <img :src="shop.logo" alt="">
          <span>{{shop.name}}</span>
      </div>
      <div class="shop-message-show">
          <div class="shop-sells-cont">
              <div class="sells">
                <span>{{shop.sells}}</span>
                <span>总销量</span>
              </div>
              <div class="count">
                <span>{{shop.goodsCount}}</span>
                <span>全部宝贝</span>
              </div>
          </div>
          <div class="shop-dec-cont">
              <div class="dec" v-for="(item,index) in shop.score" :key="index">
                <span class="dec-name">{{item.name}}</span>
                <span class="score" :class="item.isBetter?'redStyle':'greenStyle'">{{item.score}}</span>
                <span class="better" :class="item.isBetter?'redbg':'greenbg'">{{item.isBetter?'高':'低'}}</span>
              </div>
          </div>
      </div>
      <div class="btn"><a href="#"><span>进店逛逛</span></a></div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shop:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>
<style  scoped>
.redStyle{
  color: red;
}
.greenStyle{
  color: #5ea732;
}
.redbg{
  background-color: red;
  color: #fff;
}
.greenbg{
  background-color: #5ea732;
  color: #fff;
}
.detailshopinfo{
  padding: 15px 5px;
}
.shop-name{
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}
.shop-name img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ccc;
}
.shop-name span{
  margin-left: 5px;
}
.shop-message-show{
  display: flex;
  justify-content: center;
  align-items: center;
}
.shop-sells-cont{
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-right: 1px solid #ccc;
  font-size: 13px;
}

.shop-sells-cont .sells,.count{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.shop-dec-cont{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.shop-dec-cont .dec{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 2px 15px;
  font-size: 13px;
}
.shop-dec-cont .dec .better{
  display: inline-block;
  margin-left: 4px;
  flex: 1;
}
.shop-dec-cont .dec .score{
  flex: 2;
}
.shop-dec-cont .dec .dec-name{
  flex: 3;
}

.shop-dec-cont .dec .better,.score{
  text-align: center;
  padding: 2px;
}
.btn{
  display: flex;
  justify-content: center;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0 10px 0;
}
.btn span{
    background-color: #eee;
    border-radius: 5px;
    padding: 5px 40px ;
}
</style>
