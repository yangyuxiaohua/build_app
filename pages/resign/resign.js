export default {
	data() {
		return {
			form: {
				factoryName: '',
				maleSignal: '',
				type: '',
				contactMasterUser: '',
				contactMasterPhone: '',
				account: '',
				password: '',
				password2: '',
				businessLicense: ''
			},
			showPromptText: false, //检验密码
			show: false,
			title: '',
			content: '',
			titleStyle: {},
			contentStyle: {}
		};
	},
	onLoad() {},
	onShow() {

	},
	methods: {

		uploadImg() {
			uni.chooseImage({
				success: (chooseImageRes) => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: 'http://39.104.90.111:2225/upload', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						fileType: 'img',
						success: (uploadFileRes) => {
							let res = JSON.parse(uploadFileRes.data)
							if (res.httpStatus == 200) {
								this.form.businessLicense = res.result
								this.$refs.uToast.show({
									title: '上传成功',
									type: 'success',
									duration: 3000
								})
							} else {
								this.$refs.uToast.show({
									title: '上传失败，请检查网络，文件大小，文件格式',
									type: 'error',
									duration: 3000
								})
							}
						},
						fail: (err) => {
							this.$refs.uToast.show({
								title: '上传失败，请检查网络，文件大小，文件格式',
								type: 'error',
								duration: 3000
							})
						}
					});
				}
			});
		},
		//密码验重
		surePassword() {
			// console.log(this.form.password)
			// console.log(this.form.password2)
			if (this.form.password === this.form.password2) {
				this.showPromptText = false
			} else {
				this.showPromptText = true
			}
		},
		//注册
		async resign() {
			if (this.form.maleSignal) {
				let param1 = {
					maleSignal: this.form.maleSignal
				}
				let searchRes = await this.$api.POST_SearchRegister(param1)
				// if(res.)
				if (!searchRes.result) {
					if (this.showPromptText) {
						this.$refs.uToast.show({
							title: '密码不一致',
							type: 'warning',
							duration: 2000
						})
					} else {
						if (this.form.password2) {
							let param = {
								factoryName: this.form.factoryName,
								maleSignal: this.form.maleSignal,
								type: this.form.type,
								username: this.form.contactMasterUser,
								contactMasterUser: this.form.contactMasterUser,
								contactMasterPhone: this.form.contactMasterPhone,
								account: this.form.account,
								password: this.form.password,
								businessLicense: this.form.businessLicense
							}
							let res = await this.$api.POST_Register(param)
							if (res.httpStatus == 200) {
								this.title = '注册成功'
								this.content = '请妥善保管注册账号信息，您需要登录系统PC端完善单位信息，分配本单位的其他用户账号'
								this.titleStyle = {
									color: '#19be6b'
								}
							}else{
								this.title = '注册失败'
								this.content = res.msg
								this.titleStyle = {
									color: '#fa3534'
								}
							}
							this.show = true
						} else {
							this.$refs.uToast.show({
								title: '密码不一致',
								type: 'warning',
								duration: 2000
							})
						}
					}
				} else {
					this.title = '注册失败'
					this.content = '您注册的单位已存在系统中，请联系系统管理员复核。联系电话 0871——65710577'
					this.titleStyle = {
						color: '#fa3534'
					}
					this.show = true
				}
			} else {
				this.$refs.uToast.show({
					title: '请填写统一社会信用代码',
					type: 'warning',
					duration: 2000
				})
			}




		}

	}

}
