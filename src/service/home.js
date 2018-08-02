/**
 * Created by zhengchangshun on 2018/4/15.
 */
import request from '../utils/request'

//首页推荐  文章列表
export const recommend = (params = {}) => {
  return request(`/kff/home/recommendList`, {
    body: {
      ...params
    },
  })
}

// 文章详情
export const article = (params = {}) => {
  return request(`/kff/home/shareArticleDetail`, {
    body: {
      ...params
    },
  })
}

// 爆料详情
export const discuss = (params = {}) => {
  return request(`/kff/home/discussCommentListShare`, {
    body: {
      ...params
    },
  })
}

//测评
export const articleInfo = (params = {}) => {
  return request(`/kff/home/shareEvaluationDetail`, {
    body: {
      ...params
    },
  })
}
//发布文章
//首页
export const reviewedL = (params = {}) => {
  return request(`/kff/authentication/reviewed`, {
    body: {
      ...params
    },
  })
}
