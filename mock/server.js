const url = require('url');
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

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

// 静态资源
app.use(serve(path.resolve(__dirname, '../dist'), { extensions: ['html'] }));

app.listen(9190);

console.log('服务器已启动开始监听 :)  浏览器地址栏访问: localhost:9190');

