<template>
	<view class="user_content">
		<u-toast ref="uToast" />
		<view class="user_avatar user_mes">
			<!-- <u-avatar :src="src" :size='150' mode="square" @click="login"></u-avatar> -->
			<view class="avatar" style="margin:20upx;">
			<u-icon name="account-fill" size='60'></u-icon>
			</view>
			<view style="padding-top: 0px;">
				<p style="font-size: 16px;font-weight: 600;">{{username}}</p>
				<p style="color: #7e7e7e;">账号：{{account}}</p>
			</view>
		</view>
		<u-cell-group style="margin-top: 10px;">
			<u-cell-item icon="lock-fill" title="登录密码" label="*******" value='修改' :arrow="true" arrow-direction="right" @click='open'></u-cell-item>
			<u-modal v-model="show" :mask-close-able='maskCloseAble' :show-cancel-button='showCancelButton' @confirm="confirm">
						<view class="slot-content">
							<u-input v-model="pwd" :border="border" placeholder='请输入新密码' style="width: 90%;margin:20upx;"/>
						</view>
					</u-modal>

			<!-- <u-cell-item icon="checkmark-circle-fill" title="登录状态" label="已登录" :arrow="false"></u-cell-item> -->
		</u-cell-group>
		<u-cell-group style="margin-top: 10px;">
			<u-cell-item icon="phone-fill" title="联系方式" :value='phone' :arrow="false"></u-cell-item>
			<!-- <u-cell-item icon="home-fill" title="工作单位" :value='factoryName' :arrow="false"></u-cell-item> -->
			<!-- <u-cell-item icon="fingerprint" title="职业资格" value='资格' :arrow="false"></u-cell-item> -->
		</u-cell-group>
		<u-button style="margin-top: 20px; width: 70%;" type="error" @tap='login'>退出登录</u-button>
		<view style="height: 6vh;"></view>
	</view>
</template>

<script src="./usermes.js"></script>

<style lang="less">
	.user_content {
		text-align: center;
		height: calc(100vh - 44px - 50px);
		overflow: scroll;
		margin-top: 200upx;
		margin: 0;
		padding: 0;
		background-color: #F5F5F9;

		.user_avatar {
			text-align: start;
			height: 120px;
			display: flex;
			align-items: center;
			background-color: #fff;

			.u-avatar {
				margin-right: 8vw;
				margin-left: 6vw;
			}

			&>view {
				p {
					margin: 6rpx 0;
				}
			}
		}
	}
</style>
