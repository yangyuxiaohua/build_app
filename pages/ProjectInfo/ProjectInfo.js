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
				paddingLeft:'20upx'

			},
			bodyStyle:{
				height:'300px',
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
					label: '建设单位：',
					value: ''
				},
				{
					label: '联系人：',
					value: ''
				},
				{
					label: '联系电话：',
					value: ''
				},
				{
					label: '工程类别：',
					value: ''
				},
				{
					label: '使用性质：',
					value: ''
				},
				{
					label: '火灾危险性：',
					value: ''
				},
				{
					label: '总建筑面积：',
					value: ''
				},
				{
					label: '凭证文号：',
					value: ''
				},
				{
					label: '申请日期：',
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
			list: [{
				name: '单位建筑'
			}, {
				name: '储罐'
			}, {
				name: '堆场'
			}, {
				name: '建筑保温'
			}, {
				name: '装饰装修'
			}, {
				name: '用途改变'
			}],
			checkboxlist: [],
			current: 0,
			projectList: [{label:'选择需验收的建设工程',value:''}],
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
			project:{}, //当前选中的项目
			activeIndex:0, // 当前打开的折叠面板
			uCollapseOpen:false,
			projectName:'选择需验收的建设工程', // 顶部显示的项目名称
		};
	},
	onShow() {
		// uni.setNavigationBarTitle({
		// 	title: '工程项目'
		// });
		
		// this.activeIndex = 0
		this.project = {}
		this.baseInfo=[]
		this.basetabInfo=[]
		this.checkboxlist=[]
		this.projectName = '选择需验收的建设工程',
		this.getOptions()
		this.getProjects()
		
		// this.OnBuild(0)
		// console.log(this.activeIndex)
		
	},
	onHide(){
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
			console.log(this.project)
			if(this.project.value){
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
			}else{
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
								value: item.projectId + '*' + item.acContentId + '*' + item.standardId
							}
						})
						_this.projectList = [{label:'选择需验收的建设工程',value:''},..._this.projectList]
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
			if(e[0].value){
				this.project = e[0]
			}else{
				this.project = {
					label:e[0].label,
					value:e[0].valut
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
				// console.log(res)
				this.baseInfo = [{
						label: '工程名称：',
						value: res.result.project.projectName
					},
					{
						label: '工程地址：',
						value: res.result.project.detailedAddress
					},
					{
						label: '建设单位：',
						value: res.result.projectInfo.factoryName
					},
					{
						label: '联系人：',
						value: res.result.projectInfo.contactUser
					},
					{
						label: '联系电话：',
						value: res.result.projectInfo.contactPhone
					},
					{
						label: '工程类别：',
						value: res.result.projectInfo.typeName
					},
					{
						label: '使用性质：',
						value: res.result.projectInfoUsages[0].usageName
					},
					{
						label: '火灾危险性：',
						value: res.result.projectInfo.dangerousLevelName
					},
					{
						label: '总建筑面积：',
						value: res.result.projectInfo.constructionArea
					},
					{
						label: '凭证文号：',
						value: res.result.projectInfo.certificateNumber
					},
					{
						label: '申请日期：',
						value: this.getTime(res.result.projectInfo.time)
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
			this.current = index
			console.log(this.acceptContent)
			switch (index) {
				case 1:
					// console.log(1)
					this.basetabInfo = []
					break;
				case 2:
					// console.log(2)
					this.basetabInfo = []
					break;
				case 3:
					// console.log(3)
					this.basetabInfo = []
					break;
				case 4:
					// console.log(4)
					this.basetabInfo = []
					break;
				case 5:
					// console.log(5)
					this.basetabInfo = []
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
						return {
							buildName: item.buildName,
							buildTypeId: buildTypeId,
							refractoryLevelId: refractoryLevelId,
							inTheUpperNumber: item.inTheUpperNumber + '层',
							numberOfUnderground: item.numberOfUnderground+ '层',
							buildHeight: item.buildHeight + 'm',
							buildLen: item.buildLen + 'm',
							coversArea: item.coversArea + 'm²',
							aboveGroundFloorArea: item.aboveGroundFloorArea + 'm²',
							undergroundFloorSpace: item.undergroundFloorSpace + 'm²',
						}

					})

			}
		},

		async getAccept(contentId) {
			let param = {
				contentId: contentId
			}
			//验收内容
			let res1 = await this.$api.POST_getAcceptContent(param)
			console.log(res1)
			if (res1.httpStatus == 200) {
				this.acceptContent = res1.result
				// console.log(res1)
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
						// console.log(i)
						// console.log(item.refractoryLevelId)
						if (i.dictionaryId == item.refractoryLevelId) {
							// console.log(i.name)
							refractoryLevelId = i.name
						}
					})
					// console.log(refractoryLevelId)
					return {
						buildName: item.buildName,
						buildTypeId: buildTypeId,
						refractoryLevelId: refractoryLevelId,
						inTheUpperNumber: item.inTheUpperNumber + '层',
						numberOfUnderground: item.numberOfUnderground+ '层',
						buildHeight: item.buildHeight + 'm',
						buildLen: item.buildLen + 'm',
						coversArea: item.coversArea + 'm²',
						aboveGroundFloorArea: item.aboveGroundFloorArea + 'm²',
						undergroundFloorSpace: item.undergroundFloorSpace + 'm²',
					}


				})
				// this.basetabInfo = this.basetabInfo.concat(this.basetabInfo)
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
