export default {
	data() {
		return {
			list: [],
			checkList: [],
			wrap: true,
			checkList2: [],
			list2: [{
					name: '消防控制室',
					check: false
				},
				{
					name: '消防水泵房',
					check: false
				}, {
					name: '排烟风机房',
					check: false
				},
				{
					name: '空调机房',
					check: false
				}, {
					name: '发电机房',
					check: false
				},
				{
					name: '发配电室',
					check: false
				}, {
					name: '弱电间',
					check: false
				},
				{
					name: '管道井',
					check: false
				}, {
					name: '储瓶间',
					check: false
				}],
				list3:[{
					name: '地下层',
					check: false
				}, {
					name: '屋顶层',
					check: false
				},
				{
					name: '避难层',
					check: false
				}, {
					name: '疏散楼梯',
					check: false
				},
				{
					name: '疏散走道',
					check: false
				}, {
					name: '电梯前室',
					check: false
				},
				{
					name: '防火分区',
					check: false
				}
			]
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
				// res1.result.ac3Yards.forEach(item => {
				// 	this.list.push({
				// 		name: item.position,
				// 		check: false
				// 	})
				// })
				// res1.result.ac4BuildingInsulations.forEach(item => {
				// 	this.list.push({
				// 		name: item.position,
				// 		check: false
				// 	})
				// })
				// res1.result.ac5Decorations.forEach(item => {
				// 	this.list.push({
				// 		name: item.position,
				// 		check: false
				// 	})
				// })
				// res1.result.ac6Usages.forEach(item => {
				// 	this.list.push({
				// 		name: item.position,
				// 		check: false
				// 	})
				// })
				// console.log(this.list)
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
			this.checkList = this.checkList.concat(this.checkList2)
			this.checkList = this.checkList.concat(this.checkList3)
			uni.setStorage({
				key: 'checkList',
				data: this.checkList,
				success: function() {
					uni.navigateBack();
				}
			})
		},
		checkboxGroupChange(e) {
			// console.log(1,e)
			this.checkList = e

		},
		checkboxGroupChange2(e) {
			// console.log(1,e)
			this.checkList2 = e

		},
		checkboxGroupChange3(e) {
			// console.log(1,e)
			this.checkList3 = e

		},

		//切割字符串
		splitStr(str) {
			let s = '';
			s = str.split('*')
			return s
		},

	}
}
