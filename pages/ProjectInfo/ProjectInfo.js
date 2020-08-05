export default {
	data() {
		return {
			itemStyle: {
				// backgroundColor: '#b3b3b3',
				color: '#fff',
				borderBottom: '1px solid #ccc',
			},
			headsty: {
				// color: '#fff'
				// textIndent: '10upx'
				paddingLeft: '20upx'

			},
			bodyStyle: {
				height: '300px',
				overflowY: 'scroll',
				// lineHeight:'40rpx'
			},
			baseInfo: [{
						label: '工程名称：',
						value: ''
					},
					{
						label: '工程地址：',
						value: ''
					},
					{
						label: '工程类别：',
						value: ''
					},
					{
						label: '申请日期：',
						value: ''
					},
					{
						label: '建设单位：',
						value: ''
					},
					{
						label: '项目负责：',
						value: ''
					},
					{
						label: '服务机构：',
						value:''
					},
					{
						label: '项目负责：',
						value:''
					},
					{
						label: '验收单位：',
						value: ''
					},
					{
						label: '总建筑物面积：',
						value: ''
					},
					{
						label: '验收申请文号：',
						value: ''
					},
					{
						label: '设计审查文号：',
						value: ''
					},
					{
						label: '特殊建设工程情形：',
						value: ''
					},
				],
			basetabInfo: [
				[{
						label: '建筑名称：',
						value: ''
					},
					{
						label: '结构类型：',
						value: ''
					},
					{
						label: '耐火等级：',
						value: ''
					},
					{
						label: '地上层数：',
						value: ''
					},
					{
						label: '地下层数：',
						value: ''
					},
					{
						label: '建筑高度：',
						value: ''
					},
					{
						label: '建筑长度：',
						value: ''
					},
					{
						label: '占地面积：',
						value: ''
					},
					{
						label: '地上建筑面积：',
						value: ''
					},
					{
						label: '地下建筑面积：',
						value: ''
					}
				]
			],
			list: [
				// 	{
				// 	name: '单位建筑'
				// }, {
				// 	name: '储罐'
				// }, {
				// 	name: '堆场'
				// }, {
				// 	name: '建筑保温'
				// }, {
				// 	name: '装饰装修'
				// }, {
				// 	name: '用途改变'
				// },
			],
			current: 0,
			checkboxlist: [],
			projectList: [{
				label: '选择需验收的建设工程',
				value: ''
			}],
			show: false,
			acceptContent: { //验收内容
				ac1Builds: [],
				ac2StoragesTanks: [],
				ac3Yards: [],
				ac4BuildingInsulations: [],
				ac5Decorations: [],
				ac6Usages: []
			},
			buildTypeList: [], //结构类型
			refractoryLevelList: [], //耐火等级
			project: {}, //当前选中的项目
			activeIndex: 0, // 当前打开的折叠面板
			uCollapseOpen: false,
			projectName: '选择需验收的建设工程', // 顶部显示的项目名称
			uCollapseItemOpen:false,//折叠面板的初始状态
		};
	},
	onShow() {
		// uni.setNavigationBarTitle({
		// 	title: '工程项目'
		// });
        this.list = []
		// this.activeIndex = 0
		this.project = {}
		this.baseInfo = []
		this.basetabInfo = []
		this.checkboxlist = []
		this.projectName = '选择需验收的建设工程',
			this.getOptions()
		this.getProjects()
        
		// this.OnBuild(0)
		// console.log(this.activeIndex)

	},
	onHide() {
		// console.log(11)
		// this.activeIndex = 0
		// this.project = {}
		// this.baseInfo=[]
		// this.basetabInfo=[]
		// this.checkboxlist=[]
	},

	methods: {
		//打开折叠面板
		OnBuild(activeNames) {
			this.activeIndex = activeNames;
			// console.log(this.project)
			if (this.project.value) {
				switch (activeNames) {
					case '0':
						this.getProjectInformation(this.splitStr(this.project.value)[0])
						break;
					case '1':
						this.getAccept(this.splitStr(this.project.value)[1])
						break;
					default:
						this.getFacilities(this.splitStr(this.project.value)[0], this.splitStr(this.project.value)[2])
						break;
				}
			} else {
				// console.log('无效选择')
				this.$refs.uToast.show({
					title: '请选择项目',
					type: 'warning',
					duration: 3000
				})

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
					let param = {
						userId: res.data.userId
					}
					//获取项目
					let res1 = await _this.$api.POST_getProjectsByUser(param)
					if (res1.httpStatus == 200) {
						// console.log(res1)
						_this.projectList = res1.result.map(item => {
							return {
								label: item.projectName,
								value: item.projectId + '*' + item.acContentId + '*' + item.completStandardId
							}
						})
						_this.projectList = [{
							label: '选择需验收的建设工程',
							value: ''
						}, ..._this.projectList]
						_this.projectName = _this.projectList[0].label
						_this.show = true
						// console.log(_this.projectList)
						// _this.project = _this.projectList[0]

					}
				}
			})

		},
		//选中项目
		confirm(e) {
			// console.log(this.project)
			// console.log(e[0])
			this.projectName = e[0].label
			this.project = e[0]
			if (e[0].value) {
				this.project = e[0]
			} else {
				this.project = {
					label: e[0].label,
					value: e[0].valut
				}
			}
			this.OnBuild(this.activeIndex)

		},
		//获取项目基本信息
		async getProjectInformation(a) {
			let param = {
				projectId: a
			}
			let res = await this.$api.POST_getProjectInfo(param)
			if (res.httpStatus == 200) {
				// console.log(res.result.project.)
				let usageName = res.result.projectInfoUsages.map(item => {
					return item.usageName
				})
				usageName = usageName.join(',')
				this.baseInfo = [{
						label: '工程名称：',
						value: res.result.project.projectName
					},
					{
						label: '工程地址：',
						value: res.result.projectInfo.regionName + res.result.project.detailedAddress
					},
					{
						label: '工程类别：',
						value: res.result.projectInfo.typeName
					},
					{
						label: '申请日期：',
						value: this.getTime(res.result.project.createTime)
					},
					{
						label: '建设单位：',
						value: res.result.projectInfo.factoryName
					},
					{
						label: '项目负责：',
						value:res.result.projectInfo.constructionProjectLeader? res.result.projectInfo.constructionProjectLeader + '(' + res.result.projectInfo.constructionProjectLeaderPhone + ')' :'暂无'
					},
					{
						label: '服务机构：',
						value: res.result.projectInfo.serviceFactoryName
					},
					{
						label: '项目负责：',
						value: res.result.projectInfo.serviceProjectLeader ? res.result.projectInfo.serviceProjectLeader + '(' + res.result.projectInfo.serviceProjectLeaderPhone + ')' :'暂无'
					},
					{
						label: '验收单位：',
						value: res.result.projectInfo.acceptanceFactoryName
					},
					{
						label: '总建筑物面积：',
						value: res.result.project.constructionArea + 'm²'
					},
					{
						label: '验收申请文号：',
						value: res.result.project.certificateNumber
					},
					{
						label: '设计审查文号：',
						value: res.result.project.reviewCertificateNumber
					},
					{
						label: '特殊建设工程情形：',
						value: usageName
					},
				]
			}


		},
		//日期处理
		getTime(time) {
			let str = ''
			let date = new Date(time)
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			let day = date.getDate()
			str = `${year}-${month}-${day}`
			return str
		},
		//切割字符串
		splitStr(str) {
			let s = '';
			s = str.split('*')
			return s
		},
		//获取验收内容6项
		changetab(index) {
			console.log(index)
			this.current = index
			console.log(this.acceptContent)
			console.log(this.list)
			let name = this.list[index].name;
			console.log(name)
			// switch (index) {
			// 	case 1:
			// 		name = '储罐';
			// 		break;
			// 	case 2:
			// 		name = '堆场';
			// 		break;
			// 	case 3:
			// 		name = '建筑保温';
			// 		break;
			// 	case 4:
			// 		name = '装饰装修';
			// 		break;
			// 	case 5:
			// 		name = '用途改变';
			// 		break;
			// 	default:
			// 		name = '单位建筑';
			// }
			switch (name) {
				case '储罐':
					// console.log(1)
					this.basetabInfo = this.acceptContent.ac2StoragesTanks.map(item => {
						return [{
								label: '设备位置 : ',
								value: item.position
							},
							{
								label: '总容量 : ',
								value: item.totalCapacity
							},
							{
								label: '设置形式 : ',
								value: item.settingTypeName
							},
							{
								label: '储存形式 : ',
								value: item.storageTypeName
							},
							{
								label: '储存物质名称 : ',
								value: item.storageMaterialName
							}
						]

					})
					break;
				case '堆场':
					// console.log(2)
					this.basetabInfo = this.acceptContent.ac3Yards.map(item => {
						return [{
								label: '储存物质名称 : ',
								value: item.storageMaterialName
							},
							{
								label: '储量 : ',
								value: item.storageCapacity
							},
						]
					})
					break;
				case '建筑保温':
					// console.log(3)
					this.basetabInfo = this.acceptContent.ac4BuildingInsulations.map(item => {
						return [{
								label: '材料类别 : ',
								value: item.materialClassesName
							},
							{
								label: '保温所在层数 : ',
								value: item.numberOfInsulationLayers
							},
							{
								label: '保温部位 : ',
								value: item.parts
							},
							{
								label: '保温材料 : ',
								value: item.material
							}
						]
					})
					break;
				case '装饰装修':
					// console.log(4)
					this.basetabInfo = this.acceptContent.ac5Decorations.map(item => {
						return [{
								label: '装修部位 : ',
								value: item.partsName
							},
							{
								label: '装修面积 : ',
								value: item.area
							},
							{
								label: '装修所在层数 : ',
								value: item.layerNum
							}
						]
					})
					break;
				case '用途改变':
					// console.log(5)
					this.basetabInfo = this.acceptContent.ac6Usages.map(item => {
						return [{
								label: '使用性质 : ',
								value: item.usingNatureName
							},
							{
								label: '原有用途 : ',
								value: item.originalUsage
							}
						]
					})
					break;
				default:
					// console.log(111)
					this.basetabInfo = this.acceptContent.ac1Builds.map(item => {
						let buildTypeId = '';
						this.buildTypeList.forEach(i => {
							if (i.dictionaryId == item.buildTypeId) {
								buildTypeId = i.name
							}
						})
						let refractoryLevelId = '';
						this.refractoryLevelList.forEach(i => {
							if (i.dictionaryId == item.refractoryLevelId) {
								refractoryLevelId = i.name
							}
						})
						return [{
								label: '建筑名称 : ',
								value: item.buildName
							},
							{
								label: '使用性质 : ',
								value: item.usages
							},
							{
								label: '结构类型 : ',
								value: buildTypeId
							},
							{
								label: '耐火等级 : ',
								value: refractoryLevelId
							},
							{
								label: '地上层数 : ',
								value: item.inTheUpperNumber + '层'
							},
							{
								label: '地下层数 : ',
								value: item.numberOfUnderground + '层'
							},
							{
								label: '建筑高度 : ',
								value: item.buildHeight + '米'
							},
							{
								label: '建筑长度 : ',
								value: item.buildLen + '米'
							},
							{
								label: '占地面积 : ',
								value: item.coversArea + 'm²'
							},
							{
								label: '地上建筑面积 : ',
								value: item.aboveGroundFloorArea + 'm²'
							},
							{
								label: '地下建筑面积 : ',
								value: item.undergroundFloorSpace + 'm²'
							}
						]

					})

			}
		},
		// 获取验收内容
		async getAccept(contentId) {
			let param = {
				contentId: contentId
			}
			//验收内容
			let res1 = await this.$api.POST_getAcceptContent(param)
			console.log(res1)
			if (res1.httpStatus == 200) {
				this.acceptContent = res1.result
				this.list = []
				if (res1.result.ac1Builds.length > 0) {
					this.list.push({
						name: '单位建筑'
					})
				}
				if (res1.result.ac2StoragesTanks.length > 0) {
					this.list.push({
						name: '储罐'
					})
				}
				if (res1.result.ac3Yards.length > 0) {
					this.list.push({
						name: '堆场'
					})
				}
				if (res1.result.ac4BuildingInsulations.length > 0) {
					this.list.push({
						name: '建筑保温'
					})
				}
				if (res1.result.ac5Decorations.length > 0) {
					this.list.push({
						name: '装饰装修'
					})
				}
				if (res1.result.ac6Usages.length > 0) {
					this.list.push({
						name: '用途改变'
					})
				}
				// 默认第一项
				this.basetabInfo = res1.result.ac1Builds.map(item => {
					let buildTypeId = '';
					this.buildTypeList.forEach(i => {
						if (i.dictionaryId == item.buildTypeId) {
							buildTypeId = i.name
						}
					})
					let refractoryLevelId = '';
					this.refractoryLevelList.forEach(i => {
						if (i.dictionaryId == item.refractoryLevelId) {
							// console.log(i.name)
							refractoryLevelId = i.name
						}
					})
					return [{
							label: '建筑名称 : ',
							value: item.buildName
						},
						{
							label: '使用性质 : ',
							value: item.usages
						},
						{
							label: '结构类型 : ',
							value: buildTypeId
						},
						{
							label: '耐火等级 : ',
							value: refractoryLevelId
						},
						{
							label: '地上层数 : ',
							value: item.inTheUpperNumber + '层'
						},
						{
							label: '地下层数 : ',
							value: item.numberOfUnderground + '层'
						},
						{
							label: '建筑高度 : ',
							value: item.buildHeight + '米'
						},
						{
							label: '建筑长度 : ',
							value: item.buildLen + '米'
						},
						{
							label: '占地面积 : ',
							value: item.coversArea + 'm²'
						},
						{
							label: '地上建筑面积 : ',
							value: item.aboveGroundFloorArea + 'm²'
						},
						{
							label: '地下建筑面积 : ',
							value: item.undergroundFloorSpace + 'm²'
						}
					]



				})
			}

		},
		//获取下拉框数据
		async getOptions() {
			let res1 = await this.$api.POST_buildType()
			if (res1.httpStatus == 200) {
				this.buildTypeList = res1.result
			}
			let res2 = await this.$api.POST_refractoryLevelId()
			if (res2.httpStatus == 200) {
				this.refractoryLevelList = res2.result
			}
		},
		//获取消防设施
		async getFacilities(projectId, standardId) {
			//获取项目
			let param = {
				projectId,
				standardId
			}
			let res1 = await this.$api.POST_getMenus(param)
			if (res1.httpStatus == 200) {
				this.checkboxlist = []
				res1.result.primaryTitles.forEach(item => {
					if (item.selected) {
						this.checkboxlist.push(item)
					}
				})
				this.checkboxlist = this.checkboxlist.map(item => {
					return {
						name: item.titleName,
						checked: item.selected,
						disabled: true
					}
				})
			}

		},
	}
}
