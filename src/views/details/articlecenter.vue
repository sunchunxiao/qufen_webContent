<template>
	<div>
		<div style="background-color:rgb(246,246,246) ;">
			<div class="detailcommmon">
				<!--左边文章-->
				<div class="">
					<!--文章-->
					<div class="common-article-wrap" v-for="item in itemList">
						<div class="common-article-content">
							<div class="row row1">
								<div class="photo">
									<img slot="icon" :src="item.createUserIcon">
								</div>
								<div class="name">
									<div class="projectName"><span class="projectName-name">{{item.createUserName}} </span></div>
									<div class="projectName-time">{{item.createTimeStr}}</div>
								</div>
								<!--<div @click="attention" class="discoveryBtndetail">
									+ 关注
								</div>-->
							</div>
							<div style="cursor: pointer" @click="article(item.postType,item.postId)">
								<div class="row row2">
									<div class="test">{{item.postTitle}}</div>
									<div v-if="item.postType==1" class="index-score">{{item.totalScore}}分</div>
								</div>
								<div class="row row3">
									<div class="discoveryContent">
										<!--缩略图-->
										<div v-for="item1 in item.postSmallImages" class="contentImg">
											<img :src="item1.fileUrl" />
										</div>
										<p class="row3-content">
											{{item.postShortDesc}}
										</p>
									</div>
								</div>
								<div class="row4">
									<!--标签-->
									<div class="crack-tag1"><span class="span-name">{{item.projectCode}} </span></div>
									<span class="crack-tag2" v-if="item.tagInfos" v-for="item1 in item.tagInfos">#{{item1.tagName}}#</span>
								</div>
							</div>
						</div>
						<div class="row5" style="cursor: pointer;" @click="article(item.postType,item.postId)">
							<!--<div class="article-atten">
								<span  class="atten-name">{{item.actionDesc}}</span>

							</div>-->
							<div class="article-atten">
								<span v-if="item.postType==1" class="atten-name">评测</span>
							</div>
							<div class="article-detail">
								<!--打赏-->
								<!--<div class="detail zan">
									<img src="../../assets/common/FIND.png">
									<label>{{item.donateNum}}</label>
								</div>-->
								<div class="detail index-preview">
									<img src="../../assets/common/zan.png">
									<label>{{item.praiseNum}}</label>
								</div>
								<div class="detail index-preview">
									<img src="../../assets/common/preview.png">
									<label>{{item.commentsNum}}</label>
								</div>
							</div>
						</div>

					</div>
					<!--加载更多-->
					<div class="row6 start">
						<span>加载中...</span>
					</div>
					<!--加载更多-->
					<div class="row6 end">
						<span>已经到底部了...</span>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import { articleList } from '@/service/project';
	import Data from '../../assets/js/date'
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		name: 'evaluatingdetail',
		data() {
			return {
				value: 5,
				id:'',
				postImage: [],
				pageIndex: 1,
				pageSize: 10,
				itemList: [],
				allLoaded: false, //是否可以上拉属性，false可以加载，true为禁止加载，就是不让往上划加载数据了
				totalpage: 0,
				loading: false,
				timestr: '',
				postType: "",
				state: "",
				tagInfos: [],
				token: getCookie('token')
			}
		},

		mounted() {
//			console.log(this.$route.query.id)
			this.id = this.$route.query.id - 0;
			
			this.loadPageList() //加载文章
			//监听滚动条
			window.addEventListener('scroll', this.scrollHandler)
		},
		destroyed() {
			window.removeEventListener("scroll", this.scrollHandler);
		},
		methods: {
			//下滑加载
			scrollHandler() {
				var scrollTop = $(window).scrollTop(); // 滚动条Y轴滚动的距离
				var windowHeight = $(window).height(); // 可视区域的高度
				var scrollHeight = $(document).height(); // 整个内容的高度
				if(scrollTop + windowHeight == scrollHeight) {
					// alert('已经到浏览器底部了，这时你可以做你需要的业务了');
					this.more()
				}
			},
			attention() {
				this.$alert('本功能目前只对APP开放', {
					confirmButtonText: '确定',
				});
			},
			article(postType, id) {
				//帖子类型：1-评测；2-爆料；3-文章，4-单项评测
				if(postType == 1) {
					window.open('/details/evaluating?id=' + id, "_blank")
				} else if(postType == 2) {
					window.open('/details/burst?id=' + id, "_blank")
				} else if(postType == 3) {
					window.open('/details/article?id=' + id, "_blank")
				}

			},
			loadPageList() {
				if(getCookie('token')) {
					// 查询数据
					let data = {
						pageIndex: 1,
						pageSize: 10,
						kffUserId: this.id,
						token: this.token
					}
					articleList(data).then(res => {
						this.itemList = res.data.articles.rows;
						if(res.data.articles.rows.length<=2){
							$(".start").css("display","none")
						}

						for(var i = 0; i < res.data.articles.rows.length; i++) {
							if(res.data.articles.rows[i].postSmallImages != null) {
								//								console.log(JSON.parse(res.data.follows.rows[i].postSmallImages))
								var postSmallImages = JSON.parse(res.data.articles.rows[i].postSmallImages)
								if(postSmallImages.length != 0) {
									res.data.articles.rows[i].postSmallImages = postSmallImages.slice(0, 1)

								} else {
									res.data.articles.rows[i].postSmallImages = postSmallImages.slice(0, 1)

								}
							}

							//时间  字符串切割
							//调用 Data.customData()
							var nowdate = Data.customData()
							//						console.log(nowdate)
							var arr = res.data.articles.rows[i].createTimeStr.split(" ")

							this.timestr = arr[0];
							if(nowdate == this.timestr) {
								var a1 = arr[1].split(":")
								res.data.articles.rows[i].createTimeStr = a1[0] + ":" + a1[1];
							} else {
								res.data.articles.rows[i].createTimeStr = arr[0];
							}

							this.tagInfos = JSON.parse(res.data.articles.rows[i].tagInfos)
							// console.log(this.tagInfos)
							res.data.articles.rows[i].tagInfos = this.tagInfos
							this.totalpage = Math.ceil(res.data.articles.rowCount / this.pageSize);
						}
					})

				} else {
					this.$message('请登录阅读更多精彩内容');
					this.$router.push('user/register')
				}

			},

			more() {
				// 分页查询
				if(this.allLoaded == false) {
					if(this.totalpage == 1) {
						this.pageIndex = 1;
						this.allLoaded = true;
					} else {
						this.pageIndex = parseInt(this.pageIndex) + 1;
						this.allLoaded = false;
					}
					let params = {
						pageIndex: this.pageIndex,
						pageSize: 10,
						kffUserId: this.id,
						token: this.token
					}

					if(this.allLoaded == false) {
						articleList(params).then(res => {
							for(var i = 0; i < res.data.articles.rows.length; i++) {
								this.itemList.push(res.data.articles.rows[i]);
								if(res.data.articles.rows[i].postSmallImages) {
									//								console.log(JSON.parse(res.data.follows.rows[i].postSmallImages))
									var postSmallImages = JSON.parse(res.data.articles.rows[i].postSmallImages)
									if(postSmallImages.length != 0) {
										res.data.articles.rows[i].postSmallImages = postSmallImages.slice(0, 1)
										//									console.log(postSmallImages.slice(0, 1))
									} else {
										res.data.articles.rows[i].postSmallImages = postSmallImages.slice(0, 1)

									}
								}

								//时间  字符串切割
								//调用 Data.customData()
								var nowdate = Data.customData()
								var arr = res.data.articles.rows[i].createTimeStr.split(" ")

								this.timestr = arr[0];
								if(nowdate == this.timestr) {
									var a1 = arr[1].split(":")
									//									console.log(a1)
									res.data.articles.rows[i].createTimeStr = a1[0] + ":" + a1[1];
									//									console.log(res.data.follows.rows[i].createTimeStr)
								} else {
									res.data.articles.rows[i].createTimeStr = arr[0];

								}

								this.tagInfos = JSON.parse(res.data.articles.rows[i].tagInfos)
								// console.log(this.tagInfos)
								res.data.articles.rows[i].tagInfos = this.tagInfos
							}
							// this.totalpage = Math.ceil(res.data.recommends.rowCount / this.pageSize);

							// 是否还有下一页，如果没有就禁止上拉刷新
							if(this.pageIndex == this.totalpage) {

								this.allLoaded = true;

								$(".end").css("display", "block")
								$(".start").css("display", "none")
							}
						})
					}
				}

			},

		}
	}
</script>
<style lang="less">
	@import '../../css/global.css';
	@import '../../styles/common.less';
</style>