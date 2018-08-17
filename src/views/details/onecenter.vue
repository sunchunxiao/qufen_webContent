<template>
	<div>
		<div style="background-color:rgb(246,246,246) ; " >
			<div class="commmon1">

				<div class="detailcommmon">
					<!--信息-->
					<div class="common-article-wrap" >
						<div class="common-article-content">
							<div class="row row1">
								<div class="onephoto">
									<img  :src="projectIcon">
								</div>
								<div style="margin-left: 20px;" class="name">
									<div><span class="oneusername">111</span></div>
									<div><span class="onedec">区块链创业者,早期投资人</span></div>
									<div class="projectName-time">300 粉丝  •  1568 内容</div>
								</div>
								<div class="index-score projectScore">8.5分</div>
								<div @click="attention" class="discoveryBtn pt">
									+ 关注
								</div>
							</div>
							<div class="onecommon">
								<ul>
									<li class="ping" @click="next1"><span >评测</span></li>
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

			</div>
		</div>
	</div>
</template>

<script>
	import { projectIndex } from '@/service/project';
	import { getCookie } from '../../assets/js/cookie.js'
	export default {
		name: 'projectdetail',
		data() {
			return {
				id:'',
				token:getCookie('token')
			}
		},
		mounted(){
			$(".onecommon li").on("click", function() {
				var index = $(this).index();
				console.log($(this).index())
				$(".onecommon li").removeClass("ping");
				$(this).addClass("ping");

			})
//			console.log(this.$route.query.id)
			this.id = this.$route.query.id-0;
			this.projectdetail()
//			this.$router.push('/project/evaluatingdetail?id='+ this.id)
		},
		methods: {
			projectdetail(){
//				console.log(this.$route.query.id)
				this.id = this.$route.query.id-0;
				
				// 查询数据
				let data = {
					token: this.token,
					projectId:this.id
				}
				projectIndex(data).then(res => {
					if(res.code == 0) {
						console.log(res.data)
						
					}
				})
			},
			next1(){
//				this.$router.push('/project/evaluatingdetail?id='+ this.id)
			},
			next2(){
//				this.$router.push('/project/burstdetail?id='+ this.id)
			},
			next3(){
//				this.$router.push('/project/articeldetail?id='+ this.id)
			},
			attention() {
				this.$alert('本功能目前只对APP开放', {
					confirmButtonText: '确定',
				});
			},
			evaluating(){
				this.$router.push('/project/evaluatingdetail')
			}
		},
		
	}
</script>
<style lang="less">
	@import '../../css/global.css';
	@import '../../styles/common.less';
</style>
