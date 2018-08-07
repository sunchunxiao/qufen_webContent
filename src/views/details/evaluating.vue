<template>
	<div>
		<div style="background-color:rgb(246,246,246) ;" >
			<div class="commmon">
				<!--左边文章-->
				<div class="common-article">
					<div class="detail-box evaluating">
						<div class="detailWrap">
							<div class="row row1">
								<div class="photo">
									<img slot="icon" :src="src">
								</div>
								<div class="name">
									<div class="projectName"><span class="projectName-name">{{username}} </span></div>
									<div class="projectName-time">{{timestr1}}</div>
								</div>
								<div @click="attention" class="discoveryBtn">
									+ 关注
								</div>
							</div>
							<div class="row articlerow2">
								<div class="test">{{articleTitle}}</div>
								<div class="index-score">{{totalscore}}分</div>
							</div>
							<div v-html="m" class="articleContent">
								{{m}}
							</div>
							<div class="articleTag">
								<div class="crack-tag1"><span class="span-name">BTC</span></div>
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
									<label>111</label>
								</div>
								<div class="detail index-preview">
									<img src="../../assets/common/share.png">
									<label>111</label>
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
								<span @click="attention" class="articleBack">回复</span>
							</div>
							<!--<div class="previewContent">
								<h2>评论</h2>
								<div class="contentList">
									<div class="list">
										<div class="contenlist-title"><img src="../../assets/common/FIND.png" /></div>
										<span class="listName">游来游去</span>
										<div class="listfloor">
											<span class="floor">16楼 03.15 11:15 </span>

										</div>
									</div>
									<p class="listContent">
										体自在EOS引力区的知识星球里有一个人，他在知识星球分享了一篇文章《数字会说明，老猫在想什么，写给eos的投资者们》，精明地推测出老猫分批地积累了上百万个EOS，这更能说明老猫看好EOS。道理很简单：因为看好，所以大量持有。
									</p>
									
									<div class="row articleRow">
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

									</div>

								</div>
								
								<div class="listContent">
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

								</div>
							</div>-->
						</div>
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
	import { articleInfo } from '@/service/home';
	import Data from '../../assets/js/date'
	export default {
		name: 'discovery',
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
				donateNum: '',
				timestr: '',
				timestr1: '',
				donateNum: '',
				commentsNum: '',
				praiseNum: '',
			}
		},
		
		updated() {
			$('.articleContent').find('img').css({
				width: '80%',
				height:'80%'
			})
			$('.articleContent').find('p').css({
				fontSize: '15px',
				width: "100%",
				margin: "1em 0",
				wordWrap: "break-word",
				lineHeight:'25px'
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

		},
		mounted() {
			//小于1600px   main-right展开
			this.resizeBannerImage();
			window.onresize = this.resizeBannerImage;
			

			//请求文章
			this.id = this.$route.query.id;
//			console.log(this.$route.query.id)
			var data = {
				postId: this.id
			}
			//测评
			articleInfo(data).then(res => {
				if(res.code == 0) {
					//						 console.log(res.data.projectEvaluationDetailResponse)
					var data = res.data.projectEvaluationDetailResponse

					this.articleTitle = data.post.postTitle
					//头像
					this.src = data.post.createUserIcon;
					//用户名
					this.username = data.post.createUserName;
					
					//时间  字符串切割
					//调用 Data.customData()
					var nowdate = Data.customData()
//					console.log(nowdate)
					var arr = data.post.createTimeStr.split(" ")

					this.timestr = arr[0];
					
//					console.log(this.timestr)
					if(nowdate == this.timestr) {
						var a1 = arr[1].split(":")
						console.log(a1)
						this.timestr1 = a1[0]+":"+a1[1];
					} else {
						this.timestr1 = arr[0];
					}

					//综合评分
					this.totalscore = data.evaluation.totalScore;
					//评分
					if(data.evaluation.professionalEvaDetail != null) {
						this.storeList = JSON.parse(data.evaluation.professionalEvaDetail);
						if(this.storeList.length == 0) {
							$(".sliderList").css("display", "none")
						}
					} else {
						//只有综合评测
						$(".sliderList").css("display", "none")
					}

					//文章
					this.m = data.evaluation.evauationContent
					//标签
					this.tag = data.post.projectCode;
					//赞助人数
					this.donateNum = data.post.donateNum;
					//评论人数
					this.commentsNum = data.post.commentsNum;
					//点赞人数
					this.praiseNum = data.post.praiseNum;

				}

			})

		},
		methods: {
			resizeBannerImage() {
				var _width = $(window).width();
				var _width1 = $(".common-article").offset().left
				// console.log(_width,_width1)

				if(_width<1590){
					var left = _width1+650
					$(".common-attention").css("left",left)
				}else{
					var left = _width1+715
					$(".common-attention").css("left",left)
				}

			},
			attention(){
				this.$alert('本功能目前只对APP开放', {
						confirmButtonText: '确定',
					});
			}
		}
	}
</script>
<style lang="less">
	@import './details.css';
	@import '../../css/global.css';
</style>