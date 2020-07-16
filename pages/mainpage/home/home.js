export default {
	data() {
		return {
			// percent1: 15,
			optionData: [],
			menuList: [ //菜单列表
				{
					name: 'gongcheng',
					text: '工程项目',
					imgSrc: '../../../static/img/01.png',
					path: '01'
				},
				{
					name: 'ziliao',
					text: '资料核查',
					imgSrc: '../../../static/img/02.png'
				},
				{
					name: 'jungong',
					text: '竣工查验',
					imgSrc: '../../../static/img/03.png'
				},
				{
					name: 'xiaofang',
					text: '消防检测',
					imgSrc: '../../../static/img/08.png'
				},
				{
					name: 'xianchang',
					text: '现场评定',
					imgSrc: '../../../static/img/04.png'
				},
				{
					name: 'zhengce',
					text: '政策法规',
					imgSrc: '../../../static/img/05.png'
				},
				{
					name: 'xiaoxi',
					text: '消息通知',
					imgSrc: '../../../static/img/07.png'
				}
			],
			percent: 0, //建设进度条
			show: false,
			list: [],
			content1: false,
			content2: false,
			num1: 0,
			num2: 0,
			num3: 0,
			num4: 0,
			finishNum: 0, //home2
			waitFinishNum: 0,
			projectName: '选择需验收的建设工程', // 选中的项目
		};
	},
	onLoad() {
		this.getUserInformation()
		this.getRole()

	},
	onShow() {
		// uni.removeStorageSync('assess')
	},
	methods: {
		//获取统计
		async getStatisticalData(a) {
			let res;
			if (a) {
				let param = {
					projectId: a
				}
				res = await this.$api.POST_getAppStatisticalDto(param)
			} else {
				res = await this.$api.POST_getAppStatisticalDto()
			}
			console.log(res)
			if (res.httpStatus == 200) {
				let {
					totalTasks,
					finishTasks,
					primaryFinishABTasks,
					primaryNonFinishABTasks,
					secondaryFinishCTasks,
					secondaryNonFinishCTasks
				} = res.result.result.evaluationStatisticalDto.totalCompletionProbabilityDto
				this.finishNum = finishTasks
				this.waitFinishNum = totalTasks - finishTasks
				// console.log(totalTasks, finishTasks)
				if (totalTasks <= 0) {
					this.percent = 0;
				} else {
					// this.percent = Math.ceil(
					// 	finishTasks / totalTasks * 100
					// );
					this.percent = (finishTasks / totalTasks * 100)
					this.percent = parseFloat(this.percent.toFixed(2))
				}
			}
			// let {}
		},
		//获取用户详情
		async getUserInformation() {
			let _this = this
			let res = await this.$api.POST_getUserInfo()
			if (res.httpStatus == 200) {
				// console.log(res.result.appToken)
				uni.setStorageSync('loginInfo', res.result.appToken)
				uni.setStorage({
					key: 'userInfo',
					data: res.result,
				})
				let param = {
					userId: res.result.userId
				}
				//获取项目
				let res1 = await this.$api.POST_getProjectsByUser(param)
				if (res1.httpStatus == 200) {
					this.list = res1.result.map(item => {
						return {
							label: item.projectName,
							value: item.projectId
						}
					})
					this.list = [{
							label: '选择需验收的建设工程',
							value: ''
						}, ...this.list],
						this.projectName = this.list[0].label

				}
			}

		},
		//获取用户角色
		async getRole() {
			let _this = this
			let res = await this.$api.POST_getRole()
			// console.log(res)
			if (res.httpStatus == 200) {
				if (res.result.roleCode == 600 || res.result.roleCode == 650 || res.result.roleCode == 700 || res.result.roleCode ==
					800 || res.result.roleCode == 850 || res.result.roleCode == 900) {
					this.content1 = false
					this.content2 = true
					this.getStatisticalData()
				} else {
					this.content1 = true
					this.content2 = false
					this.getstatical4()
				}
				//=============================================================

				if (res.result.roleCode == 400 || res.result.roleCode == 450 || res.result.roleCode == 500) {
					this.menuList = [ //菜单列表
						{
							name: 'gongcheng',
							text: '工程项目',
							imgSrc: '../../../static/img/01.png',
							path: '01'
						},
						{
							name: 'ziliao',
							text: '资料核查',
							imgSrc: '../../../static/img/02.png'
						},
						{
							name: 'xianchang',
							text: '现场评定',
							imgSrc: '../../../static/img/04.png'
						},
						{
							name: 'zhengce',
							text: '政策法规',
							imgSrc: '../../../static/img/05.png'
						},
						{
							name: 'xiaoxi',
							text: '消息通知',
							imgSrc: '../../../static/img/07.png'
						}
					]
					uni.setStorageSync('defaultAssess', 'xianchang')
				} else if (res.result.roleCode == 600 || res.result.roleCode == 650 || res.result.roleCode == 700) {
					this.menuList = [ //菜单列表
						{
							name: 'gongcheng',
							text: '工程项目',
							imgSrc: '../../../static/img/01.png',
							path: '01'
						},
						{
							name: 'ziliao',
							text: '资料核查',
							imgSrc: '../../../static/img/02.png'
						},
						{
							name: 'jungong',
							text: '竣工查验',
							imgSrc: '../../../static/img/03.png'
						},
						{
							name: 'zhengce',
							text: '政策法规',
							imgSrc: '../../../static/img/05.png'
						},
						{
							name: 'xiaoxi',
							text: '消息通知',
							imgSrc: '../../../static/img/07.png'
						}
					]
					uni.setStorageSync('defaultAssess', 'jungong')
				} else if (res.result.roleCode == 800 || res.result.roleCode == 850 || res.result.roleCode == 900) {
					this.menuList = [ //菜单列表
						{
							name: 'gongcheng',
							text: '工程项目',
							imgSrc: '../../../static/img/01.png',
							path: '01'
						},
						{
							name: 'ziliao',
							text: '资料核查',
							imgSrc: '../../../static/img/02.png'
						},
						{
							name: 'xiaofang',
							text: '消防检测',
							imgSrc: '../../../static/img/08.png'
						},
						{
							name: 'zhengce',
							text: '政策法规',
							imgSrc: '../../../static/img/05.png'
						},
						{
							name: 'xiaoxi',
							text: '消息通知',
							imgSrc: '../../../static/img/07.png'
						}
					]
					uni.setStorageSync('defaultAssess', 'xiaofang')
				} else {
					this.menuList = [ //菜单列表
						{
							name: 'gongcheng',
							text: '工程项目',
							imgSrc: '../../../static/img/01.png',
							path: '01'
						},
						{
							name: 'ziliao',
							text: '资料核查',
							imgSrc: '../../../static/img/02.png'
						},
						{
							name: 'jungong',
							text: '竣工查验',
							imgSrc: '../../../static/img/03.png'
						},
						{
							name: 'xiaofang',
							text: '消防检测',
							imgSrc: '../../../static/img/08.png'
						},
						{
							name: 'xianchang',
							text: '现场评定',
							imgSrc: '../../../static/img/04.png'
						},
						{
							name: 'zhengce',
							text: '政策法规',
							imgSrc: '../../../static/img/05.png'
						},
						{
							name: 'xiaoxi',
							text: '消息通知',
							imgSrc: '../../../static/img/07.png'
						}
					]
					uni.setStorageSync('defaultAssess', 'xianchang')
				}

			}



		},
		// check(value) {
		// 	// console.log(value)
		// 	this.getStatisticalData(value)
		// },
		//点击宫格
		clickGridItem(i) {
			if (i == 'gongcheng') {
				uni.switchTab({
					url: '/pages/ProjectInfo/ProjectInfo'
				});
			} else if (i == 'ziliao' || i == 'jungong' || i == 'xiaofang' || i == 'xianchang') {
				uni.setStorageSync('assess', i)
				uni.switchTab({
					url: "/pages/mainpage/assess/assess"
				});
			} else if (i == 'zhengce') {
				uni.navigateTo({
					url: ''
				})
			} else {
				uni.navigateTo({
					url: ''
				})
			}
		},
		//获取统计四项
		async getstatical4(projectId = '') {
			let param = {
				projectId
			}
			let res = await this.$api.POST_getAppProjectsStatisticalDto(param)
			if (res.httpStatus == 200) {
				console.log(res)
				this.num1 = res.result.result.totalNums
				this.num2 = res.result.result.passNums
				this.num3 = res.result.result.noPassNums
				this.num4 = res.result.result.totalNums - res.result.result.finishNums
			}

		},
		//选中项目
		confirm(e) {
			console.log(e)
			this.projectName = e[0].label
				let id;
			if (e[0].value) {
				id = e[0].value
			} else {
				id = e[0].valut
			}
			this.getStatisticalData(id)
		}

	}

}
