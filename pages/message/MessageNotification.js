// import uniBadge from "@/components/uni-badge/uni-badge.vue"
export default {
	// components: {uniBadge},
	data() {
		return {
			shadowStyle: {
				backgroundImage: "none",
				paddingTop: "0",
				marginTop: "10rpx"
			},
			list: [{
				name: '全部',
				num: '1',
				type: '0',
			}, {
				name: '公告',
				num: '1',
				type: 1,
			}, {
				name: '通知',
				num: '1',
				type: 5,
			}, {
				name: '提醒',
				num: '1',
				type: 10,
			}],
			ubadgeOffset: [10, 20],
			current: 0,
			messageList: [],
			pageNum: 0,
			currentPage: 1,
			isLoadMore: false,
			loadStatus: 'loading', //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
			flag: true,
			type: '0',
			size: 8,
			roleCode: '',
			roleShow: false

		}
	},
	onLoad() {
		this.tabsChange(0, this.type)
		this.getRole()
	},
	onShow() {},
	//下拉刷新
	onPullDownRefresh() {
		// console.log(1)
		this.currentPage = 1
		this.getMessageList(this.currentPage)
		this.isLoadMore = false
	},
	// 底部上拉
	onReachBottom() {
		this.isLoadMore = true
		this.currentPage += 1
		if (this.currentPage > this.pageNum) {
			this.loadStatus = 'nomore'
			this.currentPage = this.pageNum
		} else {
			this.getLawsMore()
		}
	},
	methods: {
		tabsChange(index, type) {
			this.current = index;
			this.type = type
			this.currentPage = 1
			this.getMessageList(this.currentPage)
			if (type == 5) {
				if (this.roleCode != 500 && this.roleCode != 700 && this.roleCode != 900) {
					this.roleShow = true

				} else {
					this.roleShow = false
				}

			} else {
				this.roleShow = false
			}
		},
		toReleaseNotice() {
			uni.navigateTo({
				url: "/pages/releaseNotice/ReleaseNotice"
			})
		},
		//获取消息列表
		async getMessageList(page) {
			let param = {
				size: this.size,
				start: page,
				type: this.type
			}
			let res = await this.$api.POST_pageNotice(param)
			// console.log(res)
			// 获取数字
			this.list = [{
					name: '全部',
					num: res.result.result.noticeNums + res.result.result.publicNums + res.result.result.remindNums,
					type: '0',
				}, {
					name: '公告',
					num: res.result.result.publicNums,
					type: 1,
				}, {
					name: '通知',
					num: res.result.result.noticeNums,
					type: 5,
				}, {
					name: '提醒',
					num: res.result.result.remindNums,
					type: 10,
				}],
				// console.log(this.list)
				//===============
				this.pageNum = res.result.pageNum
			this.messageList = res.result.result.notices.map(item => {
				item.createTime = this.getTime(item.createTime)
				return item
			})
			this.loadStatus = 'nomore'
			uni.stopPullDownRefresh();
		},
		async getLawsMore() {
			if (this.flag) {
				this.loadStatus = 'loading'
				let param = {
					size: this.size,
					start: this.currentPage,
					type: this.type
				}
				let res = await this.$api.POST_pageNotice(param)
				// console.log(res)
				// 获取数字
				this.list = [{
						name: '全部',
						num: res.result.result.noticeNums + res.result.result.publicNums + res.result.result.remindNums,
						type: '0',
					}, {
						name: '公告',
						num: res.result.result.publicNums,
						type: 1,
					}, {
						name: '通知',
						num: res.result.result.noticeNums,
						type: 5,
					}, {
						name: '提醒',
						num: res.result.result.remindNums,
						type: 10,
					}],
				this.pageNum = res.result.pageNum
				this.messageList = this.messageList.concat(res.result.result.notices.map(item => {
					item.createTime = this.getTime(item.createTime)
					return item
				}))
				this.flag = false
				// this.list = this.list.concat(res.result.result.map(item => {
				// 	item.createTime = this.getlTime(item.createTime)
				// 	return item
				// }))
				// console.log(this.messageList)
				this.isLoadMore = false
				this.loadStatus = 'nomore'
				let _THIS = this
				setTimeout(function() {
					_THIS.flag = true
				}, 1000)
			}

		},
		//权限控制
		async getRole() {
			let res = await this.$api.POST_getRole()
			this.roleCode = res.result.roleCode
		},

		getTime(time) {
			if (time && time != 'null') {
				var strDate = ''
				var date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
				// var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

				strDate = Y + M + D + h + m;
				return strDate;
			} else {
				return
			}

		}
	}
}
