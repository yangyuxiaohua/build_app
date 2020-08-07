export default {
	data() {
		return {
			shadowStyle: {
				backgroundImage: "none",
				paddingTop: "0",
				marginTop: "10rpx"
			},
			list: [{
				name: '全部',
				num: 9
			}, {
				name: '公告',
				num: 5
			}, {
				name: '通知',
				num: 2
			}, {
				name: '提醒',
				num: 7
			}],
			ubadgeOffset: [10, 20],
			current: 0,
			messageList: [
				{
				allMessagePublisher: '系统自动提醒',
				allMessageTime: '2020-06-12 13:35',
				content: "海外网8月5日电 当地时间4日傍晚，黎巴嫩首都贝鲁特港口区发生剧烈爆炸。据美联社最新报道，黎巴嫩红十字会官员称，事故造成至少100人遇难，4000多人受伤。当地时间8月4日晚， 贝鲁特港口地区发生剧烈爆炸。 据贝鲁特省长的说法， 该市一半建筑物受损， 医院因大量伤者而人满为患。据黎巴嫩总理哈桑迪亚卜在最高国防委员会会议上称， 爆炸是2750吨硝酸铵在港口不当储存6年而引起的。 黎巴嫩政府宣布为悲剧遇难者哀悼三天。 包括以色列在内的许多国家已为黎巴嫩提供援助， 卡塔尔和伊拉克向贝鲁特派出野战医院， 而世卫组织向贝鲁特发出用于治疗伤员的药品和外科包。（ 海外网 刘强）本文系版权作品， 未经授权严禁转载。 海外视野， 中国立场， 浏览人民日报海外版官网—— 海外网www.haiwainet.cn或“ 海客” 客户端， 领先一步获取权威资讯。"
			}, {
				allMessagePublisher: '系统自动提醒',
				allMessageTime: '2020-06-12 13:35',
				content: "海外网8月5日电 当地时间4日傍晚，黎巴嫩首都贝鲁特港口区发生剧烈爆炸。"
			},
			]
			// tabs:[],
			// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
			// current: 0, // tabs组件的current值，表示当前活动的tab选项
			// swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
		}

	},
	onShow() {

	},
	methods: {
		tabsChange(index) {
			this.current = index;
		},
	}
}
