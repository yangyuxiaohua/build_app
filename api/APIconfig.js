export default {
	get: {
		GET_TEST: 'api/b/bid/drugs/getPageList',
		// GET_TEST:'api/b/bid/login/_login', 
	},
	post: {
		// POST_TEST:'api/b/bid/drugs/getBidDrugList', 
		POST_login: 's_login', //登录
		POST_getRole: 'getCurrentRole', //获取当前用户角色
		POST_getUserInfo: 'getLoginAccountInfo', //获取当前用户详情
		POST_getAppStatisticalDto: 'app/home/getAppStatisticalDto', //首页统计
		POST_getAppProjectsStatisticalDto: 'app/home/getAppProjectsStatisticalDto', //统计4项
		POST_getProjectsByUser: 'app/project/getProjects', //获取当前用户项目列表
		POST_getProjectInfo: 'app/project/get', //获取项目信息
		POST_getAcceptContent: 'ac/get', //验收内容 -> 获取6大类
		POST_buildType: 'dictionary/getAc_1_jie_gou_type', //验收内容 -> 获取结构类型
		POST_refractoryLevelId: 'dictionary/getAc_1_nai_huo_level', //验收内容 -> 获取耐火等级
		POST_getMenus: 'ac/getMenus', //验收内容 -> 获取消防设施一级菜单
		POST_getDocumentByProjectId: 'app/task/getDocumentByProjectId', //根据项目获取现场评定 + 资料审查内容
		POST_getQuestionByCheckListId: 'app/record/getQuestionByCheckListId', //根据checklistId查询一批常见问题
		POST_submitRecode: 'app/record/replace', //统一提交（现场评定 + 资料审查)
		POST_reviewerReplace: 'app/record/reviewerReplace', //4.提交（资料审查）
		POST_addUpload: 'app/record/upload/add', //添加上传验收文件地址信息
		POST_getRecordByChecklistId: 'app/record/getRecordByCheckListId', //获取填写的现场评定记录 - 包含附件
		POST_updatePwd: 'user/updateUser', //修改密码
		POST_Register: 'register', //注册
		POST_updeVersion: 'app/auto-update/getAppVersion', //自动更新
		POST_getUserByAccount: 'app/user/getUserByAccount', //根据账号->查询人员信息
		POST_pageByCondition: 'tips/policies/pageByCondition', //查询一批政策法规
		POST_pageNotice: 'app/notice/pageByCondition', //查询一批消息
		POST_sendNotice: 'app/notice/send', //发送通知
		POST_getNotice: 'app/notice/get', //消费一条消息
		POST_getFactoryMenus: 'project/factory2/getFactoryMenus', //统一权限树形菜单获取
		POST_sendNotice: 'app/notice/send', //发送通知
		





	}
}
