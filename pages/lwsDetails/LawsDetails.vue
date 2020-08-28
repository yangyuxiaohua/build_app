<template>
	<view class="lawsDetail_content">
		<view class="listTit">
			{{laws.title}}
		</view>
		<view class="listContainer">
			<view class="part">
				{{laws.factoryName}}
			</view>
			<view class="time">
				{{laws.createTime}}
			</view>
		</view>
		<view class="content" v-html="laws.content">
			
		</view>
	</view>
</template>

<script src='./lawsDetails.js'>
</script>

<style lang="less" scoped>
	.lawsDetail_content{
		height: calc(100vh);
		background-color: #FFFFFF;
		padding: 0 10rpx;
		.listTit{
			color: #000;
			font-size: 32rpx;
			text-align: center;
			line-height: 60rpx;
		}
		.listContainer{
			font-size: 24rpx;
			color: #808080;
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;
			line-height: 70rpx;
		}
		.content{
			line-height: 1.5em;
		}
	}
</style>
