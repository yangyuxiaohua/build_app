<template>
	<view class="require_content">
		<u-search placeholder="关键字" v-model="keyword" :clearabled="true" shape="square" @custom="searchText()"></u-search>
		<view v-html="requiremess">
		</view>
	</view>
</template>

<script src='./Require.js'>
</script>

<style lang="less" scoped>
	.require_content{
		height: calc(100vh - 44px);
		// background-color: #1F1E27;
		padding-left:10upx ;
		.u-search{
			padding: 10px 0;
		}
	}
</style>
