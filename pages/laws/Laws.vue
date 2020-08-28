<template>
	<view class="laws_content">
		<view class="list" v-for="(item,index) in list" :key='index' @click="toDetail(item)">
			<view class="listTit">
				{{item.title}}
			</view>
			<view class="listContainer">
				<view class="part">
					{{item.factoryName}}
				</view>
				<view class="time">
					{{item.createTime}}
				</view>
			</view>
		</view>
		<view class="wrap" v-show="isLoadMore">
			<u-loadmore :status="loadStatus" />
		</view>

	</view>
</template>

<script src='./Laws.js'>
</script>

<style lang="less" scoped>
	.laws_content {
		height: calc(100vh - 44px);
		background-color: #FFFFFF;
		padding: 0 10rpx;

		.list {
			border-bottom: 2px solid #ccc;
			padding: 10rpx 20rpx;

			.listTit {
				color: #000;
				font-size: 32rpx;
			}

			.listContainer {
				font-size: 24rpx;
				color: #808080;
				display: flex;
				justify-content: space-between;
				line-height: 70rpx;
			}
			.wrap{
				height: 80rpx;
			}
		}
	}
</style>
