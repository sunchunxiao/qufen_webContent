<template>
	<div>
		<!--<Header></Header>-->
		<div style="background-color:rgb(246,246,246) ;">
			<div class="commmon indexCommon">
				<!--左边文章-->
				<div class="common-article">
					<!--文章-->
					<div class="common-article-wrap" v-for="(item,index) in itemList">
						<div class="common-article-content">
							<div class="row row1">
								<div class="oneuser" @click="onecenter(item.createUserId)">
									<div class="photo">
										<img slot="icon" :src="item.createUserIcon">
									</div>
									<div class="name">
										<div class="projectName"><span class="projectName-name">{{item.createUserName}} </span></div>
										<div class="projectName-time">{{item.createTimeStr}}</div>
									</div>
								</div>
								<div @click="attention(item.createUserId,index)" class="discoveryBtn">
									+ 关注
								</div>
							</div>
							<div>
								<div style="cursor: pointer" @click="article(item.postType,item.postId)">
									<div class="row row2">
										<div class="test">{{item.postTitle}}</div>
										<div v-if="item.postType==1" class="index-score">{{item.totalScore}}分</div>
									</div>
									<div class="row row3">
										<div class="discoveryContent">
											<!--缩略图-->
											<div v-for="item1 in item.postSmallImagesList" class="contentImg">
												<img :src="item1.fileUrl" />
											</div>
											<p class="row3-content aa">
												{{item.postShortDesc}}
											</p>
										</div>
									</div>
								</div>
								<div class="row4">
									<!--标签-->
									<div style="cursor: pointer;" @click="projectdetail(item.projectId)" class="crack-tag1"><span class="span-name">{{item.projectCode}} </span></div>
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
				<!--右边消息-->
				<div class="common-attention">
					<!--二维码-->
					<div class="attention-code attention-bag margin-bottom">
						<div class="attention-wrap">
							<div class="common-attention-code">
								<div style="padding: 7px;">
									<img src="../../assets/common/download.png" />
								</div>
								<p class="common-attention-down">下载区分APP不一样的区分</p>
							</div>
						</div>
					</div>
					<!--热门项目-->
					<div class="attention-hot attention-bag margin-bottom">
						<div class="attention-wrap">
							<div class="margin-bottom-10 " style="font-size: 13px;">本网站更多功能还在完善中，请耐心等待...</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">官方QQ群：820043115</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">官方微信：qudong0405</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">微信客服：qudong0405</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">官方微信社区</div>
							<div class="common-attention-code">
								<div style="padding: 7px;">
									<img src="../../assets/common/wxcode.png" />
								</div>
							</div>

							<!--<div class="attention-hot-title">
								<img src="../../assets/common/hot.png" />
								<span class="attention-hot-pro">热门项目</span>
							</div>-->
							<!--<ul class="attenList">
								<li>
									<div class="row rowList">
										<div class="photoList">
											<img slot="icon" src="../../assets/login/icon2.png">
										</div>
										<div class="name">
											<div class="projectNameL"><span class="projectName-nameL">QTU </span><span class="atten-spanL">/ 柚子</span></div>
											<div class="projectName-timeL">18:24</div>
										</div>
										<div class="btnL">
											+ 关注
										</div>
									</div>
								</li>

							</ul>-->
						</div>
					</div>
					<!--活跃用户-->
					<!--<div class="attention-user attention-bag margin-bottom">
						<div class="attention-wrap">
							<div class="attention-hot-title">
								<img src="../../assets/common/user.png" />
								<span class="attention-hot-pro">活跃用户</span>
							</div>
							<ul class="attenList">
								<li>
									<div class="row rowList">
										<div class="photoList">
											<img slot="icon" src="../../assets/login/icon2.png">
										</div>
										<div class="name">
											<div class="projectNameL"><span class="projectName-nameL">QTU </span><span class="atten-spanL">/ 柚子</span></div>
											<div class="projectName-timeL">18:24</div>
										</div>
										<div class="btnL">
											+ 关注
										</div>
									</div>
								</li>

							</ul>
						</div>
					</div>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { followList, saveFollow, cancelFollow } from '@/service/home';
	import Header from '@/components/layout/header.vue'
	import Data from '../../assets/js/date'
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		//		name: 'attention',
		data() {
			return {
				value: 5,
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
		components: {
			Header
		},

		mounted() {
			//小于1600px   main-right展开
			this.resizeBannerImage1();
			//			window.onresize = this.resizeBannerImage;
			window.addEventListener('resize', this.resizeBannerImage)
			this.loadPageList() //加载文章
			//保留this属性
			var _this = this
			window.addEventListener('scroll', this.scrollHandler)

		},
		updated() {
			//
//			console.log(this.itemList)
			//点击关注
			for(let i = 0; i < this.itemList.length; i++) {
				if(this.itemList[i].postSmallImagesList==null){
					$(".aa").eq(i).removeClass("row3-content")
					$(".aa").eq(i).addClass("srow3-content")
				}
				
				this.followStatus = this.itemList[i].followStatus
				if(this.itemList[i].followStatus == 1) {
					$(".discoveryBtn").eq(i).css({
						backgroundColor: "rgb(244, 244, 244)",
						color: "rgb(126, 126, 126)"
					})
					$(".discoveryBtn").eq(i).html("已关注")
				} else {
					$(".discoveryBtn").eq(i).css({
						backgroundColor: "rgb(59, 136, 246)",
						color: "rgb(255,255,255)"
					})
					$(".discoveryBtn").eq(i).html("+ 关注")
				}

			}
		},
		destroyed() {
			window.removeEventListener("scroll", this.scrollHandler);
			window.removeEventListener("resize", this.resizeBannerImage);
		},
		methods: {
			onecenter(id) {
				window.open('/onecenter?id=' + id, "_blank")
			},
			//点击关注
			attention(createUserId, index) {
				console.log(createUserId)
				if(this.token != "") {
					var _this = this
					if($(".discoveryBtn").eq(index).html() == "已关注") {
						//取消关注
						let data = {
							token: this.token,
							followType: 3,
							followedId: createUserId
						}
						cancelFollow(data).then(res => {
							if(res.code == 0) {
								console.log(res.data.followStatus)
								if(res.data.followStatus == 0) {
									console.log('取消关注')
									$(".discoveryBtn").eq(index).css({
										backgroundColor: "rgb(59, 136, 246)",
										color: "rgb(255,255,255)"
									})
									$(".discoveryBtn").eq(index).html("+ 关注")
								}
							}
						}).catch(function(res) {
							_this.$message({
								showClose: true,
								message: res.msg,
								type: 'error'
							});
						});
					} else {
						//去关注
						let data = {
							token: this.token,
							followType: 3,
							followedId: createUserId
						}

						saveFollow(data).then(res => {
							if(res.code == 0) {

								//								console.log(res.data.followStatus)
								if(res.data.followStatus == 1) {
									console.log('已经关注')
									$(".discoveryBtn").eq(index).css({
										backgroundColor: "rgb(244, 244, 244)",
										color: "rgb(126, 126, 126)"
									})
									$(".discoveryBtn").eq(index).html("已关注")
								}
							}
						}).catch(function(res) {
							_this.$message({
								showClose: true,
								message: res.msg,
								type: 'error'
							});
						});
					}
				} else {
					this.$alert('前去登录', {
						confirmButtonText: '确定',
					});
				}

			},
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
			resizeBannerImage1() {
				var _width = $(window).width();
				var _width1 = $(".common-article").offset().left
				//				console.log( _width1)

				if(_width < 1590) {
					var left = _width1 + 643
					$(".common-attention").css("left", left)
				} else {
					var left = _width1 + 703
					$(".common-attention").css("left", left)
				}

			},
			resizeBannerImage() {
				var _width = $(window).width();
				var _width1 = $(".common-article").offset().left

				if(_width < 1590) {
					var left = _width1 + 650
					$(".common-attention").css("left", left)
				} else {
					var left = _width1 + 710
					$(".common-attention").css("left", left)
				}

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
				if(this.token != "") {
					// 查询数据
					let data = {
						token: this.token,
						pageIndex: 1,
						pageSize: 10
					}
					followList(data).then(res => {

						this.itemList = res.data.follows.rows;
						if(res.data.follows.rows.length <= 2) {
							$(".start").css("display", "none")
						}

						for(var i = 0; i < res.data.follows.rows.length; i++) {
							//						console.log(res.data.follows.rows[i].postSmallImagesList)
							if(res.data.follows.rows[i].postSmallImagesList != null) {
								if(res.data.follows.rows[i].postSmallImagesList.length != 0) {
									res.data.follows.rows[i].postSmallImagesList = res.data.follows.rows[i].postSmallImagesList.slice(0, 1)
								}
							}

							//时间  字符串切割
							//调用 Data.customData()
							var nowdate = Data.customData()

							var arr = res.data.follows.rows[i].createTimeStr.split(" ")

							this.timestr = arr[0];
							if(nowdate == this.timestr) {
								var a1 = arr[1].split(":")
								res.data.follows.rows[i].createTimeStr = a1[0] + ":" + a1[1];
							} else {
								res.data.follows.rows[i].createTimeStr = arr[0];
							}

							if(res.data.follows.rows[i].tagInfos != null) {
								this.tagInfos = JSON.parse(res.data.follows.rows[i].tagInfos)
								res.data.follows.rows[i].tagInfos = this.tagInfos
							} else {
								// $(".crack-tag2").css("display", "none")
							}

						}
						this.totalpage = Math.ceil(res.data.follows.rowCount / this.pageSize);

					})
				} else {
					this.$message('登陆后关注更多内容');
					this.$router.push('/user/register')
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
						token: this.token
					}

					if(this.allLoaded == false) {
						followList(params).then(res => {
							for(var i = 0; i < res.data.follows.rows.length; i++) {
								this.itemList.push(res.data.follows.rows[i]);
								if(res.data.follows.rows[i].postSmallImagesList != null) {
									if(res.data.follows.rows[i].postSmallImagesList.length != 0) {
										res.data.follows.rows[i].postSmallImagesList = res.data.follows.rows[i].postSmallImagesList.slice(0, 1)
									} else {
										res.data.follows.rows[i].postSmallImages = postSmallImages.slice(0, 1)
									}
								}

								//时间  字符串切割
								//调用 Data.customData()
								var nowdate = Data.customData()
								var arr = res.data.follows.rows[i].createTimeStr.split(" ")

								this.timestr = arr[0];
								if(nowdate == this.timestr) {
									var a1 = arr[1].split(":")
									//									console.log(a1)
									res.data.follows.rows[i].createTimeStr = a1[0] + ":" + a1[1];
									//									console.log(res.data.follows.rows[i].createTimeStr)
								} else {
									res.data.follows.rows[i].createTimeStr = arr[0];

								}

								this.tagInfos = JSON.parse(res.data.follows.rows[i].tagInfos)
								// console.log(this.tagInfos)
								res.data.follows.rows[i].tagInfos = this.tagInfos

							}
							this.totalpage = Math.ceil(res.data.follows.rowCount / this.pageSize);

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
			projectdetail(id) {
				console.log(this.token)
				if(this.token != '') {
					window.open('/project/projectdetail?id=' + id, "_blank")
				} else {
					//					this.$alert('请登录', {
					//						confirmButtonText: '确定',
					//					});
					this.$message({
						showClose: true,
						message: '请登录',
						type: 'error'
					});
				}

			}

		}
	}
</script>
<style lang="less">
	@import '../../css/global.css';
	@import '../../styles/common.less';
</style>