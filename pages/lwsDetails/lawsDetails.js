export default {
	data() {
		return {
		     laws:{}
		}
			
	},
	onShow() {
		 this.laws = uni.getStorageSync('lawsContent');
		  // console.log(value)
	},
	methods: {
	}
}
