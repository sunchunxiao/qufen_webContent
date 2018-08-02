<template>
	<div>
		<div style="background-color:rgb(246,246,246);" class="content1">
			<div class="detailArticle">
				<div class="detail-box">
					<div class="detailWrap">
						<div class="row row1">
							<div class="photo">
								<img slot="icon" :src="src" alt="区分">
							</div>
							<div class="name">
								<div class="projectName"><span class="projectName-name">{{username}} </span><span class="atten-span">/ 柚子</span></div>
								<div class="projectName-time">{{timestr}}</div>
							</div>
							<div class="discoveryBtn">
								+ 关注
							</div>
						</div>
						<div class="row articlerow2">
							<div class="test">{{articleTitle}}</div>
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
							<div class="crack-tag1"><span class="span-name">BTC</span></div>
						</div>
					</div>
					<div class="row articleRow5">
						<div class="article-atten">
							<div class="detail1 zan">
								<img src="../../assets/common/FIND1.png">
								<label>{{donateNum}}</label>
							</div>
							<div class="detail index-preview">
								<img src="../../assets/common/preview1.png">
								<label>{{commentsNum}}</label>
							</div>
						</div>
						<div class="articleDetail">
							<div class="detail zan">
								<img src="../../assets/common/zan1.png">
								<label>{{praiseNum}}</label>
							</div>
							<div class="detail index-preview">
								<img src="../../assets/common/shou.png">
								<label>收藏</label>
							</div>
							<div class="detail index-preview">
								<img src="../../assets/common/share.png">
								<label>分享</label>
							</div>
						</div>
					</div>
					<!--评论-->
					<div class="articlePreview">
						<!--请写下你的评论-->
						<div class="articleF">
							<img style="float: left;" src="../../assets/common/FIND1.png" />
							<div class="articleInputC articleInput"><input type="text" name="" placeholder="请写下你的评论.." /></div>
							<span class="articleBack">回复</span>
						</div>
						<div class="previewContent">
							<h2>评论</h2>
							<div class="contentList">
								<div class="list">
									<div class="contenlist-title"><img src="../../assets/common/FIND1.png" /></div>
									<span class="listName">游来游去</span>
									<div class="listfloor">
										<span class="floor">16楼 03.15 11:15 </span>
									</div>
								</div>
								<p class="listContent">
									体自在EOS引力区的知识星球里有一个人，他在知识星球分享了一篇文章《数字会说明，老猫在想什么，写给eos的投资者们》，精明地推测出老猫分批地积累了上百万个EOS，这更能说明老猫看好EOS。道理很简单：因为看好，所以大量持有。
								</p>
								<!--点赞-->
								<div class="row articleRow">
									<div class="article-atten">
										<div class="detail1 zan">
											<img src="../../assets/common/FIND1.png">
											<label>128</label>
										</div>
										<div class="detail index-preview">
											<img src="../../assets/common/preview1.png">
											<label>111</label>
										</div>
									</div>

								</div>

							</div>
							<!--评论人-->
							<div class="listContent">
								<div>
									<div>张三：@游来游去 <span class="listContentTime">03.15 11:15</span></div>
									<div>防弹也有很多舞台为了效果是预录的，可以很明显</div>
								</div>
							</div>
							<!--评论点赞-->
							<div class="row articleRow rowLeft">
								<div class="article-atten">
									<div class="detail1 zan">
										<img src="../../assets/common/zan1.png">
										<label>128</label>
									</div>
									<div class="detail index-preview">
										<img src="../../assets/common/preview1.png">
										<label>111</label>
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
	import { discuss } from '@/service/home';
	export default {
		data() {
			return {
				isChoose: undefined,
				isScale: undefined,
				articleTitle: '',
				src: '',

				username: '',
				userSignature: '',
				disscussContents: '',
				imgUrl: '',
				postImg: [],
				commentsehot: '',
				commenticon: [],
				timestr: '',
				donateNum: '',
				commentsNum: '',
				praiseNum: '',

			}
		},
		
		mounted() {
			this.id = this.$route.query.id;
			console.log(this.$route.query.id)
			let data = {
				postId: this.id
			}
			//爆料
			discuss(data).then(res => {
				if(res.code == 0) {
					var data = res.data.discussShare
					//头像加V
					var cuser = data.cUsertype
					//					if(cuser == 1) {
					//						$(".imgV").css("display", "none")
					//					}
					//					//项目方
					//					if(cuser == 2) {
					//						$(".imgV").attr("src", "../../../static/elevation/p.gif")
					//					}
					//					//评测媒体
					//					if(cuser == 3) {
					//						$(".imgV").attr("src", "../../../static/elevation/F.gif")
					//					}
					//					//机构号
					//					if(cuser == 4) {
					//						$(".imgV").attr("src", "../../../static/elevation/V.gif")
					//
					//					}
					//标题
					this.articleTitle = data.post.postTitle
					//头像
					this.src = data.post.createUserIcon;
					//用户昵称
					this.username = data.post.createUserName;
					//时间  字符串切割
					var arr = data.post.createTimeStr.split(" ")

					this.timestr = arr[0];

					this.userSignature = data.post.createUserSignature;
					//文章内容
					this.disscussContents = data.discuss.disscussContents;
					console.log(this.disscussContents)

					//图片
					var a = JSON.parse(data.post.postSmallImages);
					//					console.log(a)
					if(a.length != 0) {
						if(a.length >= 3) {
							a = a.slice(0, 3)
						}

						for(let i = 0; i < a.length; i++) {
							this.imgUrl = a[i].fileUrl
							this.postImg.push({
								src: this.imgUrl
							})
							console.log(this.postImg)
						}
					}

					//标签
					this.projectCode = data.post.projectCode;
					//赞助人数
					this.donateNum = data.post.donateNum;
					//评论人数
					this.commentsNum = data.post.commentsNum;
					//点赞人数
					this.praiseNum = data.post.praiseNum;
					//最多选择标签
					//					this.tagInfo = JSON.parse(data.tagInfo);
					//热门评论
					this.commentsehot = data.commentsehot;
					var result = data.commentsehot;
					//热门评论头像
					if(result != null) {
						for(let i = 0; i < result.length; i++) {
							var b = data.commentsehot[i].commentUserIcon;
							this.commenticon.push(b)
							//							console.log(this.commenticon)
						}
					}
					//热门评论如果是没有，不显示
					if(this.commentsehot == null) {
						$(".hot").css("display", "none")
					}

					//时间  字符串切割
					var arr = data.post.createTimeStr.split(" ")
					//					console.log(arr[0])
					this.timestr = arr[0];
					//缩略图
					// this.imgUrl = JSON.parse(data.post.postSmallImages)
					//缩略文章
					this.postShortDesc = data.post.postShortDesc
				}

			})
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
			});

		},
		methods: {
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

			}
		}
	}
</script>

<style>
	@import './details.css';
	@import '../../css/global.css';
</style>