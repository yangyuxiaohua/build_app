export default {
	data() {
		return {
			list: [
				{title:'热门1'},
				{title:'热门2'},
				{title:'热门3'},
				{title:'热门4'},
			]
		};
	},
	onLoad() {
		
	},
	methods: {
		check(val) {
			uni.navigateTo({
			    url: `/pages/ProjectInfo/ProjectInfo?param=${val.title}`
			});
		},
	}
};