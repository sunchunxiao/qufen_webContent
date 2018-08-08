<template>
	<div class="discussion">
		<h1 class="showprojectH">发表爆料</h1>
		<div class="cx-addproject">
			<!--项目选择-->
			<div class="xm">
				<div class="pos progess">项目</div>
				<!--模糊查询币种-->
				<Search @aa="getA($event)"></Search>
				<span class="select">请选择相应的区块链项目</span>
			</div>
			<!--文字内容-->
			<div class="evaluation">
				<div class="evaluationContent margin-top-20">
					<div class="progess margin-top-10">爆料标题</div>
					<Input type="text" placeholder="请输入标题，建议标题字数在60个字以内" v-model="articleTitle" @on-blur="handleArticletitleBlur" class="margin-top-20" />
				</div>
				<h3 class="progess add-title">文字内容 <span class="add-title1">(内容1000 / 剩余<span id="word"> 1000</span>个)</span></h3>
				<!--引simditor文本编译器-->
				<!--<Simditor></Simditor>-->
				<Input class="disText" @keyup.native="up" @keydown.native="down" id="weibo" v-model="value6" type="textarea" :rows="6" placeholder="输入内容"></Input>
			</div>
			<!--图片上传-->
			<div style="color: black;font-size: 12px;">
				<h3 class="p margin-top-10">上传图片</h3>
				<p class="upload-img">选择图片上传，支持jpg.png. 小于5M，最多9张</p>
				<div class="max-nine">

					<div class="demo-upload-list" v-for="item in uploadList">
						<template v-if="item.status === 'finished'">
							<img :src="item.url">
							<div class="demo-upload-list-cover">
								<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
								<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
							</div>
						</template>

					</div>
					<Upload ref="upload" name="file" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="5120" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="https://upload-z2.qiniup.com" :data="uptoken" style="display: inline-block;width:58px;">
						<div style="width: 58px;height:58px;line-height: 58px;">
							<Icon type="ios-camera" size="20"></Icon>
						</div>
					</Upload>

				</div>
				<Modal title="View Image" v-model="visible">
					<img :src="imgName" v-if="visible" style="width: 100%">
				</Modal>
			</div>
			<!--标签选择和保存文章-->
			<div>
				<h3 class="p">标签</h3>
				<p class="upload-img">选择爆料标签，最多三个</p>
				<div class="max-nine">
					<ul class="label">
						<!--<li class="labelLi" v-for="(item,index) in tag" @click="dian(index)">{{item.tagName}}</li>-->
						<li class="labelLi" v-for="(item,index) in tag" @click="dian(item.tagName,item.tagId,index)">{{item.tagName}}</li>
					</ul>

				</div>
				<Row class="margin-top-20 publish-button-con">
					<span class="publish-button"><Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button></span>
				</Row>
			</div>
		</div>
		<Tip></Tip>
	</div>
