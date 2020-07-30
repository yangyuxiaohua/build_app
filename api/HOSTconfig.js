const ONLINEHOST = 'http://39.104.90.111:2225/' //正式线上环境

const QAHOST = 'http://39.104.90.111:2225/'  //测试线上环境

const ISONLINE = false //是否为正式环境：true为正式环境，false为测试环境，

const CURRENT = ISONLINE ? ONLINEHOST : QAHOST

const LOCALHOST = 'http://192.168.0.200:2225/' //本地开发环境
// const LOCALHOST = 'http://39.104.90.111:2225/' //本地开发环境
// const LOCALHOST = 'http://39.104.90.111:2225/' //本地开/发环境
// const LOCALHOST = 'http://172.16.2.99:2225/' //本地开发环境


export const BASEURL = process.env.NODE_ENV === 'development' ? LOCALHOST : CURRENT
