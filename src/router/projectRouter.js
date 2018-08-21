/**
 * Created by sunchunxiao on 2018/8/14.
 */

/*项目主页相关 路由*/
export const projectRouter = [
	/*测评详细部分（start）*/
	//文章
	{
		path: "/project",
		meta: {
			title: '项目',
		},
		component: (resolve) => require(['@/components/layout/header.vue'], resolve),
		children: [
			//项目主页
			{
				path: '/project/projectdetail',
				meta: {
					title: '项目主页'
				},
				component: (resolve) => require(['@/views/details/projectdetail.vue'], resolve),
				children: [
				{
					path: '/project/evaluatingdetail',
					meta: {
						title: '项目评测'
					},
					component: (resolve) => require(['@/views/details/evaluatingdetail.vue'], resolve)
				},
				{
					path: '/project/burstdetail',
					meta: {
						title: '项目爆料'
					},
					component: (resolve) => require(['@/views/details/burstdetail.vue'], resolve)
				},
				{
					path: '/project/articledetail',
					meta: {
						title: '项目文章'
					},
					component: (resolve) => require(['@/views/details/articledetail.vue'], resolve)
				},
				
				]
			},

		]
	},

]