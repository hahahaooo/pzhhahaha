import { request } from './request'

export function getCategory() {
  return request({
    url:"/category"
  })
}
//分类信息
export function getCategoryInfo(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}
