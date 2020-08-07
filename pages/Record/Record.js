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
			standardId: '',
			isAccept: false, //判断是否是验收单位
			showBtns1: true, //其他单位的按钮组
			showBtns2: false, // 验收单位的按钮组
			recognitionOriginal: false, //验收单位认可原纪录新字段
			// AudioChoseTab: [ //录音功能选择列表
			// 	{
			// 		text: '录音',
			// 		// color: 'blue',
			// 		fontSize: 32,
			// 		borderBottom: '1px solid #000'
			// 	},
			// 	{
			// 		text: '从文件夹中选择',
			// 		// color: 'blue',
			// 		fontSize: 32
			// 	}
			// ],
			// showAudioTab: false,
			// recorderManager:{},// 录音对象
			// voicePath:''
		}
	},
	onLoad() {
		// let _this = this
		this.getRoleCode()
		let _this = this
		uni.getStorage({
			key: 'projectInfo',
			success: function(res) {
				_this.projectId = _this.splitStr(res.data)[0]
				_this.getContent()
			}
		})
		//录音功能
	// 	this.recorderManager = uni.getRecorderManager();
	
	// 	let self = this;
	// 	this.recorderManager.onStop(function(res) {
	// 		console.log('recorder stop' + JSON.stringify(res));
	// 		self.voicePath = res.tempFilePath;
	// 	});


	},
	onShow() {
		let _this = this
		// console.log(_this)
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
		//上传图片
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
		//上传录音
		// uploadAudio(type) {
		// 	// console.log(type)
		// 	this.showAudioTab = true
		// },
		// //选中录音的功能
		// clickAudioChoseTab(index) {
		// 	// console.log(index)
		// 	if (index == 0) {
		// 		this.startAudio()
		// 	} else {
		// 		this.chosedAudio()
		// 	}
		// },
		// //开始录音功能
		// startAudio() {
		// 	console.log('开始录音')
		// 	console.log(this.recorderManager) 
		// 	this.recorderManager.start();
			
		// },
		// //选择录音上传
		// chosedAudio() {
		// 	let _this = this
		// 	var REQUESTCODE = 1;
		// 	var main = plus.android.runtimeMainActivity();
		// 	var Intent = plus.android.importClass('android.content.Intent');
		// 	var intent = new Intent(Intent.ACTION_GET_CONTENT);

		// 	// intent.setType("*/*"); //设置类型，任意类型
		// 	//intent.setType("image/*");
		// 	intent.setType("audio/*"); //选择音频
		// 	//intent.setType("video/*"); //选择视频 （mp4 3gp 是android支持的视频格式）

		// 	intent.addCategory(Intent.CATEGORY_OPENABLE);
		// 	main.startActivityForResult(intent, REQUESTCODE);

		// 	main.onActivityResult = function(requestCode, resultCode, data) {
		// 		if (REQUESTCODE == requestCode) {
		// 			var context = main;
		// 			plus.android.importClass(data);
		// 			// 获得文件路径
		// 			var fileData = data.getData();
		// 			var path = plus.android.invoke(fileData, "getPath");
		// 			console.log("path:" + path);

		// 			// 判断文件类型
		// 			var resolver = context.getContentResolver();
		// 			var fileType = plus.android.invoke(resolver, "getType", fileData);
		// 			console.log("fileType:" + fileType);
		// 			console.log(this);
		// 			_this .saveFile(path, 'MP3')
		// 		}
		// 	}
		// },
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
					result: this.value ? this.value : '',
					saveTemp: bool,
					standardId: this.standardId,
					recognitionOriginal: this.recognitionOriginal
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
						title: res.msg,
						type: 'error',
						duration: 3000
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'error',
						duration: 3000
					})
				}
			} else {
				param = {
					checklistId: this.checklistId,
					nonconformityDetail: this.acceptRecode,
					projectId: this.projectId,
					result: this.value ? this.value : '',
					saveTemp: bool,
					standardId: this.standardId,
					recognitionOriginal: this.recognitionOriginal
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
						title: res.msg,
						type: 'error',
						duration: 3000
					})
				} else {
					this.$refs.uToast.show({
						title: res.msg,
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
				standardId: this.standardId
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
					// console.log(res)
					this.acceptRecode = res.result.result.nonconformityDetail ? res.result.result.nonconformityDetail : this.acceptRecode,
						// console.log(this.acceptRecode)
						this.value = res.result.result.result
				}
				this.onEditorReady()
				if (this.isAccept) {
					if (!res.result.result) {
						this.showBtns1 = true
						this.showBtns2 = false
						this.recognitionOriginal = false
					} else {
						if (res.result.result.isApp == -1) {
							// console.log(111)
							this.showBtns1 = false
							this.showBtns2 = true
							this.recognitionOriginal = true
						} else {
							this.showBtns1 = true
							this.showBtns2 = false
							this.recognitionOriginal = false
						}
					}
				}


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
		},
		// 权限控制显示按钮
		async getRoleCode() {
			let _this = this
			let res = await this.$api.POST_getRole()
			if (res.httpStatus == 200) {
				// console.log(res)
				if (res.result.roleCode == 400 || res.result.roleCode == 450 || res.result.roleCode == 500) {
					this.isAccept = true
				} else {
					this.isAccept = false
				}

			}
		}


	}
}
