export default {
	data() {
		return {
			form: {
							companyName: '',
							type: '',
							person: '',
							phone:'',
							account:'',
							password:''
						},
		};
	},
	onLoad() {},
	onShow() {
		
	},
	methods: {
			
		uploadImg(){
			uni.chooseImage({
				success: (chooseImageRes) => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: 'http://39.104.90.111:2225/upload', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						fileType: 'img',
						success: (uploadFileRes) => {
							let res = JSON.parse(uploadFileRes.data)
							if (res.httpStatus == 200) {
								// this.saveFile(res.result, type)
							} else {
								this.$refs.uToast.show({
									title: '上传失败，请检查网络，文件大小，文件格式',
									type: 'error',
									duration: 3000
								})
							}
						},
						fail: (err) => {
							this.$refs.uToast.show({
								title: '上传失败，请检查网络，文件大小，文件格式',
								type: 'error',
								duration: 3000
							})
						}
					});
				}
			});
		},
		//注册
		resign(){
			console.log(this.form)
		}

	}

}
