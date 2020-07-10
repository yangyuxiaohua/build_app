export default {
	data() {
		return {
			list: [],
			checkList: [],
			wrap: true
		}
	},
	onShow() {
		let _this = this
		uni.getStorage({
			key: 'projectInfo',
			// data: e
			success: function(res) {
				console.log(res.data)
				let projectId = _this.splitStr(res.data)[0]
				let contentId = _this.splitStr(res.data)[1]
				_this.getAcceptContent(projectId, contentId)
			}
		})
	},
	methods: {
		//请求验收内容
		async getAcceptContent(projectId, contentId) {

			let param = {
				projectId,
				contentId
			}
			//获取项目
			let res1 = await this.$api.POST_getAcceptContent(param)
			if (res1.httpStatus == 200) {
				console.log(res1)
				res1.result.ac1Builds.forEach(item => {
					this.list.push({
						name: item.buildName,
						check: false,
					})
				})
				res1.result.ac2StoragesTanks.forEach(item => {
					this.list.push({
						name: item.position,
						check: false
					})
				})
				console.log(this.list)
			}
		},
		//确认按钮
		getInfo() {
			// let checkList = JSON.stringify(
			// 	this.checkList
			// )
			// uni.navigateTo({
			// 	url: `/pages/Record/Record`,
			// });
			uni.setStorage({
				key:'checkList',
				data:this.checkList,
				success: function () {
				        uni.navigateBack();
				    }
			})
		},
		checkboxGroupChange(e) {
			// console.log(1,e)
			this.checkList = e

		},
		checkboxChange(e) {
			// console.log(2,e)
		},
		//切割字符串
		splitStr(str) {
			let s = '';
			s = str.split('*')
			return s
		},

	}
}
