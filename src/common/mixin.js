// 定义mixin
import {debounce} from './utils'    //debounce的方法在里面
import BackTop from 'components/content/backtop/BackTop'
export const itemListenerMixin = {
  data () {
    return {
      itemImagListener:null
    }
  },
  mounted() {
    //这时候this.$refs.scroll初始化完成,才能获取到scroll的属性
    //img标签确实被挂载，但是其中的图片还没有占据高度
    // refresh被赋值为this.debounce()函数，setTime执行完了赋值
    // 调用防抖函数debounce() -> utils.js
    const newRefresh = debounce(this.$refs.scroll.refresh, 50);
    // 对监听的事件进行保存    
    this.itemImagListener = () => newRefresh();
    //接收GoodListItem图片监听事件
    this.$bus.$on("itemImageLoad", this.itemImagListener);
  }
}

export const backTopMixin = {
  components:{
      BackTop
  },
  data () {
    return {
      isShowBackTop:false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // mixin可以把周期函数里的部分代码抽离，
    // 但是不能抽离methods里的部分代码，只能抽离真个methods里的方法
    // contentScroll(position) {
    //   // 判断backTop是否显示
    //   this.isShowBackTop = -position.y > 1000;
    // }
    listenShowBack(position){
      this.isShowBackTop = -position.y > 1000;
    }
  }
}