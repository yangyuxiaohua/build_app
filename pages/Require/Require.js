export default {

	data() {
		return {
			keyword: '',
			requiremess: '&emsp;涉及多个部分随便对付嘎斯的自尊<br/>心奶还打算年底不合格把谷歌'
		}
	},
	onShow() {
		let _this = this
		uni.getStorage({
			key: 'checkContent',
			success: function(res) {
				_this.requiremess = res.data.technologyRequires
			}
		})

		// let str = 'asdjanadnasndasdnasndasndsa'
		// str = str.replace('as',`<span style='color:red'>as<span>`)
		// console.log(str)
	},
	methods: {
		searchText() {
			if (this.keyword) {
				let _this = this
				uni.getStorage({
					key: 'checkContent',
					success: function(res) {
						_this.requiremess = res.data.technologyRequires
						var subStr = new RegExp(_this.keyword, 'g');
						_this.requiremess = _this.requiremess.replace(subStr, "<span style='background-color:#808080'>" + _this.keyword +
							"</span>")
					}
				})
			}else{
				let _this = this
				uni.getStorage({
					key: 'checkContent',
					success: function(res) {
						_this.requiremess = res.data.technologyRequires
					}
				})
			}

			// var subStr = new RegExp(this.keyword,'g');
			//      this.requiremess=this.requiremess.replace(subStr,"<span style='background-color:#808080'>"+this.keyword+"</span>")
		}
	}
}
