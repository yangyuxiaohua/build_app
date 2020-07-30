export default {
	data() {
		return {
			form: {
				name: '',
				pasd: '',
				phone: '',
				code: ''
			},
			// list: [{name: '账户密码登录'}],
			current: 0,
			codeText: '',
			autologin: false,
			curVersion: 2, //当前版本号
			showUpdate: false,
			content: '检测到有新版本，请点击确定下载更新后使用',
			updateUrl: ''
		};
	},
	onLoad() {
		// uni.clearStorage()
		// uni.getStorage({
		// 	key:'loginInfo',
		// 	success(res) {
		// 		console.log(res)
		// 	}
		// })
	},
	onShow() {
		this.aotuUpdteApp()
		// console.log(plus.runtime.version)
		// console.log(uni.getStorageInfoSync())
		this.autologin = uni.getStorageSync('autoLogin')
		// console.log(this.autologin)
		if (this.autologin) {
			let token = uni.getStorageSync('loginInfo')
			if (token) {
				uni.setStorageSync('autoLogin', this.autologin)
				uni.clearStorageSync()
				uni.switchTab({
					url: '/pages/mainpage/home/home'
				});
			}
		} else {
			uni.clearStorageSync()
			// console.log(uni.getStorageSync())
			this.autologin = false
		}
	},
	methods: {
		//自动登录
		autoLogin() {
			uni.setStorageSync('autoLogin', this.autologin)
		},
		async login() {
			let param = {
				phone: this.form.name,
				password: this.form.pasd,
				system: '1'
			}
			let res = await this.$api.POST_login(param)
			if (res.httpStatus == 200) {
				// console.log(res)
				uni.setStorage({
					key: 'sid',
					data: res.result,
					success: function() {
						uni.switchTab({
							url: '/pages/mainpage/home/home'
						});
					}
				})
			} else {
				this.$refs.uToast.show({
					title: '账号或密码错误',
					type: 'error',
					duration: 2000
				})
			}

		},
		async loginAuto(param) {
			let res = await this.$api.POST_login(param)
			if (res.httpStatus == 200) {
				// console.log(res)
				uni.setStorage({
					key: 'sid',
					data: res.result,
					success: function() {
						uni.switchTab({
							url: '/pages/mainpage/home/home'
						});
					}
				})
			} else {
				this.$refs.uToast.show({
					title: '账号或密码错误',
					type: 'error',
					duration: 2000
				})
			}

		},

		change(index) {
			this.current = index;
		},

		codeChange(text) {
			this.codeText = text;
		},
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码'
				})
				setTimeout(() => {
					uni.hideLoading();
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				}, 1000);
			} else {
				this.$u.toast('倒计时结束后再发送');
			}
		},
		resign() {
			// console.log(1111)
			uni.navigateTo({
				url: '/pages/resign/Resign'
			})
		},
		//自动更新
		async aotuUpdteApp() {
			let param = {
				version: this.curVersion
			}
			let res = await this.$api.POST_updeVersion(param)
			console.log(res)
			if (res.httpStatus == 200) {
				if (res.result.status == 1) {
					// console.log(11)
					console.log(res.result.url)
					this.updateUrl = res.result.url
					this.showUpdate = true

				} else {
					this.showUpdate = false
				}
			}
		},
		// 更新版本
		updateVersion() {
			// console.log(this.updateUrl)
			plus.runtime.openURL(this.updateUrl)
		}

	}
};
