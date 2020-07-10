export default {
	data() {
		return {
			src: 'http://img2.imgtn.bdimg.com/it/u=2669898717,1590930959&fm=26&gp=0.jpg',
			checked: true,
			show: false,
			pwd: '',
			border: true,
			maskCloseAble: true,
			showCancelButton: true,
			username:'',
			phone:'',
			account:'',
			factoryName:'',
			password:'',
			token:'',
			autoLogin:''
		};
	},
	
	onShow() {
		// console.log(11111)
	    this.token = uni.getStorageSync('loginInfo')
	    this.autoLogin = uni.getStorageSync('autoLogin')
		// console.log(uni.getStorageSync('autoLogin'))
		let _this = this
		uni.getStorage({
			key: 'userInfo',
			success: function(res) {
				console.log(res)
				_this.userId = res.data.userId
				_this.username = res.data.username
				_this.phone = res.data.phone
				_this.factoryName = res.data.factoryName
				_this.account = res.data.account
				// _this.appToken = res.data.appToken
				_this.password = res.data.password
				// _this.password = res.data.password
			}
		})
	},
	methods: {
		login() {
			let _this = this
			uni.clearStorageSync()
			// console.log(this.autoLogin)
			// uni.setStorageSync('loginInfo', this.token)
			// uni.setStorageSync('autoLogin', this.autoLogin)
			// uni.navigateTo({
			// 	url: '/pages/login/login'
			// });
			// plus.runtime.quit()
			uni.reLaunch({
			    url: '/pages/login/login'
			});
			// uni.setStorage({
			// 	key:'loginInfo',
			// 	data:{
			// 		account:_this.account,
			// 		password:_this.password
			// 		// appToken:_this.appToken
			// 	},
			// 	success() {
			// 		uni.navigateTo({
			// 			url: '/pages/login/login'
			// 		});
			// 	}
			// })
			// console.log(this.account)
			// console.log(this.password)
			// console.log(this.appToken)
			// uni.navigateTo({
			// 	url: '/pages/login/login'
			// });
		},
		open() {
			this.show = true;
		},
		async confirm() {
			console.log(this.pwd)
			let param = {
				password: this.pwd,
				userId: this.userId
			}
			let res = await this.$api.POST_updatePwd(param)
			console.log(res)
			if(res.httpStatus==200){
				this.$refs.uToast.show({
					title: '修改成功',
					type: 'success',
					duration: 1000
				})
			}else{
				this.$refs.uToast.show({
					title: '网络请求失败',
					type: 'warning',
					duration: 1000
				})
			}
		}
	}
};
