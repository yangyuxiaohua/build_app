<template>
	<view class="message_content">
		<u-tabs-swiper ref="tabs" :list="list" :is-scroll="true"></u-tabs-swiper>

	</view>
</template>

<script src='./MessageNotification.js'>
</script>

<style lang="less" scoped>
	.message_content {
		height: calc(100vh - 44px);
		background-color: #FFFFFF;
	}
</style>
