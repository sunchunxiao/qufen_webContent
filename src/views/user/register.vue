<template>
	<div class="cx-register">
		<Header></Header>
		<div class="registerLon">
			<div class="bgc">
				<div class="register-title">
					<img class="logo-title" src="../../assets/login/logo.png" />
					<span>投资区块链，一定要区分</span>
				</div>
				<div class="bac-wrapper">
					<!--注册-->
					<div class="bgc-wrap register-wrap" v-show="showRegister">
						<h1>注册区分</h1>
						<p v-show="showTishi">{{tishi}}</p>
						<div class="wrap" style="margin-top: 35px;">
							<!--autocomplete="off" 禁止输入框显示用户历史记录-->
							<input autocomplete="off" class="wrap-input" type="text" placeholder="请输入手机号">
							<img class="loginIcon" src="../../assets/login/icon1.png" />
						</div>
						<div class="wrap">
							<input class="wrap-input1" type="text" id="code" placeholder="请输入验证码">
							<img class="loginIcon" src="../../assets/login/icon2.png" />
							<span class="getCode">获取验证码</span>
						</div>
						<div class="wrap">
							<input class="wrap-input" type="password" placeholder="请输入密码">
							<img class="loginIcon" src="../../assets/login/icon3.png" />
						</div>
						<div class="loginBtn">立即注册</div>
						<div class="span toregister" style="text-align: right;" @click="ToLogin">已有账号？登录</div>
					</div>
					<!--登录-->
					<!--autocomplete="off" 禁止输入框显示用户历史记录-->
					<div class="bgc-wrap register-wrap" v-show="showLogin">
						<h1>登录区分</h1>
						<p v-show="showTishi">{{tishi}}</p>
						<div class="wrap" style="margin-top: 35px;">
							<!--autocomplete="off" 禁止输入框显示用户历史记录-->
							<input class="wrap-input" type="text" placeholder="请输入手机号" v-model="phone">
							<img class="loginIcon" src="../../assets/login/icon1.png" />
						</div>
						<div class="wrap">
							<input class="wrap-input" type="password" placeholder="请输入密码" v-model="password">
							<img class="loginIcon" src="../../assets/login/icon3.png" />
						</div>

						<div class="loginBtn" @click="login">立即登录</div>
						<div class="span">
							<input type="checkbox" name="autolog" id="autolog" />下次自动登录
							<span class="forgetpas">忘记密码</span>
							<span class="toregister" style="margin-left: 26px;" @click="ToRegister">注册</span>
						</div>

					</div>

				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import { setCookie, getCookie } from '../../assets/js/cookie.js'
	import { login } from '@/service/user'
	import Header from '@/components/layout/header'
	export default {
		data() {
			return {
				phone: '',
				password: '',
				newUsername: '',
				newPassword: '',
				tishi: '',
				showTishi: false,
				showLogin: true,
				showRegister: false
			}
		},
		components: {
			Header
		},
		mounted() {
			if(getCookie('rmbUser') == "true") {
				$("#autolog").attr("checked", true);
				this.phone = getCookie("username");
				//				 this.phone = getCookie("");
			}
			//			if(getCookie('username')) {
			//				this.$router.push('/discovery')
			//			}

		},
		methods: {
			//			hideShowPsw() {
			//				if(passwords.type == "text") {
			//					passwords.type = "password";
			//					//					Visiblepasswords.src = "../static/nVisiblepasswords.png";
			//				} else {
			//					passwords.type = "text";
			//					//					Visiblepasswords.src = "../../static/Visiblepasswords.png";
			//				}
			//			},
			login() {
				var myreg = /^1[34578]\d{9}$/;
				console.log($("#autolog").is(":checked"))
				if($("#autolog").is(":checked") == true) {
					setCookie('rmbUser', "true", timer)

				}
				var timer = 60 * 60 * 2
				setCookie('username', this.phone, timer)
				if(this.phone == "" || this.password == "") {
					this.$alert('请输入手机号或密码', {
						confirmButtonText: '确定',
					});
				} else {

					let data = {
						loginName: this.phone,
						password: this.password
					}
					var _this = this
					if(myreg.test(this.phone)) {
						login(data).then(res => {
							if(res.code == 0) {
								setCookie('changeLogin', 100, timer)
								setCookie('img', res.data.userModel.icon, timer)
								setCookie('user', res.data.userModel.userNick, timer)
								setCookie('userType', res.data.userModel.userType, timer)
								setCookie('token', res.data.s, timer)

								this.$router.push("/discovery")
								//							window.open('/discovery', "_blank")

							}

						}).catch(function(error) {
							//						alert(error.msg)
							_this.$alert(error.msg, {
								confirmButtonText: '确定',
							});
						});
					} else {
						this.$alert('手机号码格式错误', {
							confirmButtonText: '确定',
						});
					}

				}

			},
			ToRegister() {
				this.showRegister = true
				this.showLogin = false
			},
			ToLogin() {
				this.showRegister = false
				this.showLogin = true
			}

		}
	}
</script>

<style lang="less">
	@import './common.less';
</style>
