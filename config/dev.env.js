module.exports = {
  env: 'development',
	port: 9100,
	path: '../src',
	proxy: {
  	// 服务器
  	// target: 'http://192.168.101.3:8080'
		// 本地
		target: 'http://localhost:8080'
	}
};
