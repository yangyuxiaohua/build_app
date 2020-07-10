import apilist from './APIconfig.js'
import {
	BASEURL
} from './HOSTconfig.js'

let sid;
uni.getStorage({
	key: 'sid',
	success: function(res) {
		console.log(res.data)
		if (res.data) {
			sid = res.data
		}

	}
})
const api = (() => {
	let apiobj = {}
	Object.keys(apilist.get).forEach(curr => {
		apiobj[curr] = data => {
			return uni.request({
				url: BASEURL + apilist.get[curr],
				method: 'GET',
				data: { ...data
				}
			}).then(res => {
				if (res[1].statusCode !== 200) {
					uni.showToast({
						title: '数据请求异常，请重试',
						image: '/static/warning.png',
						duration: 1000,
						mask: true
					});
					return Promise.reject(res[0]);
				}
				return res[1] //自己根据后端返回数据结构习惯，抛出需要的数据
			})
			return result
		}
	})
	Object.keys(apilist.post).forEach(cur => {
		apiobj[cur] = data => {
			const Token = uni.getStorageSync('loginInfo')
			// console.log(uni.getStorageSync('loginInfo'))
			// if (Token) {
				// cur +='?appToken=1'
			// }
			// console.log(cur)
			uni.showLoading({
				title: '加载中'
			});
			let header;
			if (sid) {
				// if (cur == 'POST_submitRecode') {
					// header = {
					// 	// 'content-type': 'application/json',
					// 	'Accept': 'application/json, */*',
					// 	// 'Access-Token': Token
					// 	'Content-type': 'application/json', //设置请求参数格式
					// 	'sid': sid
					// }
				// } else {
					header = {
						// 'content-type': 'application/json',
						'Accept': 'application/json, */*',
						// 'Access-Token': Token
						'Content-type': 'application/x-www-form-urlencoded', //设置请求参数格式
						'sid': sid
					}
				// }

			} else {
				header = {
					// 'content-type': 'application/json',
					'Accept': 'application/json, */*',
					// 'Access-Token': Token
					'Content-type': 'application/x-www-form-urlencoded', //设置请求参数格式
				}
			}

// console.log(BASEURL)
let url = Token? BASEURL + apilist.post[cur]+'?appToken='+Token :BASEURL + apilist.post[cur]
			return uni.request({
				header: header,
				url: url,
				method: 'POST',
				data: { ...data
				}
			}).then(res => {
				if (res[1].statusCode !== 200) {
					uni.hideLoading();
					uni.showToast({
						title: '数据请求异常，请重试',
						image: '/static/warning.png',
						duration: 1000,
						mask: true
					});
					return Promise.reject(res[0]);
				}
				uni.hideLoading();
				return res[1].data //自己根据后端返回数据结构习惯，抛出需要的数据
			})
		}
	})
	return apiobj
})()

export default api
