<template>
	<view class="require_content">
		<view v-html="methods">
			
		</view>
	</view>
</template>

<script src='./AcceptMethods.js'>
</script>

<style lang="less" scoped>
	.require_content{
		height: calc(100vh - 44px);
		// background-color: #1F1E27;
		padding: 20upx 10upx;
		.u-search{
			padding-top: 10px;
		}
	}
</style>
