const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const url = require('url');
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

// const login = require('./login/login');															// 登录
const overview = require('./overview/overview');												// 全网总览

const router = Router();
const app = new Koa();

router.use('*', function (ctx, next) {
	ctx.set('Cache-Control', 'no-cache');
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	next();
});

app.use(bodyParser());

// router.use('/api/loginuser',loginUser.routes());							// 登录
router.use('/api/overview', overview.routes());									// 全网总览

app.use(router['routes']());

// app.use(function (ctx, next) {
// 	let originalUrl = ctx.originalUrl.replace(/\/*$/, '');
// 	// 判断原始地址和请求类型
// 	if (!/^\/api\/config/i.test(originalUrl)
// 			|| ctx.header['content-type'] !== 'application/json') {
// 		next();
// 	}
// 	// 截取地址
// 	let filePath = path.parse(__dirname + originalUrl + '.json');
// 	let fullFilePath = filePath.dir + '/' + filePath.base;
// 	// 如果文件不存在
// 	if (!fs.existsSync(fullFilePath) && filePath.name) {
// 		// 递归创建目录(如果不存在)
// 		if (mkdirsSync(filePath.dir)) {
// 			fs.writeFileSync(fullFilePath, getFormatData(), {flag: 'w+'});
// 		}
// 	}
// 	// 判断请求类型(读, 写)
// 	ctx.set('Content-Type', 'application/json');
// 	let data = {
// 		code: 200,
// 		info: 'success'
// 	};
// 	let method = ctx.request.method.toLowerCase();
// 	if (method === 'get') {
// 		ctx.body = fs.readFileSync(fullFilePath);
// 	} else {
// 		let writeData = Object.assign({}, data);
// 		writeData.data = ctx.request.body;
// 		fs.writeFileSync(fullFilePath, getFormatData(writeData), {flag: 'w+'});
// 		ctx.body = data
// 	}
// });
//
// // 格式化输出json
// function getFormatData(d) {
// 	return JSON.stringify(d || {}, undefined, 2)
// }
//
// // 递归创建目录
// function mkdirsSync(dirname, mode) {
// 	if (fs.existsSync(dirname)) {
// 		return true;
// 	} else {
// 		if (mkdirsSync(path.dirname(dirname), mode)) {
// 			fs.mkdirSync(dirname, mode);
// 			return true;
// 		}
// 	}
// }

app.listen(3001);

console.log('mock服务已启动 :) 端口[3001]');