</template>
<script>
	import Search from '../../components/realse/search.vue'
	import Tip from '../../components/realse/publishon.vue'
	import { publishtag, savediscuss, upload } from '@/service/publish'
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		data() {
			return {
				articleTitle: "",
				search: "",
				arr: [],
				value6: '',
				defaultList: [],
				imgofurl: '',
				imgName: '',
				visible: false,
				publishLoading: false,
				flag: false,
				uploadList: [],
				cityList: [],
				tag: [],
				model1: '',
				num: 0,
				token: getCookie('token'),
				tagthree: [],
				num: 0,
				uptoken: {},
				date1: "",
				userId: ""
			}
		},
		components: {
			Search,
			Tip
		},

		mounted() {

			//获取七牛云token和用户id
			this.getToken();

			this.uploadList = this.$refs.upload.fileList;

			//发送请求
			let data = {
				id: 1
			}

			publishtag().then(res => {
				if(res.code == 0) {
					var result = res.data.tagList
					for(let i = 0; i < result.length; i++) {
						var name = result[i].tagName
						var id = result[i].tagId
						this.tag.push({
							tagName: name,
							seen: false,
							tagId: id
						})
					}
				}
			}).catch(function(error) {
				console.log(error.msg);
			});

		},
		methods: {
			//时间
			getDate() {
				var myDate = new Date();
				//获取当前年
				var year = myDate.getFullYear();
				//获取当前月
				var month = myDate.getMonth() + 1;
				if(month < 10) {
					month = "0" + month;
				}
				//获取当前日
				var date = myDate.getDate();
				//时
				var h = myDate.getHours(); //获取当前小时数(0-23)
				//分
				var m = myDate.getMinutes(); //获取当前分钟数(0-59)
				//秒
				var s = myDate.getSeconds();
				//毫秒
				var ms = myDate.getMilliseconds()
				var now = year + month + date + h + m + s + ms;
				this.date1 = now

			},
			getToken() {
				let data1 = {
					token: this.token
				}
				upload(data1).then(res => {
					if(res.code == 0) {
						//						console.log(res.data)
						this.uptoken.token = res.data.upToken
						this.userId = res.data.uid

					}
				})
			},
			//多文本的字数鼠标的抬起事件
			up() {
				var len = $("textarea").val().length;
				if(len > 1000) {
					$("textarea").val($("textarea").val().substring(0, 1000));

				}
				var num = 1000 - len;
				$("#word").text(num);
			},
			//发布的内容不得超过300
			down() {
				var len = $("textarea").val().length;
				if(len > 1000) {
					$("textarea").val($("textarea").val().substring(0, 1000));

				}
				var num = 1000 - len;
				$("#word").text(num);

			},
			//模糊查询接收数据
			getA(data) {
				this.search = data;
			},
			//标签点击
			dian(name, id, index) {

				this.tag[index].seen = !this.tag[index].seen
				if(this.tag[index].seen == true) {
					$(".labelLi").eq(index).css("background", "#408ff1");
					//加入数组对象
					this.tagthree.push({
						tagName: name,
						tagId: id
					})
					// console.log(this.tagthree)
					//循环，检查数组里是否是三条数据
					for(var i = 0; i < this.tagthree.length; i++) {
						//如果大于三条提示并从数组中删除
						if(i >= 3) {
							this.$message({
								showClose: true,
								message: "标签不能超过三条",
								type: 'error',
								duration: 1500
							});
							$(".labelLi").eq(index).css("background", "#b7b7b7");
							this.tagthree.splice(i, 1)
							//将其变为false，下次为true 再次点击添加样式
							this.tag[index].seen = false
						}
					}

				} else {
					$(".labelLi").eq(index).css("background", "#b7b7b7");
					for(var i = 0; i < this.tagthree.length; i++) {
						console.log(this.tagthree[i].tagName, name)
						if(this.tagthree[i].tagName == name) {
							var a = i
							this.tagthree.splice(a, 1)

						}
					}

					console.log(this.tagthree)
				}

			},
			//点击查看图片
			handleView(name) {
				//				console.log(name)
				this.imgofurl = name.imgofurl,
					this.imgName = "https://pic.qufen.top/" + name;
				this.visible = true;
			},
			//点击删除图片
			handleRemove(file) {
				const fileList = this.$refs.upload.fileList;
				this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
			},
			handleSuccess(res, file) {
				//				console.log(res)
				var a = res.key
				file.url = "https://pic.qufen.top/" + res.key;
				var b = file.url.toString();
				file.name = a;
			},
			handleFormatError(file) {

				this.$Notice.warning({
					title: '文件格式不正确',
					desc: '文件格式 ' + file.name + ' 不正确，请选择JPG或PNG.'
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: '超过文件大小限制',
					desc: '文件  ' + file.name + ' 太大了，不超过5M.'
				});
			},
			handleBeforeUpload(file) {
				//获取当前时间
				this.getDate()

				//				console.log(file.name.split(".")[1])
				var imgurl = file.name.split(".")[1]
				//				console.log(this.date, this.userId)

				this.uptoken.key = "posts" + this.date1 + this.userId + "." + imgurl
				//				console.log(this.uptoken.key)
				const check = this.uploadList.length < 9;
				if(!check) {
					this.$Notice.warning({
						title: '最多传九张图片'
					});
				}
				return check;
			},
			//失焦事件
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
					// this.articleError = '文章标题不可为空哦';
					this.$Message.error('文章标题不可为空哦');
				}
			},

			//发布
			handlePublish() {
				console.log($("textarea").text())
				var val = $("textarea").val()
				val.replace(new RegExp("\n", "gm"), "<br>");
				// console.log(val)
				this.arr = [];
				var _this = this
				for(let i = 0; i < this.uploadList.length; i++) {
					// console.log(this.uploadList)
					this.arr.push({
						fileUrl: this.uploadList[i].url
					});
				}

				//发布文章
				if(this.search != "") {
					if(this.articleTitle != "") {
						if(this.articleTitle.length <= 60) {
							if($("textarea").val().length > 0) {
								if($("textarea").val().length < 1001) {
									if(this.arr.length >= 1 && this.arr.length <= 9) {
										if(this.tagthree.length <= 3 && this.tagthree.length >= 1) {
											//点击发布显示正在发布中
											$(".web-tip").show();

											setTimeout(() => {
												let data = {
													token: this.token,
													projectName: this.search,
													postTitle: this.articleTitle,
													disscussContents: $("textarea").val(),
													discussImages: JSON.stringify(this.arr),
													tagInfos: JSON.stringify(this.tagthree)
												}
												savediscuss(data).then(res => {
													if(res.code == 0) {
														console.log(res.data)
														localStorage.setItem("url", JSON.stringify(res.data))
														this.$router.push('/previewsuc');
													} else {
														this.$message({
															showClose: true,
															message: data.msg,
															type: 'error',
															duration: 1500
														});
													}
												}).catch(function(error) {
													//如果后台报错就关闭弹窗
													$(".web-tip").hide();
													alert(error.msg)

												});
											}, 500);

										} else {
											this.$message({
												showClose: true,
												message: '标签至少一条，不能超过三条',
												type: 'error',
												duration: 1500
											});
										}
									} else {
										this.$message({
											showClose: true,
											message: '请上传图片',
											type: 'error',
											duration: 1500
										});

									}
								} else {
									this.$message({
										showClose: true,
										message: '发布内容不能超过1000字',
										type: 'error',
										duration: 1500
									});
								}
							} else {
								this.$message({
									showClose: true,
									message: '发布内容不能为空',
									type: 'error',
									duration: 1500
								});
							}

						} else {
							this.$message({
								showClose: true,
								message: '文章标题小于60字',
								type: 'error',
								duration: 1500
							});
						}
					} else {
						this.$message({
							showClose: true,
							message: '文章标题不能为空',
							type: 'error',
							duration: 1500
						});
					}

				} else {
					this.$message({
						showClose: true,
						message: '请选择项目',
						type: 'error',
						duration: 1500
					});
				}

			}
		}
	}
