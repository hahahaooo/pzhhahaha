import { request } from './request'
// 商品信息
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
// 商品推荐
export function getRecommend() {
  return request({
    url:"/recommend"
  })
}

// 构造函数
// 商品信息
export class goodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discountDesc = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

// 商家信息
export class shopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

// 产品参数
export class GoodsParams {
  constructor(info, rule) {
    // this.image = info.images ? info.images[0] : null
    this.infos = info.set
    this.sizes = rule.tables
  }
}
