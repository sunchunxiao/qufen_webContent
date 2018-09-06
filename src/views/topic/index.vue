<template>
	<div>
		<div style="background-color:rgb(246,246,246) ; ">
			<div class="commmon projectCommon">

				<div class="common-article">
					<!--信息-->
					<div class="common-article-wrap">
						<div class="common-article-content">
							<div class="row row1">
								<div class="onephoto">
									<img class="onephotoImg" :src="projectIcon">
								</div>
								<div style="margin-left: 20px;" class="name">
									<div><span class="oneusername">{{projectCode}}</span></div>
									<div><span class="topicOnedec">行情分析</span></div>
									<div class="projectName-time">111</div>
								</div>
								<div class="index-score projectScore">9.1</div>
								<div @click="attention" class="discoveryBtn pt">
									+ 关注
								</div>
							</div>
							<div class="onecommon">
								<ul>
									<li class="ping" @click="next1"><span>评测</span></li>
									<li @click="next2"><span>爆料</span></li>
									<li @click="next3"><span>文章</span></li>
									
								</ul>
								<div class="topicSelect">
									<div @click="choiceness" class="choiceness choice1"><a href="javacript:void(0)">精选</a></div>
									<div @click="datenew" class="choiceness choice2"><a href="javacript:void(0)">最新</a></div>
								</div>
							</div>

						</div>
					</div>
					<div>
						<router-view/>
					</div>

				</div>
				<!--右边消息-->
				<div class="project-attention">
					<!--热门项目-->
					<div class="attention-hot attention-bag margin-bottom">
						<div class="attention-wrap">
							<div class="attention-hot-title" style="display: flex;align-items: center;">
								<img src="../../assets/common/tag.png" />
								<span class="attention-hot-pro">热门标签</span>
							</div>
							<div style="padding-top: 30px;">
								<ul class="topicTags">
									<li class="topicTag">团队调研</li>
									<li style="margin: 0 10px;" class="topicTag">团队调研</li>
									<li class="topicTag">技术分析</li>
									<li class="topicTag">团队调研</li>
									<li style="margin: 0 10px;" class="topicTag">团队调研</li>
									<li class="topicTag">技术分析</li>
									<li class="topicTag">团队调研</li>
									<li style="margin: 0 10px;" class="topicTag">团队调研</li>
									<li class="topicTag">团队调研</li>
								</ul>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { projectIndex } from '@/service/project';
	import { saveFollow, cancelFollow } from '@/service/home';
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		name: 'projectdetail',
		data() {
			return {
				activeNames: ['1'],
				id: '',
				token: getCookie('token'),
				projectIcon: '',
				projectCode: '',
				projectTypeName: '',
				followerNum: '',
				raterNum: '',
				projectSignature: '',
				projectDesc: '',
				projectEnglishName: '',
				projectChineseName: '',
				issueDateStr: '',
				whitepaperUrl: '',
				websiteUrl: '',
				followStatus: 0,
				zfollowStatus: 0,
				totalScore: '',
				zicon: '',
				zuserName: '',
				isShow: true,
				activeUsers: [],
				userSignature: '',
				userId: 0
			}
		},
		mounted() {
			$(".onecommon li").on("click", function() {
				var index = $(this).index();
				console.log($(this).index())
				$(".onecommon li").removeClass("ping");
				$(this).addClass("ping");

			})

			//小于1600px   main-right展开
			//			this.resizeBannerImage();
			//			window.onresize = this.resizeBannerImage;

			console.log(this.$route.query.id)
			this.id = this.$route.query.id - 0;
			this.projectdetail()
//			this.$router.push('/topic/evaluating?id=' + this.id)
			this.$router.push('/topic/evaluating')
			
			//
			$(".choiceness").on("click", function() {
				var index = $(this).index();
				$(".choiceness a").css("color","rgb(51,51,51)")
				$(".choiceness a ").eq(index).css("color","rgb(59,136,246)")

			})
		},
		updated() {
			//点击关注
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
		methods: {
			choiceness(){
				
			},
			datenew(){
				
			},
			
			projectdetail() {
				//				console.log(this.$route.query.id)
				this.id = this.$route.query.id - 0;
				var _this = this
				// 查询数据
				let data = {
					token: this.token,
					projectId: this.id
				}
				projectIndex(data).then(res => {
					if(res.code == 0) {
						this.projectIcon = res.data.project.projectIcon
						this.projectCode = res.data.project.projectCode
						this.followerNum = res.data.project.followerNum
						this.raterNum = res.data.project.raterNum
						this.projectSignature = res.data.project.projectSignature
						this.projectDesc = res.data.project.projectDesc
						//英文名
						this.projectEnglishName = res.data.project.projectEnglishName
						//中文名
						this.projectChineseName = res.data.project.projectChineseName
						//发行时间
						this.issueDateStr = res.data.project.issueDateStr
						//官网地址
						this.websiteUrl = res.data.project.websiteUrl
						//白皮书地址
						this.whitepaperUrl = res.data.project.whitepaperUrl
						this.followStatus = res.data.project.followStatus
						//分数
						this.totalScore = res.data.project.totalScore
						//概念
						this.projectTypeName = res.data.project.projectTypeName
						//站长用户信息
						this.zicon = res.data.project.owner.icon
						this.zuserName = res.data.project.owner.userName
						this.userSignature = res.data.project.owner.userSignature
						this.userId = res.data.project.owner.userId
						this.zfollowStatus = res.data.project.owner.followStatus
						//活跃用户
						if(res.data.project.activeUsers!=null){
							this.activeUsers = res.data.project.activeUsers
						}else{
							$(".attention-active").css('display','none')
						}
						

					}
				})
			},
			next1() {
				this.$router.push('/topic/evaluating?id=' + this.id)
			},
			next2() {
				this.$router.push('/topic/burst?id=' + this.id)
			},
			next3() {
				this.$router.push('/topic/article?id=' + this.id)
			},
			attention() {
				if(this.token != '') {
					if($(".discoveryBtn").html() == "已关注") {
						//取消关注
						let data = {
							token: this.token,
							followType: 1,
							followedId: this.id
						}
						console.log(222)
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
							followType: 1,
							followedId: this.id
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
						})
					}
				} else {
					this.$message({
						type: 'error',
						message: '登陆后关注更多内容',
						duration: 1000
					});
				}

			},
			zattention() {
				if(this.token != '') {
					if($(".zbtnL").html() == "已关注") {
						//取消关注
						let data = {
							token: this.token,
							followType: 3,
							followedId: this.userId
						}
						
						cancelFollow(data).then(res => {
							if(res.code == 0) {
								console.log(res.data.followStatus)
								if(res.data.followStatus == 0) {
									console.log('取消关注')
									$(".zbtnL").css({
										backgroundColor: "rgb(59, 136, 246)",
										color: "rgb(255,255,255)"
									})
									$(".zbtnL").html("+ 关注")
								}
							}
						})
					} else {
						//去关注
						let data = {
							token: this.token,
							followType: 3,
							followedId: this.userId
						}
						saveFollow(data).then(res => {
							if(res.code == 0) {

								console.log(res.data.followStatus)
								if(res.data.followStatus == 1) {
									console.log('已经关注')
									$(".zbtnL").css({
										backgroundColor: "rgb(244, 244, 244)",
										color: "rgb(126, 126, 126)"
									})
									$(".zbtnL").html("已关注")
								}
							}
						})
					}
				} else {
					this.$message({
						type: 'error',
						message: '登陆后关注更多内容',
						duration: 1000
					});
				}

			},
			//点击关注
			hattention(createUserId, index) {
				if(this.token != "") {
					var _this = this
					if($(".btnL").eq(index).html() == "已关注") {
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
									$(".btnL").eq(index).css({
										backgroundColor: "rgb(59, 136, 246)",
										color: "rgb(255,255,255)"
									})
									$(".btnL").eq(index).html("+ 关注")
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
									$(".btnL").eq(index).css({
										backgroundColor: "rgb(244, 244, 244)",
										color: "rgb(126, 126, 126)"
									})
									$(".btnL").eq(index).html("已关注")
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
			evaluating() {
				this.$router.push('/summary/evaluatingdetail')
			}
		},

	}
</script>
<style lang="less">
	@import '../../css/global.css';
	@import '../../styles/common.less';
</style>