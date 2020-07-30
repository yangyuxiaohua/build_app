<template>
	<view class="home_content">
		<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
		<view class="imgBox">
			<image src="../../../static/img/06.jpg" mode=""></image>
		</view>
		<view class="projectChose" v-show="content1">
			<view class="statisticalBox">

				<u-row gutter="16">
					<u-col span="3">
						<view class="statistical">
							<text class="statisticalTitNum" style="color: #000000;">{{num1}}</text>
							<text class="statisticalTit">报验总数</text>
						</view>
					</u-col>
					<u-col span="3">
						<view class="statistical">
							<text class="statisticalTitNum" style="color: #009641;">{{num2}}</text>
							<text class="statisticalTit">验收合格</text>
						</view>
					</u-col>
					<u-col span="3">
						<view class="statistical">
							<text class="statisticalTitNum" style="color: #EF7E2D;">{{num3}}</text>
							<text class="statisticalTit">验收整改</text>
						</view>
					</u-col>
					<u-col span="3">
						<view class="statistical">
							<text class="statisticalTitNum" style="color: #009ED6;">{{num4}}</text>
							<text class="statisticalTit">暂未验收</text>
						</view>
					</u-col>

				</u-row>
			</view>
		<!-- 	<view class="projectChoseText" @click="show = true">
				<text class="text1">{{projectName}}</text>
				<text class="text2"><u-icon name="arrow-rightward" color="#009ED6" size="36"></u-icon></text>
			</view> -->
		</view>
		<view class="projectChose" v-show="content2">
			<view class="statisticalBox">
				<view class="statisticalBoxTit">
					<text>验收进度</text>
				</view>
				<view class="constuStatistical">
					<view class="uLineProgressBox">
						<u-line-progress active-color="#2979ff" :striped="true" :percent="percent"
					 :striped-active="true" :show-percent="false"></u-line-progress>
					</view>
					<view class="uLineProgressNum">
						<text>{{percent}}</text>%
					</view>
				</view>
				<view class="statisticalNumBox">
					<view class="completed">
						已完成<text>{{finishNum}}</text>项
					</view>
					<view class="waitCompleted">
						待验收<text>{{waitFinishNum}}</text>项
					</view>
				</view>

			</view>
			<view class="projectChoseText" @click="getProjectLsit()">
				<text class="text1">{{projectName}}</text>
				<text class="text2"><u-icon name="arrow-right" color="#009ED6" size="36"></u-icon></text>
			</view>
		</view>
		<view class="homeMenu">
			<u-grid :col="4">
				<u-grid-item v-for="(item,index) in menuList" :key='index' :index='item.path' @click="clickGridItem(item.name)">
					<!-- <u-icon :name="item.name" :size="46"></u-icon> -->
					<image :src="item.imgSrc" mode="" style="width:100rpx;height: 100rpx;margin-bottom:20rpx ;"></image>
					<view class="grid-text">{{item.text}}</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script src="./home.js"></script>

<style lang="less" scoped>
	.home_content {
		// text-align: center;
		// height: calc(100vh);
		// background-color: #F5F5F9;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: start;
		.imgBox {
			width: 100%;
			image {
				width: 100%;
				height: 300rpx;
			}
		}

		.projectChose {
			width: 100%;
			height: 250rpx;
			// margin-top: 20rpx;
			background-color: #F5F1EF;
			position: relative;

			.statisticalBox {
				width: 90%;
				height: 250rpx;
				background-color: #FFFFFF;
				border-radius: 20rpx 20rpx 0 0;
				position: absolute;
				left: 5%;
				top: -50%;

				.statistical {
					display: flex;
					flex-direction: column;
					padding-top: 60rpx;
					align-items: center;

					.statisticalTitNum {
						font-size: 60rpx;
					}

					.statisticalTit {
						font-size: 32rpx;
						line-height: 90rpx;
						color: #9B9C9C;
					}
				}
				// 建设单位统计
				.statisticalBoxTit{
						text-indent: 20rpx;
					text{
						font-size: 32rpx;
						line-height: 80rpx;
					}
				}
				.constuStatistical{
					display: flex;
					// margin-top: 10rpx;
					justify-content: center;
					.uLineProgressBox{
						width: 70%;
						margin-top: 18rpx;
					}
					.uLineProgressNum{
						text{
							font-size: 48rpx;
							margin-left: 10rpx;
						}
					}
				}
				.statisticalNumBox{
					// width: 80%;
					padding: 0 60rpx;
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;
					line-height: 80rpx;
					color: #9D9E9E;
					.completed{
						text{
							margin: 0 5rpx;
							font-size: 40rpx;
						}
					}
					.waitCompleted{
						text{
							margin: 0 5rpx;
							font-size: 40rpx;
						}
					}
				}
			}

			.projectChoseText {
				width: 100%;
				font-size: 32rpx;
				position: absolute;
				bottom: 30rpx;
				color: #009ED6;
				display: flex;
				justify-content: center;
				align-items: center;

				.text1 {
					// margin-left: 150rpx;
					// text-indent: 20rpx;
					// position: absolute;
					// left: 20rpx;
				}

				.text2 {
					position: absolute;
					right: 20rpx;
				}
			}
		}

		.homeMenu {
			flex: 1;
			margin-top: 20rpx;
			// align-items: center;

		}
	}
</style>
