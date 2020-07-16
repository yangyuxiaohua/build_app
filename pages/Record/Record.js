export default {
	data() {
		return {
			value: '',
			content: '',
			// border: false,
			// height: 100,
			// autoHeight: true,
			checkList: '', //抽样回来的数据
			checkNum: '', //检查数量
			acceptRecode: '', //验收记录
			isNoDataReview: true,
			standardId: ''
		}
	},
	onLoad() {
		// let _this = this
		// let _this = this
	


	},
	onShow() {
		let _this = this
		uni.getStorage({
			key: 'projectInfo',
			success: function(res) {
				// console.log(res.data);
				_this.projectId = _this.splitStr(res.data)[0]
				_this.getContent()
			}
		})
		uni.getStorage({
			key: 'checkList',
			success: function(res) {
				// console.log(res)
				if (res.data) {
					_this.checkList += res.data.join(',')
					uni.removeStorageSync('checkList');
				}
			}
		})

	},
	onBackPress(event) {
		// 监听页面返回
		// console.log('监听页面返回')
		uni.setStorageSync('backAssess', true)
	},
	methods: {
		//页面内容回填
		getContent() {
			let _this = this
			uni.getStorage({
				key: 'checkContent',
				success: function(res) {
					// console.log(res.data)
					_this.content = res.data.title
					_this.checklistId = res.data.id
					_this.standardId = res.data.standardId
					_this.acceptRecode = res.data.remark
					// _this.onEditorReady()
					_this.checkNum = res.data.samplingRequires
					if (res.data.categoryCode == 100) {
						_this.isNoDataReview = false
					} else {
						_this.isNoDataReview = true //不是资料审查
					}
					_this.getData()
				}
			})
		},
		getrequire() {
			uni.navigateTo({
				url: `/pages/Require/Require`,
			});
		},
		toBuildInfo() {
			uni.navigateTo({
				url: `/pages/buildInfo/BuildInfo`,
			});
		},
		toProblem() {
			uni.navigateTo({
				url: `/pages/Problem/Problem`,
			});
		},
		toMethods() {
			uni.navigateTo({
				url: `/pages/acceptMethods/AcceptMethods`,
			});
		},
		toRules() {
			uni.navigateTo({
				url: `/pages/rules/Rule`,
			});
		},
		uploadImage(type) {
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
								this.saveFile(res.result, type)
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
		//上传视频
		uploadVideo(type) {
			uni.chooseVideo({
				maxDuration: 10,
				count: 1,
				sourceType: ['album', 'camera'],
				maxDuration: 60,
				success: (res) => {
					let tempFilePath = res.tempFilePath
					// console.log(tempFilePath)
					uni.uploadFile({
						url: 'http://39.104.90.111:2225/upload', //仅为示例，非真实的接口地址
						filePath: tempFilePath,
						name: 'file',
						fileType: 'video',
						success: (uploadFileRes) => {
							// console.log(uploadFileRes)
							let res = JSON.parse(uploadFileRes.data)
							if (res.httpStatus == 200) {
								this.saveFile(res.result, type)
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
					})
				}
			})
			// })
		},
		//切割字符串
		splitStr(str) {
			let s = '';
			s = str.split('*')
			return s
		},
		//切割字符串
		splitStrD(str) {
			let s = '';
			s = str.split('.')
			return s
		},
		// 提交
		async onSubmit(bool) {
			// console.log(this.)
			let param = {};
			if (this.isNoDataReview) {
				param = {
					checkNum: this.checkNum,
					checkPart: this.checkList,
					checklistId: this.checklistId,
					contentRecord: this.acceptRecode,
					isApp: 1,
					projectId: this.projectId,
					result: this.value,
					saveTemp: bool,
					standardId: this.standardId
				}
				let res = await this.$api.POST_submitRecode(param)
				if (res.httpStatus == 200) {
					this.$refs.uToast.show({
						title: '提交成功',
						type: 'success',
						duration: 2000
					})
				} else if (res.httpStatus == 417) {
					this.$refs.uToast.show({
						title: '只能本人修改',
						type: 'error',
						duration: 3000
					})
				} else {
					this.$refs.uToast.show({
						title: '提交失败，请检查网络，填写项',
						type: 'error',
						duration: 3000
					})
				}
			} else {
				param = {
					checklistId: this.checklistId,
					nonconformityDetail: this.acceptRecode,
					projectId: this.projectId,
					result: this.value,
					saveTemp: bool,
					standardId: this.standardId
				}
				let res = await this.$api.POST_reviewerReplace(param)
				if (res.httpStatus == 200) {
					this.$refs.uToast.show({
						title: '提交成功',
						type: 'success',
						duration: 2000
					})
				} else if (res.httpStatus == 417) {
					this.$refs.uToast.show({
						title: '只能本人修改',
						type: 'error',
						duration: 3000
					})
				} else {
					this.$refs.uToast.show({
						title: '提交失败，请检查网络，填写项',
						type: 'error',
						duration: 3000
					})
				}

			}
			// } else {
			// 	param = {
			// 		reviewRecord: {
			// 			checklistId: this.checklistId,
			// 			nonconformityDetail: this.acceptRecode,
			// 			projectId: this.projectId,
			// 			result: this.value
			// 		}

			// 	}
			// }
			// console.log(param)
			// param = JSON.stringify(Object.assign(param))
			// console.log(param)

		},
		// 保存文件
		async saveFile(url, type1) {
			// let type = this.splitStrD(url)[0]
			let param = {
				checklistId: this.checklistId,
				projectId: this.projectId,
				type: type1,
				uploadName: url,
				uploadUrl: url,
				standardId: this.standardId
			}
			let res = await this.$api.POST_addUpload(param)
			if (res.httpStatus == 200) {
				this.$refs.uToast.show({
					title: '上传成功',
					type: 'success',
					duration: 2000
				})
			} else {
				this.$refs.uToast.show({
					title: '上传失败，请检查网络，文件格式',
					type: 'error',
					duration: 3000
				})
			}
		},
		// 数据回填
		async getData() {
			// console.log(this.checklistId)
			// console.log(this.projectId)
			let param = {
				checklistId: this.checklistId,
				projectId: this.projectId,
			}
			let res = await this.$api.POST_getRecordByChecklistId(param)
			// console.log(res)
			if (res.httpStatus == 200) {
				if (this.isNoDataReview) {
					// console.log('现场')
					if (res.result.result.checkPart && res.result.result.checkPart != 'undefined') {
						this.checkList = res.result.result.checkPart
					} else {
						this.checkList = ''
					}
					this.checkNum = res.result.result.checkNum ? res.result.result.checkNum : this.checkNum
					this.acceptRecode = res.result.result.contentRecord ? res.result.result.contentRecord : this.acceptRecode
					this.value = res.result.result.result
				} else {
					// console.log('资料')
					this.acceptRecode = res.result.result.nonconformityDetail ? res.result.result.nonconformityDetail : this.acceptRecode,
					// console.log(this.acceptRecode)
					this.value = res.result.result.result
				}
				this.onEditorReady()

			}
		},
		//验收记录富文本
		onEditorReady() {
			let _this = this
			// console.log(this.acceptRecode)
			uni.createSelectorQuery().select('#editor').context((res) => {
				this.editorCtx = res.context
				this.editorCtx.setContents({
					html: _this.acceptRecode
				})
			}).exec()
		},
		editorChange(e) {
			this.acceptRecode = e.detail.html
		}

	}
}
