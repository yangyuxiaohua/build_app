<template>
	<view class="login_content">
		<u-toast ref="uToast" />
		<u-modal v-model="showUpdate" :content="content" @confirm='updateVersion()'></u-modal>
		<!-- <u-avatar src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4146511713,1144796055&fm=11&gp=0.jpg" size="220"></u-avatar> -->
		<p>昆明市住房和城乡建设局</p>
		<p>建设工程消防验收</p>
		<!-- <u-tabs style="width: 260px;" bg-color='#F5F5F9' bar-width='220' :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs> -->
		<view v-if="current == 0" style="width: 80vw;">
			<u-cell-group>
				<u-field
				style="border: 1px solid #ccc; border-radius: 4px;margin: 20px 0;"
					label-width='0'
					v-model="form.name"
					placeholder="账户名/手机号"
				>
				</u-field>
			</u-cell-group>
			<u-cell-group>
				<u-field
				style="border: 1px solid #ccc; border-radius: 4px;margin: 20px 0;"
					label-width='0'
					v-model="form.pasd"
					placeholder="密码"
					type="password"
				>
				</u-field>
			</u-cell-group>
			<u-checkbox-group style="width: 80vw;margin: 0px 0px 20px;">
				<u-checkbox 
					v-model="autologin" 
					name="autologin" @change="autoLogin()"
				>自动登录</u-checkbox>
			</u-checkbox-group>
			<view class="btns">
				<u-button type="primary" @click="login" size="medium">登录</u-button>
			<u-button type="warning" @click="resign" size="medium">注册</u-button>
			</view>
			
		</view>
		<view v-if="current == 1" style="width: 80vw;">
			<u-cell-group>
				<u-field
				style="border: 1px solid #ccc; border-radius: 4px;margin: 20px 0;"
					label-width='0'
					v-model="form.phone"
					placeholder="手机号"
				>
				</u-field>
			</u-cell-group>
			<u-cell-group>
				<u-field
				style="border: 1px solid #ccc; border-radius: 4px;margin: 20px 0;"
					label-width='0'
					v-model="form.code"
					placeholder="请填写验证码"
				>
				<u-button size="mini" slot="right" type="primary" @tap="getCode">{{codeText}}</u-button>
				</u-field>
				<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
			</u-cell-group>
			<u-checkbox-group style="width: 80vw;margin: 0px 0px 20px;">
				<u-checkbox 
					v-model="autologin" 
					name="autologin"
				>自动登录</u-checkbox>
			</u-checkbox-group>
			<u-button type="primary" @click="login">登录</u-button>
		</view>
		<view class="bottom_mes">
			<!-- <p>昆明市住房和城乡建设局</p> -->
			<!-- <p>技术支持：华龙万相智慧安全科技（成都）有限公司</p> -->
			<image src="../../static/zhujian.png" mode=""></image>
		</view>
	</view>
</template>

<script src='./login.js'></script>

<style lang="less" scoped>
	.login_content{
		background-color: #F5F5F9;
		// height: calc(100vh - 44px);
		height: calc(100vh);
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		&>p{
			font-size: 16px;
			font-weight: 600;
			color: #3E606F;
			margin: 2vh 0;
		}
		&>.bottom_mes{
			color: #939393;
			position: absolute;
			bottom: 0;
			image{
				width: 100vw;
				height: 300upx;
			}
		}
		.btns{
			width: 100%;
			display: flex;
			justify-content: space-between;
		}
	}
</style>
