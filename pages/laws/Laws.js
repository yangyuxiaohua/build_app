export default {
	data() {
		return {
			list: [],
			currentPage: 1,
			isLoadMore: false,
			loadStatus: 'loading', //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
			pageNum: 0
		}

	},
	onShow() {
		this.getLaws(this.currentPage)
	},
	//下拉刷新
	onPullDownRefresh() {
		// console.log(1)
		this.currentPage = 1
		this.getLaws(this.currentPage)
		this.isLoadMore = false
	},
	// 底部上拉
	onReachBottom() {
		// if (this.initStatus || this.Show) return
		// this.page++
		// this.Show = !this.Show
		// this.getGasByUser()
		// console.log(111)
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
		async getLaws(page) {
			let param = {
				size: 10,
				start: page
			}
			let res = await this.$api.POST_pageByCondition(param)
			// console.log(res)
			this.pageNum = res.result.pageNum
			this.list = res.result.result.map(item => {
				item.createTime = this.getlTime(item.createTime)
				return item
			})
			uni.stopPullDownRefresh();
		},
		async getLawsMore() {
            this.loadStatus = 'loading'
			let param = {
				size: 10,
				start: this.currentPage
			}
			let res = await this.$api.POST_pageByCondition(param)
			this.list = this.list.concat(res.result.result.map(item => {
				item.createTime = this.getlTime(item.createTime)
				return item
			}))
			this.isLoadMore = false
		},

		toDetail(item) {
			// console.log(1111)
			uni.setStorageSync('lawsContent', item);
			uni.navigateTo({
				url: '/pages/lwsDetails/LawsDetails'
			})
		},
		getlTime(time) {
			let str = ''
			let date = new Date(time)
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			let day = date.getDate()
			str = `${year}-${month}-${day}`
			return str
		}
	}
}
