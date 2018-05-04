const Router = require("koa-router");
const router = Router();

router.get('/', function (ctx, next) {
     ctx.set('Content-Type', 'application/json');
     var data = {
			 "redirect":{"userMessage":"","url":"index"}
     };
     ctx.body = JSON.stringify(data);
 });

module.exports = router;
