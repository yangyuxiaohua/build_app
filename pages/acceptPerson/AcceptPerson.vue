<template>
	<view class="acceptPerson_content">
		<!-- 添加人员的提示 -->
		<u-toast ref="uToast" />
		<view class="acceptPersonTit">
			<view class="name">
				姓名
			</view>
			<view class="time">
				登录时间
			</view>
		</view>
		<view class="personListWrapper">
			<view class="personList btl" v-for="(item, index) in list" :key="index">
				<u-checkbox @change="checkboxChange" v-model="item.checked" :name="item.name"></u-checkbox>
				<view class="personInfo">
					<text class="text1">{{item.name}}</text>
					<text class="text2">{{item.time}}</text>
				</view>

			</view>
		</view>
		<view class="btns">
			<view class="">
				<u-button type="primary" @click="open">添加</u-button>
			</view>
			<view class="">
				<u-button type="warning" @click="open1">移除</u-button>
			</view>
		</view>
		<!-- 模态框 -->
		<view class="modal1">
			<u-modal v-model="show" title='添加验收人员' :show-confirm-button='true' :show-cancel-button='true' @confirm="sureAdd">
				<view class="slot-content">
					<view class="account">
						<u-input v-model="account" type="text" :border="true" placeholder="请输入账号" />
					</view>
					<view class="password">
						<u-input v-model="password" type="text" :border="true" placeholder="请输入密码" />
					</view>
				</view>
			</u-modal>
		</view>
		<!-- 移除确认 -->
		<view class="modal2">
			<u-modal v-model="show1" title='提示' :title-style="{color: 'red'}" :show-cancel-button='true' @confirm="sureDelete">
				<view class="slot-content">
					<text>确定移除该验收人员</text>
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script src='./acceptPerson.js'>
</script>

<style lang="less" scoped>
	.acceptPerson_content {
		height: calc(100vh - 44px);
		background-color: #FFFFFF;
		padding: 0 20rpx;
		font-size: 32rpx;

		.acceptPersonTit {
			display: flex;
			justify-content: space-between;
			border-bottom: 2px solid #ccc;
			color: #000;
			// font-size: 36rpx;

			.name,
			.time {
				width: 40%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
			}
		}

		.personListWrapper {
			min-height: calc(100vh - 180px);

			.personList {
				display: flex;
				// line-height: 100rpx;
				// align-items: center;
				min-height: 100rpx;
				padding-left: 20rpx;

				.personInfo {
					flex: 1;
                    display: flex;
					align-items: center;
					text {
						display: inline-block;
						width: 50%;
					}

					.text1 {
						text-indent: 50rpx;
						// line-height: 100rpx;
					}

					.text2 {
						text-align: center;
					}
				}
			}
		}

		.btns {
			width: 100%;
			display: flex;
			justify-content: space-around;
			margin-top: 40rpx;

			view {
				width: 35%;
			}
		}

		.modal1 {
			.slot-content {
				width: 90%;
				margin-left: 30rpx;
				// border-bottom: 1px solid #ccc;

				// text-align: center;
				.account,
				.password {
					margin-top: 20rpx;
				}
			}
		}

		.modal2 {
			.slot-content {
				text-align: center;
				line-height: 100rpx;
				border-bottom: 1px solid #ccc;
			}
		}


		.btl {
			border-bottom: 1px solid #C0C0C0;
		}
	}
</style>
