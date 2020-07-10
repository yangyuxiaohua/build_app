<template>
	<view class="resign_content">
		<u-form :model="form" ref="uForm" >
				<u-form-item label="企业名称:" label-width='150' label-align='right'><u-input v-model="form.companyName" placeholder="请填写单位全称"/></u-form-item>
				<u-form-item label="单位类型:"  label-width='150' label-align='right'>
					<u-radio-group v-model="form.type">
						<u-radio :name="1">
							建设单位
						</u-radio><u-radio :name="10">
							验收单位
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="联 系 人:"  label-width='150' label-align='right'><u-input v-model="form.person" placeholder="请填写您的真实姓名"/></u-form-item>
				<u-form-item label="联系电话:"  label-width='150' label-align='right'><u-input v-model="form.phone" placeholder="请填写您的电话号码"/></u-form-item>
				<u-form-item label="用户账号:"  label-width='150' label-align='right'><u-input v-model="form.account" placeholder="请设置使用该系统的账号"/></u-form-item>
				<u-form-item label="登录密码:"  label-width='150' label-align='right'><u-input v-model="form.password" placeholder="请设置您的密码"/></u-form-item>
				<u-form-item label="登录密码:"  label-width='150' label-align='right' style="text-align: start;">
					<u-button type="primary" @click="uploadImg" size="medium" plain>上传照片</u-button>
				</u-form-item>
					
				
				
			</u-form>
			<view class="resign">
				<u-button type="primary" @click="resign" >立即注册</u-button>
			</view>
	</view>
</template>

<script src='./resign.js'></script>

<style lang="less" scoped>
	.resign_content{
		background-color: #F5F5F9;
		height: calc(100vh);
		.resign{
		margin-top: 100rpx;
		padding: 0 40rpx;
		}
	
	}
</style>
