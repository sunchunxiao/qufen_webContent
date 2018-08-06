<template>
	<div style="background-color:rgb(246,246,246);" class="content1">
		<div class="detailArticle">
			<div class="detail-box">
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
						<!--标题-->
						<div class="test">{{articleTitle}}</div>
						<!--<div class="index-score">8分</div>-->
					</div>
					<!--文章内容-->
					<div v-html="m" class="articleContent">
						{{m}}
					</div>
					<div class="articleTag">
						<div class="crack-tag1"><span class="span-name">{{tag}}</span></div>
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
						<div class="articleInputC articleInput"><input type="text" name="" placeholder="本功能只对APP开放.." /></div>
						<span class="articleBack">回复</span>
					</div>
					<!--评论-->
					<!--<div class="previewContent">
							<h2>评论</h2>
							<div>
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
							</div>
						</div>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	//	import Header from '@/components/common/home.vue'
	import { article } from '@/service/home';
	import Data from '../../assets/js/date'
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
				timestr1:'',
				imgUrls: [],
				donateNum: '',
				commentsNum: '',
				praiseNum: '',
				articleContents: '',
				imgUrl: '',
				commendationListL: ''

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
			});

		},
		mounted() {
			console.log(this.$route.query.id)
			this.id = this.$route.query.id;

			//发送请求
			var data = {
				postId: this.id
			}
			article(data).then(res => {
				if(res.code == 0) {
					var data = res.data.articleDetail

					//文章内容
					this.m = data.article.articleContents

					//标题
					this.articleTitle = data.postTitle
					//头像
					this.src = data.createUserIcon;

					this.username = data.createUserName;
					this.userSignature = data.createUserSignature;
					//标签
					this.tag = data.projectCode;
					
					//时间  字符串切割
					//调用 Data.customData()
					var nowdate = Data.customData()
					console.log(nowdate)
					var arr = data.createTimeStr.split(" ")

					this.timestr = arr[0];
					console.log(this.timestr)
					if(nowdate == this.timestr) {
						var a1 = arr[1].split(":")
//						console.log(a1)
						this.timestr1 = a1[0]+":"+a1[1];
					} else {
						this.timestr1 = arr[0];
					}
					
					//赞助人数
					this.donateNum = data.donateNum;
					//评论人数
					this.commentsNum = data.commentsNum;
					//点赞人数
					this.praiseNum = data.praiseNum;

					//文章介绍
					this.articleContents = data.article.articleContents;

				}

			})
		},
		methods: {
			attention() {
				this.$alert('本功能目前只对APP开放', {
					confirmButtonText: '确定',
				});
			}
		}
	}
</script>

<style>
	@import './details.css';
	@import '../../css/global.css';
</style>