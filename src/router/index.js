import Vue from 'vue'
import Router from 'vue-router'
import {mainRouter} from './router_config'
import {userRouter} from './userRouter'     //用户相关 路由
import {detailsRouter} from './detailsRouter'     //文章相关 路由
import {writeRouter} from './writeRouter'     //文章相关 路由

Vue.use(Router)
// 模块路由合并
const routes = [
  ...userRouter,
  ...mainRouter,
  ...detailsRouter,
	...writeRouter
]
const router = new Router({
	mode:'history',
  routes: routes
})


//路由钩子 -- 进入前： 权限校验
router.beforeEach((to, from, next) => {
  // 鉴权
  if (to.meta.auth) {
    // 跳转到登录页
  } else {
    next()
  }
})

//路由钩子 --- 进入后： 回到顶部
router.afterEach(() => {
  window.scrollTo(0, 0)
})


export default router

