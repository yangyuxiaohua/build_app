<template>
	<view class="laws_content">
		<view class="list" v-for="(item,index) in list" :key='index'>
			<view class="listTit">
				{{item.listTit}}
			</view>
			<view class="listContainer">
				<view class="part">
					{{item.part}}
				</view>
				<view class="time">
					{{item.time}}
				</view>
			</view>
		</view>

	</view>
</template>

<script src='./Laws.js'>
</script>

<style lang="less" scoped>
	.laws_content {
		height: calc(100vh - 44px);
		background-color: #FFFFFF;
		padding: 20rpx;
		.list{
			border-bottom: 2px solid #ccc;
			padding: 20rpx 20rpx;
			.listTit{
				color: #000;
				font-size: 32rpx;
			}
			.listContainer{
				font-size: 24rpx;
				color: #808080;
				display: flex;
				justify-content: space-between;
				line-height: 70rpx;
			}
		}
	}
</style>
