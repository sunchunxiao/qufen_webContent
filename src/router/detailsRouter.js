/**
 * Created by sunchunxiao on 2018/7/26.
 */

/*项目主页相关 路由*/
export const detailsRouter = [
	/*测评详细部分（start）*/
	//文章
	{
		path: '/details/article',
		meta: {
			title: '文章'
		},
		component: (resolve) => require(['@/views/details/article.vue'], resolve)
	},
	//爆料
	{
		path: '/details/burst',
		meta: {
			title: '爆料'
		},
		component: (resolve) => require(['@/views/details/burst.vue'], resolve)
	},
	//评测
	{
		path: '/details/evaluating',
		meta: {
			title: '爆料'
		},
		component: (resolve) => require(['@/views/details/evaluating.vue'], resolve)
	},
]