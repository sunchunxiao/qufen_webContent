/**
 * Created by sunchunxiao on 2018/7/30.
 */
import request from '../utils/request'

//登录
export const login = (params = {}) => {
  return request(`/kff/user/login`, {
    body: {
      ...params
    },
  })
}

