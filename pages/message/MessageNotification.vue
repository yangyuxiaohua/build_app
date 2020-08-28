<template>
	<view class="message_content">
		<view class="tabs">
			<view class="tab" v-for="(item,index) in list" :key=index :class="{c0E8AFE:index==current}" @click="tabsChange(index,item.type)">
				<u-badge type="error" :count="item.num" :offset="ubadgeOffset" size="mini"></u-badge>
				{{item.name}}
			</view>
		</view>
        <view class="releaseNoticesText" v-show="roleShow">
        	<text @click="toReleaseNotice">发布通知 +</text>
        </view>
		<view class="swiperWrapper">
			<!-- 全部 -->
			<view class="allMessageWrapper">
				<view class="noMessage" v-if="messageList.length <= 0">
					<u-empty text="没有新的消息" mode="list"></u-empty>
				</view>
				<view class="allMessageLists" v-else>
					<view class="allMessageList" v-for="(item,index) in messageList" :key='index'>
						<view class="allMessageHeader">
							<view class="allMessagePublisher">
								{{item.createUsername}}
							</view>
							<view class="allMessageTime">
								{{item.createTime}}
							</view>
						</view>
						<view class="allMessageContainer">
							<u-read-more :toggle="true" :shadow-style="shadowStyle" show-height=30>
								<!-- <rich-text :nodes="item.content"></rich-text> -->
								<text class="allMessageListContent">{{item.content}}</text>
							</u-read-more>
						</view>

					</view>
				</view>
			</view>
			<!-- 公告 -->
			<!-- <view class="noticeWrapper" v-if='current==1'>
				111111
			</view> -->
			<!-- 通知 -->
			<!-- <view class="informWrapper" v-if='current==2'>
				222222
			</view> -->
			<!-- 提醒 -->
			<!-- <view class="remindWrapper" v-if='current==3'>
				33333333
			</view> -->
			<view class="wrap" v-show="isLoadMore">
				<u-loadmore :status="loadStatus" />
			</view>
		</view>


		
	</view>
</template>

<script src='./MessageNotification.js'>
</script>

<style lang="less" scoped>
	.message_content {
		height: calc(100vh);
		// height: 100%;
		background-color: #FFFFFF;
		// display: flex;
		// flex-direction: column;

		.tabs {
			display: flex;
			// height: ;
			// flex: 0 0 100rpx;

			.tab {
				position: relative;
				width: 25%;
				line-height: 100rpx;
				text-align: center;
				font-size: 32rpx;
			}
		}

		.swiperWrapper {
			// height: calc(100vh - 90px);
			.allMessageWrapper {
				.noMessage {}
 
				.allMessageLists {
					border-top: 15rpx solid #DCDFE6;

					.allMessageList {
						background-color: #DCDFE6;
						padding-bottom: 15rpx;

						.allMessageHeader {
							background-color: #fff;
							display: flex;
							justify-content: space-between;
							padding: 0 20rpx;
							line-height: 50rpx;

							.allMessagePublisher {
								font-size: 32rpx;
								color: #000;
							}

							.allMessageTime {
								min-width: 240rpx;
								color: #808080;

							}
						}

						.allMessageContainer {
							background-color: #fff;
							padding: 0 20rpx;
							min-height: 100rpx;

							.allMessageListContent {
								line-height: 20rpx;
							}
						}
					}
				}
			}
		}
		.c0E8AFE {
			color: #0E8AFE;
			border-bottom: 2px solid #0E8AFE;
		}

		.u-content {
			line-height: 20rpx;
		}
        .wrap{
			line-height: 80rpx;
		}
		.releaseNoticesText {
			flex: 0 0 80rpx;
			// position: fixed;
			// bottom: 0;
			// right: 40%;
			line-height: 80rpx;
			color: #0E8AFE;
			text-align: center;
			font-size: 32rpx;
			z-index: 100;
		}
	}
</style>
