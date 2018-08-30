<template>
	<div>
		<div style="background-color:rgb(246,246,246) ;">
			<div class="commmon indexCommon">
				<!--左边文章-->
				<div class="common-article">
					<div class="detail-box evaluating">
						<div class="detailWrap">
							<div class="row row1">
								<div class="oneuser" @click="onecenter">
									<div class="photo">
										<img slot="icon" :src="src">
									</div>
									<div class="name">
										<div class="projectName"><span class="projectName-name">{{username}} </span></div>
										<div class="projectName-time">{{timestr1}}</div>
									</div>
								</div>
								<div @click="attention" class="discoveryBtn">
									+ 关注
								</div>
							</div>
							<div class="row articlerow2">
								<div class="detailtest">{{articleTitle}}</div>
								<div class="index-score">{{totalscore}}分</div>
							</div>
							<div v-html="m" class="articleContent">
								{{m}}
							</div>
							<div class="articleTag">
								<div style="cursor: pointer;" @click="projectdetail" class="crack-tag1">
									<span class="span-name">{{projectCode}}</span>
								</div>
								<span class="crack-tag2" v-for="item1 in tagInfos">#{{item1.tagName}}#</span>
							</div>
						</div>
						<div class="row articleRow5">
							<div class="article-atten">
								<div class="detail1 zan">
									<img src="../../assets/common/FIND.png">
									<label>待结算</label>
								</div>

							</div>
							<div class="articleDetail">
								<div class="detail index-preview">
									<img src="../../assets/common/shou.png">
									<label>收藏</label>
								</div>
								<div class="detail index-preview">
									<img src="../../assets/common/share.png">
									<label>分享</label>
								</div>
								<div class="detail index-preview">
									<img src="../../assets/common/preview.png">
									<label>{{commentsNum}}</label>
								</div>
								<div class="detail zan">
									<img src="../../assets/common/zan.png">
									<label>{{praiseNum}}</label>
								</div>
							</div>
						</div>
						<!--评论-->
						<div class="articlePreview">
							<!--请写下你的评论-->
							<div class="articleF">
								<img style="float: left;" src="../../assets/common/FIND.png" />
								<div class="articleInputC elvaInput"><input type="text" name="" placeholder="本功能目前只对APP开放..." /></div>
								<span class="articleBack">回复</span>
							</div>
							<div class="previewContent">
								<h2>评论</h2>
								<div class="contentList" v-for="item in newestComments">
									<div class="list">
										<div class="contenlist-title"><img :src="item.commentUserIcon" /></div>
										<span class="listName">{{item.commentUserName}}</span>
										<div class="listfloor">
											<span class="floor">{{item.floor}}楼  {{item.createTimeStr}}</span>

										</div>
									</div>
									<p class="listContent">
										{{item.commentContent}}
									</p>
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
				<!--右边部分-->
				<div class="common-attention">
					<!--评测分数-->
					<div class=" attention-bag margin-bottom">
						<div class="attention-wrap">
							<div class="attention-hot-title">
								<div style="overflow: hidden;">
									<span class="scoreTitle totle">综合评分</span>
									<span class="totlescore" style="font-size: 16px;">{{totalscore}}分</span>
								</div>
								<div class="slider">
									<el-slider :max="10" style="width: 50%;display: inline-block;margin-left:6px" type="range" v-model="totalscore" :show-tooltip="false" disabled></el-slider>
								</div>
							</div>
							<div class="sliderList">
								<div style="padding: 10px;">
									<div v-for="item in storeList" class="attention-hot-title">
										<div style="overflow: hidden;">
											<span class="scoreTitle totle1">{{item.modelName}}</span>
											<span class="totlescore" style="font-size: 15px;">{{item.score}}分</span>
										</div>
										<div class="slider">
											<el-slider :max="10" style="width: 50%;display: inline-block;margin-left:6px" type="range" v-model="item.score" :show-tooltip="false" disabled></el-slider>
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { articleInfo, postCommentList, } from '@/service/home';
	import Data from '../../assets/js/date'
	import { getCookie } from '../../assets/js/cookie.js'
	import { saveFollow, cancelFollow } from '@/service/home';
	export default {
		name: 'evaluating',
		data() {
			return {
				value1: 8,
				id: '',
				articleTitle: '',
				src: '',
				username: '',
				totalscore: 0,
				storeList: [],
				m: '',
				timestr: '',
				timestr1: '',
				commentsNum: '',
				praiseNum: '',
				projectCode: '',
				token: getCookie('token'),
				followStatus: 0,
				createUserId: 0,
				newestComments: [],
				hasNext: false,
				pageIndex: 1,
				pageSize: 10,
				projectId: 0,
				tagInfos: [],
				length:0
			}
		},

		updated() {
			$('.articleContent').find('img').css({
				width: '80%',
				height: '80%'
			})
			$('.articleContent').find('p').css({
				fontSize: '15px',
				width: "100%",
				margin: "1em 0",
				wordWrap: "break-word",
				lineHeight: '26px'
			});
			$(".el-slider__runway.disabled .el-slider__bar").each(function() {
				$(".slider .el-slider__runway.disabled .el-slider__bar").eq(0).css("background-color", "rgb(60,137,247)")
				$(".totlescore").eq(0).css("color", "rgb(60,137,247)")

				$(".slider .el-slider__runway.disabled .el-slider__bar").eq(1).css("background-color", "rgb(83,199,252)")
				$(".totlescore").eq(1).css("color", "rgb(83,199,252)")

				$(".slider .el-slider__runway.disabled .el-slider__bar").eq(2).css("background-color", "rgb(255,150,0)")
				$(".totlescore").eq(2).css("color", "rgb(255,150,0)")

				$(".slider .el-slider__runway.disabled .el-slider__bar").eq(3).css("background-color", "rgb(255,206,0)")
				$(".totlescore").eq(3).css("color", "rgb(255,206,0)")

				$(".slider .el-slider__runway.disabled .el-slider__bar").eq(4).css("background-color", "rgb(255,115,156)")
				$(".totlescore").eq(4).css("color", "rgb(255,115,156)")

				$(".slider .el-slider__runway.disabled .el-slider__bar").eq(5).css("background-color", "rgb(255,40,81)")
				$(".totlescore").eq(4).css("color", "rgb(255,40,81)")

			});

			//关注状态
			if(this.followStatus == 1) {
				$(".discoveryBtn").css({
					backgroundColor: "rgb(244, 244, 244)",
					color: "rgb(126, 126, 126)"
				})
				$(".discoveryBtn").html("已关注")
			} else {
				$(".discoveryBtn").css({
					backgroundColor: "rgb(59, 136, 246)",
					color: "rgb(255,255,255)"
				})
				$(".discoveryBtn").html("+ 关注")
			}

		},
		mounted() {
			//小于1600px   main-right展开
			//			this.resizeBannerImage();
			//			window.onresize = this.resizeBannerImage;
			//请求评测
			this.id = this.$route.query.id;
			this.resizeBannerImage();
			window.addEventListener('resize', this.resizeBannerImage)

			this.articleC()
			//请求评论
			this.preview(),
				//监听滚动条
				window.addEventListener('scroll', this.scrollHandler)

		},
		destroyed() {
			window.removeEventListener("resize", this.resizeBannerImage);
		},
		methods: {
			onecenter() {
				if(this.token != '') {
					var id = this.createUserId
					window.open('/onecenter?id=' + id, "_blank")
				} else {
					this.$message({
						showClose: true,
						message: '请登录',
						type: 'error'
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
					this.previewmore()
				}
			},
			preview() {
				let data = {
					token: this.token,
					pageIndex: 1,
					pageSize: 5,
					postId: this.id - 0,
					postType: 1
				}
				postCommentList(data).then(res => {
					if(res.code == 0) {
						this.hasNext = res.data.newestComments.hasNext
						this.length = res.data.newestComments.rows.length
						if(res.data.newestComments.rows != null) {
							this.newestComments = res.data.newestComments.rows
							if(res.data.newestComments.rows.length > 4) {

								if(this.hasNext == false) {
									$(".end").css("display", "block")
									$(".start").css("display", "none")
								}
							} else {
								$(".start").css("display", "none")
							}
						} else {
							$(".previewContent").css('display', "none")
							$(".start").css("display", "none")
						}

					}

				}).catch(function(res) {
					$(".previewContent").css('display', "none")
					$(".start").css("display","none")
				});
			},
			previewmore() {
				if(this.newestComments.length != 0) {
					if(this.hasNext == true) {
						this.pageIndex = parseInt(this.pageIndex) + 1

						let data = {
							token: this.token,
							pageIndex: this.pageIndex,
							pageSize: 5,
							postId: this.id - 0,
							postType: 1
						}
						postCommentList(data).then(res => {
							if(res.code == 0) {
								this.hasNext = res.data.newestComments.hasNext
								console.log(this.hasNext)
								if(res.data.newestComments.rows != null) {
									for(var i = 0; i < res.data.newestComments.rows.length; i++) {
										this.newestComments.push(res.data.newestComments.rows[i]);
									}

								}
								if(this.hasNext == false) {
									$(".end").css("display", "block")
									$(".start").css("display", "none")
								}

							}
						})
					} else {
						if(this.length > 4) {
							$('.end').css('display', "block")
							$('.start').css('display', "none")
						}
					}
				}

			},
			articleC() {
				var data = {
					token: this.token,
					postId: this.id - 0
				}

				//测评
				articleInfo(data).then(res => {
					if(res.code == 0) {

						var data = res.data.evaluationDetail

						this.articleTitle = data.postTitle
						//头像
						this.src = data.createUserIcon;
						//用户名
						this.username = data.createUserName;
						this.projectCode = data.projectCode;
						//标签
						if(data.evaluationTags != null) {
							this.tagInfos = JSON.parse(data.evaluationTags)
						}
						//关注状态
						this.followStatus = data.followStatus
						//id
						this.projectId = data.projectId
						this.createUserId = data.createUserId

						//时间  字符串切割
						//调用 Data.customData()
						var nowdate = Data.customData()

						var arr = data.createTimeStr.split(" ")

						this.timestr = arr[0];

						if(nowdate == this.timestr) {
							var a1 = arr[1].split(":")
							//						console.log(a1)
							this.timestr1 = a1[0] + ":" + a1[1];
						} else {
							this.timestr1 = arr[0];
						}

						//综合评分
						this.totalscore = data.totalScore;
						//评分
						if(data.professionalEvaDetail != null) {
							this.storeList = JSON.parse(data.professionalEvaDetail);
							if(this.storeList.length == 0) {
								$(".sliderList").css("display", "none")
							}
						} else {
							//只有综合评测
							$(".sliderList").css("display", "none")
						}

						//文章
						this.m = data.evauationContent
						//标签
						this.tag = data.projectCode;
						//赞助人数
						this.donateNum = data.donateNum;
						//评论人数
						this.commentsNum = data.commentsNum;
						//点赞人数
						this.praiseNum = data.praiseNum;
						this.createUserId = data.createUserId

					}

				})

			},
			resizeBannerImage() {
				var _width = $(window).width();
				var _width1 = $(".common-article").offset().left
				// console.log(_width,_width1)

				if(_width < 1590) {
					var left = _width1 + 675
					$(".common-attention").css("left", left)
				} else {
					var left = _width1 + 726
					$(".common-attention").css("left", left)
				}

			},
			attention() {
				var _this = this
				if(this.token != '') {
					if($(".discoveryBtn").html() == "已关注") {

						//取消关注
						let data = {
							token: this.token,
							followType: 3,
							followedId: this.createUserId
						}
						cancelFollow(data).then(res => {
							if(res.code == 0) {
								console.log(res.data.followStatus)
								if(res.data.followStatus == 0) {
									console.log('取消关注')
									$(".discoveryBtn").css({
										backgroundColor: "rgb(59, 136, 246)",
										color: "rgb(255,255,255)"
									})
									$(".discoveryBtn").html("+ 关注")
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
							followedId: this.createUserId
						}
						saveFollow(data).then(res => {
							if(res.code == 0) {

								console.log(res.data.followStatus)
								if(res.data.followStatus == 1) {
									console.log('已经关注')
									$(".discoveryBtn").css({
										backgroundColor: "rgb(244, 244, 244)",
										color: "rgb(126, 126, 126)"
									})
									$(".discoveryBtn").html("已关注")
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
					this.$message({
						type: 'error',
						message: '登陆后关注更多内容',
						duration: 1000
					});
				}

			},
			projectdetail() {
					var id = this.projectId
					window.open('/project/projectdetail?id=' + id, "_blank")
//				} else {
//
//					this.$message({
//						showClose: true,
//						message: '请登录',
//						type: 'error'
//					});
//				}

			}
		}
	}
</script>
<style lang="less">
	@import './details.css';
	@import '../../css/global.css';
</style>