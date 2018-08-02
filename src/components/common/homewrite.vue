<template>
	<div class="layout">
		<Layout>
			<Header>
				<Menu mode="horizontal" theme="dark" active-name="1">

					<div class="layout-nav">
						<div class="layout-logo" @click="index">
							<img src="../../assets/logo.png" /> 区分内容发布平台
						</div>
						<Dropdown  trigger="click" style="margin-left: 20px">
							<img class="headerImg" :src="src" />
							<img class="layoutV" src=""/>
							<a href="javascript:void(0)">

								{{userNick}}
								<Icon type="arrow-down-b"></Icon>
							</a>
							<DropdownMenu  slot="list">
								<DropdownItem><span @click="attention">认证</span></DropdownItem>
								<DropdownItem>
									<a href="###" @click="quit">点击注销</a>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				</Menu>
			</Header>
			<Layout>
				<router-view></router-view>
			</Layout>
		</Layout>
	</div>
</template>
<script>
	//	import { setCookie,getCookie,delCookie } from '../assets/js/cookie.js'
	import { reviewedL } from '@/service/home'
	import { getCookie,delCookie} from '../../assets/js/cookie.js'
	export default {
		data() {
			return {
				name: '',
				token:getCookie('token'),
				userNick: '',
				src: "",
				userType:''
			}
		},
		mounted() {
			console.log(unescape(getCookie('user')),getCookie('token'))
			 
			//头像
			this.src = getCookie('img')
			//用户名
			this.userNick = unescape(getCookie('user'))
			//加V
			this.userType = getCookie('userType')
			//普通用户
			if(this.userType ==1){
				$(".layoutV").css("display", "none")
			}
			//项目方
			if(this.userType ==2){
				 $(".layoutV").attr("src", "../../static/img/p.gif")
			}
			//评测媒体
			if(this.userType ==3){
				 $(".layoutV").attr("src", "../../static/img/F.gif")
			}
			//机构号
			if(this.userType ==4){
				$(".layoutV").attr("src", "../../static/img/V.gif")
			}
		},
		methods: {
			//点击logo
			index() {
				this.$router.push("/quhomelist")
			},
			attention() {
				var _this = this
				this.$router.push("/attentionselect")
				let data = {
					token: this.token
				}
				reviewedL(data).then(res => {
					if(res.code == 0) {
						//成功
						if(res.data.status == 2) {
							this.$router.push("/examine")
						}
						// 待审核
						else if(res.data.status == 1) {

							this.$router.push("/examine")
						}
						//审核不通过
						else if(res.data.status == 3) {
							this.$router.push("/examine")
						}
						//未提交审核
						else if(res.data.status == 4) {
							_this.$router.push("/attentionSelect")
						}
					}
				}).catch(function(error) {
					alert(error.msg);
				});

			},
			quit() {
				delCookie('username')
				delCookie('token')
				this.$router.push("/login");
			}
		}
	}
</script>
<style >
	.layout .ivu-select-dropdown{
		top: 60px!important;
	}
	.layout {
		height: 100%;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
	}

	.layout-logo {
		display: inline-block;
		width: 300px;
		height: 60px;
		float: left;
		border-radius: 3px;
		color: #000;
		font-size: 24px;
		cursor: pointer;
	}

	.layout-logo img {
		width: 12%;
		display: inline-block;
		margin-top: 7px;
		float: left;
	}

	.layout-nav {
		width: 200px;
		height: 60px;
		text-align: center;
	}

	.ivu-layout-header {
		position: relative;
		background: #fff;
	}

	.ivu-dropdown {
		position: absolute;
		right: 60px;
	}

	.ivu-dropdown-rel>a {
		color: #fff;
	}

	.ivu-menu-dark {
		background: #fff;
	}

	.ivu-dropdown-rel>a {
		color: #000;
	}

	.ivu-dropdown-item {
		padding: 7px 26px;
	}

	.ivu-dropdown-item span {
		display: inline-block;
		padding: 6px 35px;
	}

	.headerImg {
		width: 35px;
		height: 35px;
		border: 1px solid #ddd;
		border-radius: 50%;
		float: left;
		margin-top: 14px;
		margin-right: 10px;
	}
	.layoutV{
		width: 12px;
		position: absolute;
		left: 24px;
		bottom: 11px;
	}
</style>
