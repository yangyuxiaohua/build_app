<template>
	<view class="engin_content">
		<u-cell-group>
			<u-cell-item v-for="(item,index) in list" :key='index' :title="item.title" value="查看详情" @tap='check(item)'></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script src="./engin.js"></script>

<style>
	.engin_content {
		text-align: center;
		height: 100vh-50px;
		margin-top: 200upx;
		margin: 0;
		padding: 0;
	}
</style>
