export default {
	
	data() {
		return {
			// actionstyle:{
			// 	color: '#fff',
			// },
			// keyword:'',
			methods:''
		}
	},
	onShow(){
		let _this = this
		uni.getStorage({
			key: 'checkContent',
			success: function(res) {
				// console.log(res.data);
				_this.methods = res.data.checkContent
			}
		})
	},
}