</script>
<style lang="less">
	@import './pub.less';
	@import '../..//styles/common.less';
	.add-title1 {
		font-size: 12px;
	}
	
	.back {
		background: #408ff1;
	}
	
	.discussion .max-nine .ivu-upload {
		width: 58px!important;
		height: 58px!important;
	}
	
	.discussion .ivu-row {
		text-align: left;
	}
	
	.discussion .upload-img {
		text-align: left;
		margin: 10px 0;
	}
	
	.background {
		background: lightblue;
	}
	
	.discussion .max-nine {
		text-align: left;
		margin: 20px 0;
	}
	
	.discussion .label {
		list-style: none;
		overflow: hidden;
	}
	
	.labelLi {
		width: 90px;
		height: 25px;
		line-height: 25px;
		font-size: 14px;
		color: #fff;
		background: #b7b7b7;
		border-radius: 20px;
		text-align: center;
		float: left;
		margin-right: 10px;
		margin-bottom: 10px;
		cursor: pointer;
	}
	
	.discussion .demo-upload-list {
		display: inline-block;
		width: 60px;
		height: 60px;
		text-align: center;
		line-height: 60px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
		margin-right: 4px;
	}
	
	.discussion .demo-upload-list img {
		width: 100%;
		height: 100%;
	}
	
	.discussion .demo-upload-list-cover {
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .6);
	}
	
	.discussion .demo-upload-list:hover .demo-upload-list-cover {
		display: block;
	}
	
	.discussion .demo-upload-list-cover i {
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}
	
	.discussion .ivu-btn-primary {
		width: 150px;
	}
</style>