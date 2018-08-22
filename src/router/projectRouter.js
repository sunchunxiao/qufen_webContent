/**
 * Created by sunchunxiao on 2018/8/14.
 */

/*项目主页相关 路由*/
export const projectRouter = [
	/*测评详细部分（start）*/
	//文章
	{
		path: "/",
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
			{
				path: "/onecenter",
				meta: {
					title: '个人主页',
				},
				component: (resolve) => require(['@/views/details/onecenter.vue'], resolve),
				children:[
				{
					path: '/project/evaluatingcenter',
					meta: {
						title: '用户评测'
					},
					component: (resolve) => require(['@/views/details/evaluatingcenter.vue'], resolve)
				},
				{
					path: '/project/burstcenter',
					meta: {
						title: '用户爆料'
					},
					component: (resolve) => require(['@/views/details/burstcenter.vue'], resolve)
				},
				{
					path: '/project/articlecenter',
					meta: {
						title: '用户爆料'
					},
					component: (resolve) => require(['@/views/details/articlecenter.vue'], resolve)
				},]
			},

		]
	},
	

]