export default {
	data() {
		return {
			list: [],
			show: false,
			account: '',
			password: '',
			show1: false,
		}
	},
	onLoad() {
		this.list = uni.getStorageSync('acceptPersonList') ? uni.getStorageSync('acceptPersonList') : []
		// console.log(this.list)

	},
	onShow() {

	},
	methods: {
		//选择框变化
		checkboxChange() {

		},
		//打开第一个添加人员的模态框
		open() {
			this.account = ''
			this.password = ''
			this.show = true
		},
		// 打开删除的模态框
		open1() {
			this.show1 = true
		},
		//确认添加验收人员
		async sureAdd() {
			let param = {
				phone: this.account,
				password: this.password,
				system: 1
			}
			let res = await this.$api.POST_getUserByAccount(param)
			if (res.httpStatus == 200) {
				let timestamp = (new Date()).getTime()
				let time = this.getTime(timestamp)
				// console.log(this.list)
				this.list.unshift({
					name: res.result.username,
					checked: false,
					time
				})
				uni.setStorageSync('acceptPersonList', this.list)
				this.$refs.uToast.show({
					title: '添加成功',
					type: 'success',
				})
			} else {
				// console.log(res)
				this.$refs.uToast.show({
					title: res.msg,
					type: 'warning',
				})
			}
			// console.log(res)

		},
		// 确认移除验收人员
		sureDelete() {
			// console.log(this.list)
			this.list = this.list.filter(item => {
				if (!item.checked) {
					return item
				}
			})
			uni.setStorageSync('acceptPersonList', this.list)
		},
		//时间格式化
		getTime(time) {
			if (time && time != 'null') {
				var strDate = ''
				var date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
				var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

				strDate = Y + M + D + h + m + s;
				return strDate;
			} else {
				return
			}

		}
	}
}
