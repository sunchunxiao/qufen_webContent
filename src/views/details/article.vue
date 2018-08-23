<template>
	<div style="background-color:rgb(246,246,246);" class="content1">
		<div class="detailArticle">
			<div class="detail-box">
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
						<!--标题-->
						<div class="test">{{articleTitle}}</div>
						<!--<div class="index-score">8分</div>-->
					</div>
					<!--文章内容-->
					<div v-html="m" class="articleContent">
						{{m}}
					</div>
					<div class="articleTag">
						<div style="cursor: pointer;" @click="projectdetail" class="crack-tag1"><span class="span-name">{{tag}}</span></div>
						<span class="crack-tag2" v-for="item1 in tagInfos">#{{item1.tagName}}#</span>
					</div>
				</div>
				<div class="row articleRow5">
					<div class="article-atten">
						<!--赞助-->
						<div class="detail1 zan">
							<img src="../../assets/common/FIND.png">
							<label>待结算</label>
						</div>

					</div>
					<div class="articleDetail">
						<!--收藏-->
						<div class="detail index-preview">
							<img src="../../assets/common/shou.png">
							<label>收藏</label>
						</div>
						<!--分享-->
						<div class="detail index-preview">
							<img src="../../assets/common/share.png">
							<label>分享</label>
						</div>
						<!--评论-->
						<div class="detail index-preview">
							<img src="../../assets/common/preview.png">
							<label>{{commentsNum}}</label>
						</div>
						<!--点赞-->
						<div class="detail zan">
							<img src="../../assets/common/zan.png">
							<label>{{praiseNum}}</label>
						</div>
					</div>
				</div>
				<!--写下评论-->
				<div class="articlePreview">
					<!--请写下你的评论-->
					<div class="articleF">
						<img style="float: left;" src="../../assets/common/FIND.png" />
						<div class="articleInputC articleInput"><input type="text" name="" placeholder="本功能目前只对APP开放..." /></div>
						<span @click="attention" class="articleBack">回复</span>
					</div>
					<!--评论-->
					<div class="previewContent">
						<h2>评论</h2>
						<div>
							<div class="contentList" v-for="item in newestComments">
								<div class="list">
									<div class="contenlist-title"><img :src="item.commentUserIcon" /></div>
									<span class="listName">{{item.commentUserName}}</span>
									<div class="listfloor">
										<span class="floor">{{item.floor}}楼 {{item.createTimeStr}}</span>

									</div>
								</div>
								<p class="listContent">
									{{item.commentContent}}
								</p>

								<!--<div class="row articleRow">
									<div class="article-atten">
										<div class="detail1 zan">
											<img src="../../assets/common/FIND.png">
											<label>128</label>
										</div>
										<div class="detail index-preview">
											<img src="../../assets/common/preview.png">
											<label>111</label>
										</div>
									</div>

								</div>-->

							</div>

							<!--<div class="listContent">
								<div>
									<div>张三：@游来游去 <span class="listContentTime">03.15 11:15</span></div>
									<div>防弹也有很多舞台为了效果是预录的，可以很明显</div>
								</div>
							</div>

							<div class="row articleRow rowLeft">
								<div class="article-atten">
									<div class="detail1 zan">
										<img src="../../assets/common/zanS.png">
										<label>128</label>
									</div>
									<div class="detail index-preview">
										<img src="../../assets/common/preview.png">
										<label>111</label>
									</div>
								</div>

							</div>-->
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
		</div>
	</div>
</template>

<script>
	import { article, postCommentList } from '@/service/home';
	import Data from '../../assets/js/date'
	import { getCookie } from '../../assets/js/cookie.js'
	import { saveFollow, cancelFollow } from '@/service/home';
	export default {
		data() {
			return {
				m: '',
				id: '',
				articleTitle: '',
				src: '',
				username: '',
				userSignature: '',
				tag: '',
				timestr: '',
				timestr1: '',
				imgUrls: [],
				donateNum: '',
				commentsNum: '',
				praiseNum: '',
				articleContents: '',
				imgUrl: '',
				commendationListL: '',
				tagInfos: [],
				token: getCookie('token'),
				followStatus: 0,
				newestComments: [],
				createUserId: 0,
				hasNext: true,
				pageIndex: 1,
				pageSize: 10,
				projectId: 0
			}
		},
		updated() {
			$('.articleContent').find('img').css({
				width: '80%',
				height: '100%'
			})
			$('.articleContent').find('p').css({
				fontSize: '15px',
				width: "100%",
				margin: "1em 0",
				wordWrap: "break-word",
				lineHeight: '26px'
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
			this.id = this.$route.query.id;
			//请求文章
			this.articleC()
			//请求评论
			this.preview(),
				//监听滚动条
				window.addEventListener('scroll', this.scrollHandler)

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
					postType: 3
				}
				postCommentList(data).then(res => {
					if(res.code == 0) {
						this.hasNext = res.data.newestComments.hasNext
						if(res.data.newestComments.rows != null) {
							this.newestComments = res.data.newestComments.rows
							if(res.data.newestComments.rows.length > 2) {

								if(this.hasNext == false) {
									$(".end").css("display", "block")
									$(".start").css("display", "none")
								}
							}else{
								$(".start").css("display", "none")
							}
						} else {
							$(".previewContent").css('display', "none")
						}

					}
				}).catch(function(res) {
					$(".previewContent").css('display', "none")
				});
			},
			previewmore() {
				if(this.hasNext == true) {
					this.pageIndex = parseInt(this.pageIndex) + 1

					let data = {
						token: this.token,
						pageIndex: this.pageIndex,
						pageSize: 5,
						postId: this.id - 0,
						postType: 3
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
					$('.end').css('display', "block")
					$('.start').css('display', "none")
				}

			},
			articleC() {
				//发送请求
				var data = {
					token: this.token,
					postId: this.id - 0
				}
				article(data).then(res => {
					if(res.code == 0) {
						var data = res.data.articleDetail
						//文章内容
						this.m = data.articleContents

						//标题
						this.articleTitle = data.postTitle
						//头像
						this.src = data.createUserIcon;
						//用户名
						this.username = data.createUserName;
						//
						this.userSignature = data.createUserSignature;
						//关注状态
						this.followStatus = data.followStatus
						this.projectId = data.projectId
						//标签
						this.tag = data.projectCode;
						if(data.tagInfos != null) {
							this.tagInfos = JSON.parse(data.tagInfos)

						}

						//时间  字符串切割
						//调用 Data.customData()
						var nowdate = Data.customData()
						var arr = data.createTimeStr.split(" ")

						this.timestr = arr[0];
						if(nowdate == this.timestr) {
							var a1 = arr[1].split(":")
							this.timestr1 = a1[0] + ":" + a1[1];
						} else {
							this.timestr1 = arr[0];
						}

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
			attention() {
				var _this = this
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
					})
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

			},
			projectdetail() {
				console.log(this.token)
				if(this.token != '') {
					var id = this.projectId
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

<style>
	@import './details.css';
	@import '../../css/global.css';
</style>