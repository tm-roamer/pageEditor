module.exports = {
  env: 'development',
	port: 9100,
	path: '../browser',
	proxy: {
  	// 服务器
  	// target: 'http://120.27.11.231:8080'
		// 本地
		target: 'http://localhost:3100'
	}
};