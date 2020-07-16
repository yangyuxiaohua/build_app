<template>
	<view class="resign_content">
		<u-modal v-model="show" :content="content" :title = "title" :title-style='titleStyle' :content-style='contentStyle'></u-modal>
		<u-form :model="form" ref="uForm">
			<u-form-item label="提示：业务办理将使用该注册信息，您需要确保填写的信息真实无误!" style="font-size: 12px; padding-left:10rpx ; line-height: 30rpx;"
			 label-width='100%'>
			</u-form-item>
			<u-form-item label="企业名称:" label-width='150' label-align='right'>
				<u-input v-model="form.factoryName" placeholder="请填写单位全称" />
			</u-form-item>
			<u-form-item label="统一社会信用代码:" label-width='250' label-align='right'>
				<u-input v-model="form.maleSignal" placeholder="请对照有效证件填写" />
			</u-form-item>
			<u-form-item label="单位类型:" label-width='150' label-align='right'>
				<u-radio-group v-model="form.type">
					<u-radio :name="1">
						建设单位
					</u-radio>
					<u-radio :name="10">
						服务机构
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="联 系 人:" label-width='150' label-align='right'>
				<u-input v-model="form.contactMasterUser" placeholder="请填写您的真实姓名" />
			</u-form-item>
			<u-form-item label="联系电话:" label-width='150' label-align='right'>
				<u-input v-model="form.contactMasterPhone" placeholder="请填写您的电话号码" />
			</u-form-item>
			<u-form-item label="用户账号:" label-width='150' label-align='right'>
				<u-input v-model="form.account" placeholder="请设置使用该系统的账号" />
			</u-form-item>
			<u-form-item label="用户密码:" label-width='150' label-align='right'>
				<u-input v-model="form.password" placeholder="请设置您的密码" type="password" />
			</u-form-item>
			<u-form-item label="确认密码:" label-width='150' label-align='right' style="position:relative">
				<u-input v-model="form.password2" placeholder="请再次填写您的密码" @input='surePassword()' type="password" />
				<text style="position: absolute;left: 150rpx; bottom: -20rpx;font-size: 12rpx; color: red;" v-show="showPromptText">密码不一致!!!</text>
			</u-form-item>
			<u-form-item label="营业执照:" label-width='150' label-align='right' style="text-align: start;">
				<u-button type="primary" @click="uploadImg" size="medium" plain>上传照片</u-button>
			</u-form-item>



		</u-form>
		<view class="resign">
			<u-button type="primary" @click="resign">立即注册</u-button>
		</view>
	</view>
</template>

<script src='./resign.js'></script>

<style lang="less" scoped>
	.resign_content {
		background-color: #F5F5F9;
		height: calc(100vh - 44px);
		background-color: #FFFFFF;

		.resign {
			margin-top: 60rpx;
			padding: 0 40rpx;
		}

	}
</style>
