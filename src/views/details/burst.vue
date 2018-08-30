<template>
	<div>
		<div style="background-color:rgb(246,246,246);" class="content1">
			<div class="detailArticle">
				<div class="detail-box">
					<div class="detailWrap">
						<div class="row row1">
							<div class="oneuser" @click="onecenter">
								<div class="photo">
									<img slot="icon" :src="src" alt="区分">
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
						<div class="row articlerow2" id="distitle">
							<div class="detailtest">{{articleTitle}}</div>
						</div>
						<div class="articleContent">
							<div class="disscussContents">
								<pre id="prep" v-html>{{disscussContents}}</pre>
							</div>
							<div class="burstImg">
								<img v-for="(img,index) in postImg" @click="img1(index)" :class="{scale:index==isScale}" :style="fun(index)" :src="img.src" />
							</div>
						</div>
						<div class="articleTag">
							<div style="cursor: pointer;" @click="projectdetail" class="crack-tag1"><span class="span-name">{{projectCode}}</span></div>
							<span class="crack-tag2" v-for="item1 in tagInfos">#{{item1.tagName}}#</span>
						</div>
					</div>
					<div class="row articleRow5">
						<div class="article-atten">
							<div class="detail1 zan">
								<img src="../../assets/common/FIND1.png">
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
							<img style="float: left;" src="../../assets/common/FIND1.png" />
							<div class="articleInputC articleInput"><input type="text" name="" placeholder="本功能目前只对APP开放..." /></div>
							<span @click="attention" class="articleBack">回复</span>
						</div>
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
</template>

<script>
	import { discuss, discussCommentList } from '@/service/home';
	import Data from '../../assets/js/date'
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		data() {
			return {
				isScale: undefined,
				articleTitle: '',
				src: '',
				token: getCookie('token'),
				username: '',
				userSignature: '',
				disscussContents: '',
				imgUrl: '',
				postImg: [],
				projectCode: '',
				commentsehot: [],
				commenticon: [],
				timestr: '',
				timestr1: '',
				donateNum: '',
				commentsNum: '',
				praiseNum: '',
				tagInfos: [],
				createUserId: 0,
				newestComments: [],
				hasNext: false,
				pageIndex: 1,
				pageSize: 10,
				projectId: 0,
				length: 0

			}
		},

		mounted() {
			this.id = this.$route.query.id;
			//调取文章
			this.articleC()

			//请求评论
			this.preview(),
				//监听滚动条
				window.addEventListener('scroll', this.scrollHandler)

		},
		updated() {
			$('.disscussContents').find('img').css({
				width: '80%',
				height: '100%'
			})
			$('.disscussContents').find('p').css({
				fontSize: '15px',
				width: "100%",
				margin: "1em 0",
				wordWrap: "break-word",
				lineHeight: '26px'
			});

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

				}
				discussCommentList(data).then(res => {
					if(res.code == 0) {
						this.hasNext = res.data.comments.hasNext
						if(res.data.comments.rows != null) {
							this.newestComments = res.data.comments.rows
							this.length = res.data.comments.rows.length
							
							if(res.data.comments.rows.length > 4) {

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
					//					console.log(res.msg)
					$(".previewContent").css('display', "none")
					$(".start").css("display", "none")

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
						}
						discussCommentList(data).then(res => {
							if(res.code == 0) {
								this.hasNext = res.data.comments.hasNext
								console.log(this.hasNext)
								if(res.data.comments.rows != null) {
									for(var i = 0; i < res.data.comments.rows.length; i++) {
										this.newestComments.push(res.data.comments.rows[i]);
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
			articleC() {
				let data = {
					token: this.token,
					postId: this.id - 0
				}

				//爆料
				discuss(data).then(res => {
					if(res.code == 0) {
						var data = res.data.discussDetail
						//标题
						if(data.postTitle.length != 0) {
							this.articleTitle = data.postTitle
						} else {
							$("#distitle").css("display", "none")
						}

						//头像
						this.src = data.createUserIcon;
						//用户昵称
						this.username = data.createUserName;
						//时间  字符串切割
						//调用 Data.customData()
						var nowdate = Data.customData()
						var arr = data.createTimeStr.split(" ")
						this.projectCode = data.projectCode
						//id
						this.projectId = data.projectId
						this.createUserId = data.createUserId

						if(data.tagInfos != null) {
							this.tagInfos = JSON.parse(data.tagInfos)
						}

						this.timestr = arr[0];
						if(nowdate == this.timestr) {
							var a1 = arr[1].split(":")
							this.timestr1 = a1[0] + ":" + a1[1];
						} else {
							this.timestr1 = arr[0];
						}

						this.userSignature = data.createUserSignature;

						//文章内容
						this.disscussContents = data.disscussContents;

						//图片
						if(data.postSmallImages != null && data.postSmallImages.length != 0) {
							var a = JSON.parse(data.postSmallImages);
							//								console.log(a)
							if(a.length != 0) {
								if(a.length >= 3) {
									a = a.slice(0, 3)
								}
								for(let i = 0; i < a.length; i++) {
									this.imgUrl = a[i].fileUrl
									this.postImg.push({
										src: this.imgUrl
									})
								}
							}

						} else {
							$('.burstImg').css('display', 'none')
						}

						//标签
						this.projectCode = data.projectCode;
						//赞助人数
						this.donateNum = data.donateNum;
						//评论人数
						this.commentsNum = data.commentsNum;
						//点赞人数
						this.praiseNum = data.praiseNum;
						//最多选择标签
						//this.tagInfo = JSON.parse(data.tagInfo);
						//热门评论
						this.commentsehot = data.commentsehot;
						var result = data.commentsehot;
						//热门评论头像
						if(result != null) {
							for(let i = 0; i < result.length; i++) {
								var b = data.commentsehot[i].commentUserIcon;
								this.commenticon.push(b)
							}
						}
						//热门评论如果是没有，不显示
						if(this.commentsehot == null) {
							$(".hot").css("display", "none")
						}

						//时间  字符串切割
						var arr = data.createTimeStr.split(" ")
						this.timestr = arr[0];
						//缩略图
						// this.imgUrl = JSON.parse(data.post.postSmallImages)
						//缩略文章
						this.postShortDesc = data.postShortDesc
						this.createUserId = data.createUserId
					}

				})

			},
			fun(index) {
				if(index <= 3) {
					var str = "left:" + (index * 240) + "px";
					return str;
				} else {
					$(".project-img1").eq(index).css("display", "none");
				}
			},
			img1(index) {
				if(index == index) {
					this.isScale = this.isScale === index ? undefined : index
				}

			},
			projectdetail() {

				var id = this.projectId
				window.open('/project/projectdetail?id=' + id, "_blank")

			}
		}
	}
</script>

<style>
	@import './details.css';
	@import '../../css/global.css';
</style>