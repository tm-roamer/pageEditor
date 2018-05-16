/**
 * 模拟的静态服务器
 */

var path = require('path');

var conf = require('../config/dev.env');
const Koa = require('koa');
const render = require('koa-ejs');					// 模板 https://github.com/koajs/ejs
const bodyParser = require('koa-bodyparser');
const etag = require('koa-etag');
const serve = require('koa-static');
const proxy = require('koa-proxies');
const favicon = require('koa-favicon');
const compress = require('koa-compress');
const conditional = require('koa-conditional-get');
const Router = require('koa-router');
const historyFallback = require('koa2-history-api-fallback');

// 模板
const template = require('./router/template');												// 组件模板

const router = Router();
let app = new Koa();
render(app, {
	root: path.join(__dirname, 'template'),
	layout: false,
	viewExt: 'ejs', // html
	cache: false,
	debug: false
});

app.use(bodyParser());

let opt = {
	publicPath: path.resolve(__dirname, conf.path),
	index: '/index.html',
	favicon: '/favicon.ico',
	proxy: conf.proxy.target,	// 后台代理地址
	port: conf.port, 					// 访问端口
};

// http代理转发
app.use(proxy('/api', {
	target: opt.proxy,
	changeOrigin: true,
	// agent: new httpsProxyAgent('http://1.2.3.4:88'),
	// rewrite: path => path.replace(/^\/octocat(\/|\/\w+)?$/, '/vagusx'),
	// logs: true
}));

// 路由
router.use('/template', template.routes());									// 组件模板

// gzip压缩
app.use(compress({
	flush: require('zlib').Z_SYNC_FLUSH
}))

// etag缓存控制
app.use(conditional());
app.use(etag());

// HTML5 history api
// app.use(historyFallback());

// favicon
app.use(favicon(opt.publicPath + opt.favicon));

// 静态资源
app.use(serve(opt.publicPath, { extensions: ['html'] }));

app.on('error', function (err) {
	console.error('server error', err);
});

router.use('*', function (ctx, next) {
	ctx.set('Cache-Control', 'no-cache');
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	next();
});

app.use(router['routes']());

app.listen(opt.port);

console.log('服务器已启动开始监听 :)  浏览器地址栏访问: localhost:' + opt.port);
