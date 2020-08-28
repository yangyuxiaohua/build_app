import tkiTree from '@/components/tki-tree/tki-tree.vue';
export default {
	components: {
		tkiTree
	},
	data() {
		return {
			type: 'textarea',
			border: false,
			height: 40,
			height2: 60,
			height3: 200,
			autoHeight: true,
			//terr=============
			list: [],
			multiple: false,
			selectParent: false,
			flod: false,
			partIds: [], // 选中的部门
			userIds: [], // 选中的人员 
			title: '',
			personValue: '',
			content: ''

		}

	},
	onLoad() {
		this.getList()
	},
	onShow() {
		// console.log(uni.getStorageSync('userInfo').factoryType)
	},
	methods: {
		//获取组织结构列表
		async getList() {
			let param = {
				queryUser: true,
				factoryType: uni.getStorageSync('userInfo').factoryType,
				onlyFactory: false

			}
			let res = await this.$api.POST_getFactoryMenus(param)
			console.log(res)
			this.list = res.result
			this.ruleValidate(this.list)
			console.log(this.list)

		},
		//递归处理数组
		ruleValidate(data) {
			let _this = this;

			function judgeChildren(data) {
				data.forEach(e => {
					if (!e.departments) {
						// if (e.selected) {
						// 	_this.checkedPersonList.push(e.id);
						// }
						if (e.userPartsDtos) {
							let arr = e.userPartsDtos.map(item => {
								if (item.selected) {
									_this.checkedPersonList.push(item.id);
								}
								item.partsName = item.username;
								return item;
							});
							e.children = e.departments.concat(arr);
						}
						return;
					} else {
						// if (e.selected) {
						// 	_this.checkedPersonList.push(e.id);
						// }
						if (e.userPartsDtos) {
							let arr = e.userPartsDtos.map(item => {
								item.partsName = item.username;
								if (item.selected) {
									_this.checkedPersonList.push(item.id);
								}
								return item;

								// return {
								//   id: item.id,
								//   partsName: item.username
								// };
							});
							e.children = e.departments.concat(arr);
						}
						judgeChildren(e.departments);
					}
				});
			}
			judgeChildren(data);
		},
		//清空已选中的

		showTree() {
			this.$refs.tkitree._show();
		},
		// 确定回调事件
		treeConfirm(e) {
			e.forEach(item => {
				if (!this.inDexOfStr(item.id, '_')) {
					this.partIds.push(item.id)
				} else {
					this.userIds.push(this.splitStr(item.id)[1])
				}
			});
			this.personValue = e.map(item => {
				return item.partsName
			})
			this.personValue = this.personValue.join(',')
		},
		// 取消回调事件
		treeCancel(e) {
			console.log(e)
		},
		// 确定提交
		async sureRelease() {
			let param = {
				content: this.content,
				partIds: this.partIds,
				title: this.title,
				type: 5,
				userIds: this.userIds
			}
			let res = await this.$api.POST_sendNotice(param)
			console.log(res)
			if(res.httpStatus==200){
				this.$refs.uToast.show({
					title: '发布成功',
					type: 'success',
					duration: 2000
				})
			}else{
				this.$refs.uToast.show({
					title: res.msg,
					type: 'error',
					duration: 3000
				})
			}

		},
		// 检验某个字符串是否包含某个字段
		inDexOfStr(str, s) {
			if (str.indexOf(s) != -1) {
				return true
			} else {
				return false
			}
		},
		// 切割字符串(-)
		splitStr(str) {
			let s = '';
			s = str.split('_')
			return s
		}

	}
}
