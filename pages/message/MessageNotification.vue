<template>
	<view class="message_content">
		<!-- <u-tabs :list="list" :is-scroll="false" :current="current" @change="tabsChange"></u-tabs> -->
		<view class="tabs">
			<view class="tab" v-for="(item,index) in list" :key=index :class="{c0E8AFE:index==current}" @click="tabsChange(index)">
				<u-badge type="error" :count="item.num" :offset="ubadgeOffset" size="mini"></u-badge>
				{{item.name}}
			</view>
		</view>
		<view class="swiperWrapper">
			<!-- 全部 -->
			<view class="allMessageWrapper" v-if='current==0'>
				<view class="noMessage" v-if="messageList.length <= 0">
					<u-empty text="没有新的消息" mode="list"></u-empty>
				</view>
				<view class="allMessageLists" v-else>
					<view class="allMessageList" v-for="(item,index) in messageList" :key='index'>
						<view class="allMessageHeader">
							<view class="allMessagePublisher">
								{{item.allMessagePublisher}}
							</view>
							<view class="allMessageTime">
								{{item.allMessageTime}}
							</view>
						</view>
						<view class="allMessageContainer">
							<u-read-more :toggle="true" :shadow-style="shadowStyle" show-height=60>
							<!-- <rich-text :nodes="item.content"></rich-text> -->
							<text class="allMessageListContent">{{item.content}}</text>
						</u-read-more>
						</view>
						
					</view>
				</view>
			</view>
			<!-- 公告 -->
			<view class="noticeWrapper" v-if='current==1'>
				111111
				<!-- <u-badge type="error" count="7"></u-badge> -->
			</view>
			<!-- 通知 -->
			<view class="informWrapper" v-if='current==2'>
				222222
			</view>
			<!-- 提醒 -->
			<view class="remindWrapper" v-if='current==3'>
				33333333
			</view>
		</view>
	</view>
</template>

<script src='./MessageNotification.js'>
</script>

<style lang="less" scoped>
	.message_content {
		height: calc(100vh - 44px);
		background-color: #FFFFFF;

		.tabs {
			display: flex;
			height: 100rpx;

			.tab {
				position: relative;
				width: 25%;
				line-height: 100rpx;
				text-align: center;
				font-size: 32rpx;
			}
		}
		.swiperWrapper{
			.allMessageWrapper{
				.noMessage{
					
				}
				.allMessageLists{
					border-top:15rpx solid #DCDFE6;
					.allMessageList{
						background-color: #DCDFE6;
						padding-bottom: 15rpx ;
						.allMessageHeader{
							background-color: #fff;
							display: flex;
							justify-content: space-between;
							padding: 0 20rpx;
							line-height: 60rpx;
							.allMessagePublisher{
								font-size: 32rpx;
								color: #000;
							}
							.allMessageTime{
								color: #808080;
								
							}
						}
						.allMessageContainer{
							background-color: #fff;
							padding: 0 20rpx;
							min-height: 200rpx;
							.allMessageListContent{
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
		.u-content{
			line-height: 20rpx;
		}
	}
</style>
