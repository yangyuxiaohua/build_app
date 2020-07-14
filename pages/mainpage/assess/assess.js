export default {
	data() {
		return {
			accordion: [],
			projectList: [],
			show: false,
			projectId: '', //当前选中的projectId
			projectName: '',
			titleText: '现场评定',
			titleType: 15,
			cid: '', // 选中的变色
		}
	},
	onShow() {
		// console.log(uni.getStorageSync('backAssess'))
		if(uni.getStorageSync('backAssess')){
			// console.log('返回的')
			this.show = false
			uni.removeStorageSync('backAssess')
		}else{
		this.accordion = []
		this.getProjects()
		// console.log("新进的")
		
		}
		// ======================================================
		let titleText;
		if(uni.getStorageSync('assess')){
		 titleText= uni.getStorageSync('assess')
			
		}else{
			 titleText= uni.getStorageSync('defaultAssess')
		}
		switch (titleText) {
			case 'ziliao':
				this.titleText = '资料评审'
				this.titleType = 1
				break;
			case 'jungong':
				this.titleText = '竣工查验'
				this.titleType = 5
				break;
			case 'xiaofang':
				this.titleText = '消防检测'
				this.titleType = 10
				break;
			// case 'xianchang':
			// 	this.titleText = '现场评定'
			// 	this.titleType = 15
			// 	break;
			default:
				this.titleText = '现场评定'
				this.titleType = 15
		}
		uni.setNavigationBarTitle({
			title: this.titleText
		});
		uni.setStorageSync('defaultAssess',titleText)
		uni.removeStorageSync('assess')
	},
	onPullDownRefresh(){
		// this.accordion = []
		// this.getProjects()
		// console.log(uni.getStorageSync('checkContent'))
		// console.log(uni.getStorageSync('projectInfo'))
		// console.log(this.titleType)
		let {standardPrimaryTitleId,standardSecondaryTitleId} = uni.getStorageSync('checkContent')
		// let standardChecklistId = uni.getStorageSync('checkContent').id
		// let standardChecklistId = uni.getStorageSync('checkContent').id
		let standardChecklistId = uni.getStorageSync('checkContent').id
		let id = this.splitStr(uni.getStorageSync('projectInfo'))[0]
		console.log(standardPrimaryTitleId,standardSecondaryTitleId,standardChecklistId,id)
		this.RefreshReduction(id,standardPrimaryTitleId,standardSecondaryTitleId,standardChecklistId)
	},
	methods: {
		async getList(id) { //请求数据
			let param = {
				projectId: id,
				type: this.titleType
			}
			let res = await this.$api.POST_getDocumentByProjectId(param)
			console.log(res)
			if (res.httpStatus == 200) {
				this.accordion = res.result.tasksWithEvaluation.primaryTitles.map(item => {
					// console.log(item)
					return {
						num: `${item.finishTasksNum}/${item.totalTasksNum}`,
						title: item.titleName,
						show1: true,
						show2: false,
						id: item.standardPrimaryTitleId,
						children: item.secondaryTitles.map(i => {
							return {
								num: `${i.finishTasksNum}/${i.totalTasksNum}`,
								title: i.titleName,
								show: false,
								show1: false,
								show2: false,
								id: i.standardSecondaryTitleId,
								children: i.checklistList.map(j => {
									// console.log(j)
									return {
										standardId: j.standardId,
										title: j.content,
										id: j.standardChecklistId,
										checkContent: j.checkContent,
										standardId: j.standardId,
										technologyRequires: j.technologyRequires,
										rules: j.rules,
										remark: j.remark,
										samplingRequires: j.samplingRequires,
										show: false,
										categoryCode:res.result.tasksWithEvaluation.categoryCode,
										standardPrimaryTitleId:j.standardPrimaryId,
										standardSecondaryTitleId:j.standardSecondaryId
									}

								})
							}
						})
					}
				})
				// uni.stopPullDownRefresh();
			}

		},
		//打开项目列表
		onProjectList() {
			this.show = true
		},
		//请求项目列表
		getProjects() {
			let _this = this
			uni.getStorage({
				key: 'userInfo',
				success: async function(res) {
					// console.log(res)
					let param = {
						userId: res.data.userId
					}
					//获取项目
					let res1 = await _this.$api.POST_getProjectsByUser(param)
					if (res1.httpStatus == 200) {
						_this.projectList = res1.result.map(item => {
							return {
								label: item.projectName,
								value: item.projectId + '*' + item.acContentId + '*' + item.standardId

							}
						})
						_this.projectList = [{
							label: '选择需验收的建设工程',
							value: ''
						}, ..._this.projectList]
						// _this.projectId = _this.projectList[0].value
						// _this.getList(_this.splitStr(_this.projectId)[0])
						// _this.projectName = _this.projectList[0].label
						_this.show = true
						//关闭刷新
						// uni.setStorage({
						// 	key: 'projectInfo',
						// 	data: _this.projectId
						// })
					}
				}
			})

		},
		//选中项目
		confirm(e) {
			// console.log(e);
			// if()
			let projectId = ''
			if (e[0].value) {
				projectId = this.splitStr(e[0].value)[0]
				this.projectId = e[0].value
			} else {
				projectId = this.splitStr(e[0].valut)[0]
				this.projectId = e[0].valut
			}
			// console.log(projectId)
			if (projectId) {
				this.getList(projectId)
				this.projectName = e[0].label
				uni.setStorage({
					key: 'projectInfo',
					data: this.projectId
				})
			} else {
				this.$refs.uToast.show({
					title: '请选择项目',
					type: 'warning',
					duration: 3000
				})
			}


		},
		//切割字符串
		splitStr(str) {
			let s = '';
			s = str.split('*')
			return s
		},
		clickLevel(num, i) {
			this.cid = i.id
			// console.log(this.cid)
			if (num == 1) {
				this.accordion.forEach(item => {
					if (item.id == i.id) {
						item.show1 = item.show1 == true ? false : true
						item.show2 = item.show2 == false ? true : false
						item.children.forEach(j => {
							j.show = j.show == false ? true : false
							j.show1 = true
							j.show2 = false
							j.children.forEach(k => {
								k.show = false
							})
						})
					} else {
						item.show1 = true
						item.show2 = false
						item.children.forEach(j => {
							j.show = false
							// j.show1 = false
							// j.show2 = false
						})
					}
				})
			} else if (num == 2) {
				this.accordion.forEach(item => {
					item.children.forEach(j => {
						if (j.id == i.id) {
							j.show1 = j.show1 == true ? false : true
							j.show2 = j.show2 == false ? true : false
							j.children.forEach(k => {
								k.show = k.show == false ? true : false
							})
						} else {
							j.show1 = true
							j.show2 = false
							j.children.forEach(k => {
								k.show = false
							})
						}
					})
				})
			} else {
				uni.setStorage({
					key: 'checkContent',
					data: i,
					success: function() {
						uni.navigateTo({
							url: '/pages/Record/Record'
						});
					}
				})
			}
		},
		// 返回刷新状态还原
		async RefreshReduction(id,standardPrimaryTitleId,standardSecondaryTitleId,standardChecklistId){
			let param = {
				projectId: id,
				type: this.titleType
			}
			let res = await this.$api.POST_getDocumentByProjectId(param)
			// console.log(res)
			if (res.httpStatus == 200) {
				this.accordion = res.result.tasksWithEvaluation.primaryTitles.map(item => {
					return {
						num: `${item.finishTasksNum}/${item.totalTasksNum}`,
						title: item.titleName,
						show1: item.standardPrimaryTitleId == standardPrimaryTitleId?false:true,
						show2: item.standardPrimaryTitleId ==standardPrimaryTitleId?true:false,
						id: item.standardPrimaryTitleId,
						children: item.secondaryTitles.map(i => {
							return {
								num: `${i.finishTasksNum}/${i.totalTasksNum}`,
								title: i.titleName,
								show:i.standardPrimaryTitleId == standardPrimaryTitleId?true:false,
								show1: i.standardSecondaryTitleId==standardSecondaryTitleId?false:true,
								show2: i.standardSecondaryTitleId==standardSecondaryTitleId?true:false,
								id: i.standardSecondaryTitleId,
								children: i.checklistList.map(j => {
									// console.log(j)
									return {
										standardId: j.standardId,
										title: j.content,
										id: j.standardChecklistId,
										checkContent: j.checkContent,
										standardId: j.standardId,
										technologyRequires: j.technologyRequires,
										rules: j.rules,
										remark: j.remark,
										samplingRequires: j.samplingRequires,
										show:j.standardSecondaryId==standardSecondaryTitleId?true:false,
										categoryCode:res.result.tasksWithEvaluation.categoryCode,
										standardPrimaryTitleId:j.standardPrimaryId,
										standardSecondaryTitleId:j.standardSecondaryId
									}
			
								})
							}
						})
					}
				})
				// console.log(11111111111)
				uni.stopPullDownRefresh();
			}
		}
	}
}