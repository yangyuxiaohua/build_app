<template>
	<view class="releaseNotice_content">
		<u-toast ref="uToast" />
		<view class="releaseNotice_content_top bgcFFF">
			<view class="tit">
				<text>标题 ： </text>
				<u-input v-model="title" :type="type" :border="border" :height="height" :auto-height="autoHeight" placeholder="请输入" />
			</view>
			<u-line color="#ccc" style="margin-top: 40rpx;"/>
			<view class="releasePerson">
				<text>接收人 ： </text>
				<u-input v-model="personValue" :type="type" :border="border" :height="height2" :auto-height="autoHeight" class="personInput" disabled="disabled"
				 placeholder="请选择" />
				<u-button type="primary" @tap="showTree" plain>选择</u-button>
			</view>
		</view>

		<view class="noticeContent">
			<u-input v-model="content" :type="type" :border="border" :height="height3" :auto-height="autoHeight" placeholder="请输入需要通知的内容" style="background-color: #fff;border-radius: 16rpx;"/>
		</view>
		<view style="text-align: center; margin-top: 200rpx; padding: 0 20rpx;">
			<u-button type="primary" @click="sureRelease">确认发布</u-button>
		</view>
		
		<tki-tree ref="tkitree" :selectParent="true" :multiple="true" :range="list" :foldAll="flod" rangeKey="partsName" @confirm="treeConfirm"
		 @cancel="treeCancel"></tki-tree>
	</view>

</template>

<script src='./releaseNotice.js'>
</script>

<style lang="less" scoped>
	.releaseNotice_content {
		height: calc(100vh);
		background-color: #F5F5F5;

		.releaseNotice_content_top {
       padding: 20rpx 10rpx;
	   line-height: 50rpx;
			.tit,
			.releasePerson {
				display: flex;
				justify-content: space-between;
				// padding: 0rpx 10rpx 0 0;

				// background-color: #FFFFFF;
				text {
					width: 140rpx;
					// line-height: 80rpx;
					text-align: right;
				}

				.personInput {
					margin-right: 10rpx;
				}
			}

			.releasePerson {
				margin-top: 40rpx;
			}
		}

		.noticeContent {
			padding: 60rpx 10rpx 0 10rpx;
		}

		.bgcFFF {
			background-color: #FFFFFF;
		}

		// .w80 {
		// 	width: 80%;
		// }
	}
</style>
