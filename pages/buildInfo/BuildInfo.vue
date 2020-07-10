<template>
	<view class="buildInfo_content">
		<view class="list">
			<u-checkbox-group @change="checkboxGroupChange" :wrap='wrap'>
				<u-checkbox @change="checkboxChange" v-model="item.check" v-for="(item,index) in list" :key="index" :name="item.name">{{item.name}}</u-checkbox>
			</u-checkbox-group>
			<!-- <u-checkbox 
				@change="checkboxChange" 
				v-model="item.checked" 
				:name="item.name"
			>{{item.name}}</u-checkbox> -->

			<!-- </view> -->
		</view>
		<view class="btn">
			<u-button type="primary" @click="getInfo()" :ripple='true'>确认</u-button>
		</view>

	</view>
</template>

<script src='./buildInfo.js'>
</script>

<style lang="less" scoped>
	.buildInfo_content {
		height: calc(100vh - 44px);
		background-color: #FFFFFF;
		padding: 20upx;
        display: flex;
		flex-direction: column;
		justify-content: space-between;
		.list {
			flex: 1;
			.tit {
				font-size: 36upx;
				line-height: 40upx;
			}

			.floorName {
				font-size: 28upx;
				line-height: 40upx;
				padding-left: 20upx;
			}
		}
		.btn{
			flex: 0 0 40px;
			margin-top: 50upx;
		}

	}
</style>
