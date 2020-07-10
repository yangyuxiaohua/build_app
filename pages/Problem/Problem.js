export default {
	data() {
		return {
			textList:[]             
		}
	},
	onShow(){
		let _this = this
			uni.getStorage({
				key: 'checkContent',
				success: async function(res) {
					// console.log(res.data);
					// _this.requiremess = res.data.technologyRequires
					let param = {
						checklistId:res.data.id
					}
					let res1 = await _this.$api.POST_getQuestionByCheckListId(param)
					// console.log(res1)
					if(res1.httpStatus ==200){
						let arrKey = Object.keys(res1.result)
						let arrValue =Object.values(res1.result)
						for (let i in arrKey){
							let obj = {}
							obj.tit = arrKey[i]
							obj.con = arrValue[i]
							_this.textList.push(obj)
						}
						
					}
				}
			})
		
	},
}