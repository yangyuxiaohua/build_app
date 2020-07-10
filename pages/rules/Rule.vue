<template>
	<view class="rule_content">
		<view v-html="ruleContent">
			<!-- {{ruleContent}} -->
		</view>
	</view>
</template>

<script src='./rule.js'>
</script>

<style lang="less" scoped>
	.rule_content{
		height: calc(100vh - 44px);
		// background-color: #1F1E27;
		.u-search{
			padding-top: 10px;
		}
	}
</style>
