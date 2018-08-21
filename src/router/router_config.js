/**
 * Created by sunchunxiao on 2018/7/23.
 */
export const mainRouter = [
	// 根目录
	{
		path: '/',
		meta: {
			auth: true
		},
//		redirect: "/discovery"
		redirect: "/discovery"
	},

	//发现
	//	{
	//		path: "/discovery",
	//		meta: {
	//			title: '发现',
	//		},
	//		component: (resolve) => require(['@/views/discovery/index.vue'], resolve)
	//	},
	//发现
	{
		path: "/discovery",
		meta: {
			title: '发现',
		},
		component: (resolve) => require(['@/components/layout/header.vue'], resolve),
		children: [
			{
				path: "/discovery",
				meta: {
					title: '发现',
				},
				component: (resolve) => require(['@/views/discovery/index.vue'], resolve)
			},
			
			
			//关注
			{
				path: "/attention",
				meta: {
					title: '关注',
				},
				component: (resolve) => require(['@/views/attention/index.vue'], resolve),

			},
			// 项目
			{
				path: "/project",
				meta: {
					title: '项目',
				},
				component: (resolve) => require(['@/views/project/index.vue'], resolve),
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
	//关注
	//	{
	//		path: "/attention",
	//		meta: {
	//			title: '关注',
	//		},
	//		component: (resolve) => require(['@/views/attention/index.vue'], resolve),
	//
	//	},
	// 项目
//	{
//		path: "/project",
//		meta: {
//			title: '项目',
//		},
//		component: (resolve) => require(['@/views/project/index.vue'], resolve),
//	},

]