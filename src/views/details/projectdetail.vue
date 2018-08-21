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
									<div><span class="onedec">{{raterNum}} 评测 •  {{followerNum}} 关注</span></div>
									<div class="projectName-time">{{projectSignature}}</div>
								</div>
								<div class="index-score projectScore">8.5分</div>
								<div  @click="attention" class="discoveryBtn pt">
									+ 关注
								</div>
							</div>
							<div class="onecommon">
								<ul>
									<li class="ping" @click="next1"><span>评测</span></li>
									<li @click="next2"><span>爆料</span></li>
									<li @click="next3"><span>文章</span></li>
								</ul>
							</div>

						</div>
					</div>
					<div>
						<router-view/>
					</div>

				</div>
				<!--右边消息-->
				<div class="project-attention">
					<!--二维码-->
					<!--<div class="attention-code attention-bag margin-bottom">
						<div class="attention-wrap">
							<div class="common-attention-code">
								<div style="padding: 7px;">
									<img src="../../assets/common/download.png" />
								</div>
								<p class="common-attention-down">下载区分APP不一样的区分</p>
							</div>
						</div>
					</div>-->
					<!--热门项目-->
					<div class="attention-hot attention-bag margin-bottom">
						<div class="attention-wrap">
							<!--<div class="margin-bottom-10 " style="font-size: 13px;">本网站更多功能还在完善中，请耐心等待...</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">官方QQ群：820043115</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">官方微信：qudong0405</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">微信客服：qudong0405</div>
							<div class="margin-bottom-10 " style="font-size: 13px;">官方微信社区</div>
							<div class="common-attention-code">
								<div style="padding: 7px;">
									<img src="../../assets/common/wxcode.png" />
								</div>
							</div>-->

							<div class="attention-hot-title">
								<img src="../../assets/project/introduction.png" />
								<span class="attention-hot-pro">项目介绍</span>
							</div>
							<p class="projectintroduce">
								{{projectDesc}}
							</p>
							<div style="padding-top: 30px;">
								<ul class="attenList attenListname">
									<li>
										<span>英文名</span>
										<span>{{projectEnglishName}}</span>
									</li>
									<li>
										<span>中文名</span>
										<span>{{projectChineseName}}</span>
									</li>
									<li >
										<span >发行时间</span>
										<span>{{issueDateStr}}</span>
									</li>
									<li class="specialleftname">
										<span class="leftname">官网</span>
										<span class="rightname">{{websiteUrl}}</span>
									</li>
									<li>
										<span>相关概念</span>
										<span>公链</span>
									</li>
									<li class="specialleftname">
										<span class="leftname">白皮书</span>
										<span class="rightname">{{whitepaperUrl}}</span>
									</li>

								</ul>
							</div>
						</div>
					</div>
					<!--站长-->
					<div class="attention-user attention-bag margin-bottom">
						<div class="attention-wrap">
							<div class="attention-hot-title">
								<img src="../../assets/project/zhan.png" />
								<span class="attention-hot-pro">站长</span>
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
					</div>
					<!--活跃用户-->
					<div class="attention-user attention-bag margin-bottom">
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
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { projectIndex } from '@/service/project';
	import {saveFollow, cancelFollow } from '@/service/home';
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		name: 'projectdetail',
		data() {
			return {
				id: '',
				token: getCookie('token'),
				projectIcon: '',
				projectCode: '',
				followerNum: '',
				raterNum: '',
				projectSignature: '',
				projectDesc: '',
				projectEnglishName: '',
				projectChineseName: '',
				issueDateStr: '',
				whitepaperUrl: '',
				websiteUrl: '',
				followStatus:0
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
			this.$router.push('/project/evaluatingdetail?id=' + this.id)
		},
		updated(){
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
//			resizeBannerImage() {
//				var _width = $(window).width();
//				var _width1 = $(".common-article").offset().left
//				// console.log(_width,_width1)
//
//				if(_width < 1590) {
//					var left = _width1 + 650
//					$(".common-attention").css("left", left)
//				} else {
//					var left = _width1 + 715
//					$(".common-attention").css("left", left)
//				}
//
//			},
			projectdetail() {
				//				console.log(this.$route.query.id)
				this.id = this.$route.query.id - 0;

				// 查询数据
				let data = {
					token: this.token,
					projectId: this.id
				}
				projectIndex(data).then(res => {
					if(res.code == 0) {
						console.log(res.data)
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

					}
				})
			},
			next1() {
				this.$router.push('/project/evaluatingdetail?id=' + this.id)
			},
			next2() {
				this.$router.push('/project/burstdetail?id=' + this.id)
			},
			next3() {
				this.$router.push('/project/articledetail?id=' + this.id)
			},
			attention() {
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
				
				
			},
			evaluating() {
				this.$router.push('/project/evaluatingdetail')
			}
		},

	}
</script>
<style lang="less">
	@import '../../css/global.css';
	@import '../../styles/common.less';
</style>