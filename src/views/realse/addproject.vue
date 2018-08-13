<template>
	<div>
		<h1 class="showprojectH">发布文章</h1>
		<div class="cx-addproject">
			<div class="xm">
				<div class="pos progess">项目</div>
				<!--模糊查询币种-->
				<Search @aa="getA($event)"></Search>
				<span class="select">请选择相应的区块链项目</span>
			</div>
			<div class="evaluation">
				<div class="evaluationContent">
					<div class="progess margin-top-10">文章标题</div>
					<Input type="text" placeholder="请输入标题，建议标题字数在60个字以内" v-model="articleTitle" @on-blur="handleArticletitleBlur" class="margin-top-20" />
				</div>
				<div>
					<h3 class="progess add-title">文章内容</h3>
					<Simditor></Simditor>
				</div>
				<Row class="margin-top-20 publish-button-con">
					<span class="publish-button"><Button @click="handlePreview">预览</Button></span>
					<span class="publish-button"><Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button></span>
				</Row>
			</div>
		</div>
		<!--发布中-->
		<Tip></Tip>
	</div>
</template>
<script>
	import Simditor from '../../components/realse/simditor.vue'
	import Search from '../../components/realse/search.vue'
	import Tip from '../../components/realse/publishon.vue'
	import { publishW, savearticle } from '@/service/publish'
	import { getCookie } from '../../assets/js/cookie.js'

	export default {
		data() {
			return {
				articleTitle: "",
				search: "",
				publishLoading: false,
				cityList: [],
				model1: '',
				token: getCookie('token')
			}
		},
		components: {
			Simditor,
			Search,
			Tip
		},
		mounted() {},
		methods: {
			//模糊查询接收数据
			getA(data) {
				this.search = data;
			},
			handleArticletitleBlur() {
				if(this.articleTitle.length !== 0) {
					// this.articleError = '';
					localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
					if(!this.articlePathHasEdited) {
						let date = new Date();
						let year = date.getFullYear();
						let month = date.getMonth() + 1;
						let day = date.getDate();
						this.fixedLink = window.location.host + '/' + year + '/' + month + '/' + day + '/';
						this.articlePath = this.articleTitle;
						this.articlePathHasEdited = true;
						this.showLink = true;
					}
				} else {
					this.$Message.error('文章标题不可为空哦');
				}
			},
			p(s) {
				return s < 10 ? '0' + s : s;
			},
			//预览
			handlePreview() {
				//去除文本编译器的标签
				var dd = $("textarea").val().replace(/<\/?.+?>/g, "");

				var dds = dd.replace(/ /g, ""); //dds为得到后的内容
				var ddsd = dds.replace(/&nbsp;/ig, "");
				if(this.search != "") {
					if(this.articleTitle.length <= 60 && this.articleTitle != "") {

						if(ddsd != "") {
							let date = new Date();
							let year = date.getFullYear();
							let month = date.getMonth() + 1;
							let day = date.getDate();
							let hour = date.getHours();
							let minute = date.getMinutes();

							localStorage.publishTime = year + '-' + this.p(month) + '-' + this.p(day) + ' ' + hour + ':' + minute;
							localStorage.search = this.search
							localStorage.articleTitle = this.articleTitle;
							localStorage.content = $("textarea").val();

							window.open("/preview/article", "_blank")
							this.$router.push({
								path: "",
							})

						} else {
							this.$message({
								showClose: true,
								message: '内容不能为空',
								type: 'error'
							});
						}

					} else {
						this.$message({
							showClose: true,
							message: '文章标题小于60字且不能为空',
							type: 'error'
						});
					}
				} else {
					this.$message({
						showClose: true,
						message: '请选择项目',
						type: 'error'
					});
				}

			},
			canPublish() {
				if(this.articleTitle.length === 0 && this.articleTitle.length <= 30) {
					this.$Message.error('请输入文章总结');
					return false;
				} else {
					return true;
				}
			},

			//发布
			handlePublish() {
				//去除文本编译器的标签
				var dd = $("textarea").val().replace(/<\/?.+?>/g, "");

				var dds = dd.replace(/ /g, ""); //dds为得到后的内容
				var ddsd = dds.replace(/&nbsp;/ig, "");

				if(this.search == "") {
					this.$message({
						showClose: true,
						message: '请选择项目',
						type: 'error'
					});
				} else {
					if(this.articleTitle.length <= 60 && this.articleTitle != "") {
						if(ddsd == "") {
							this.$message({
								showClose: true,
								message: '内容不能为空',
								type: 'error'
							});
						} else {
							if(ddsd.toString().length < 25000) {
								//点击发布显示正在发布中
								$(".web-tip").show();

								setTimeout(() => {
									let data = {
										token: this.token,
										projectName: this.search,
										toHtmlTags: dds,
										postTitle: this.articleTitle,
										articleContents: $("textarea").val(),
									}
									savearticle(data).then(res => {
										//发布成功
										if(res.code == 0) {
											localStorage.setItem("url", JSON.stringify(res.data))
											this.$router.push('/previewsuc');
										}
									}).catch(function(error) {
										//如果后台报错就关闭弹窗
										$(".web-tip").hide();

										alert(error.msg);

									});
								}, 500);

							} else {
								this.$message({
									showClose: true,
									message: '内容超过限制',
									type: 'error'
								});

							}
						}

					} else {
						this.$message({
							showClose: true,
							message: '文章标题小于60字且不能为空',
							type: 'error'
						});
					}
				}

			}
		}
	}
</script>
<style lang="less">
	@import '../../views/realse/pub.less';
	@import '../../styles/common.less';
	.progess {
		text-align: left;
	}
	
	.ivu-row {
		text-align: left;
	}
</style>