<template>
	<div class="web-tip">
		<p>
      <!--评测-->
			<img class="publishon-img" src="../../assets/img/web-tip.png" />
      <!--登录-->
      <!--<img class="loginon" src="../assets/img/loginon.png"/>-->
		</p>
	</div>
</template>

<script>
	export default {

	}
</script>

<style lang="less">
	/*发布的时候显示发布中*/
	.web-tip {
		display: none;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		filter: alpha(opacity=80);
		height: 100%;
		width: 100%;
		z-index: 100;
		p {
			text-align: center;
			margin-top: 10%;
			padding: 0 5%;
		}
	}
</style>
