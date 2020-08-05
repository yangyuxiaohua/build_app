<template>
	<view class="message_content">
		<u-tabs-swiper ref="tabs" name="cate_name" :list="list" :is-scroll="false"></u-tabs-swiper @change = 'tabsChange()'>
			<!-- <swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				<scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom">
					...
				</scroll-view>
			</swiper-item>
		</swiper> -->
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
