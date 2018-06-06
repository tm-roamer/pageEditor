const fs = require('fs');
const path = require('path');
const file = require("../utils/file");
const Router = require("koa-router");
const router = Router();

// 请求组件
router.get('/:type/:part/:node_id', (ctx, next) => {
  ctx.set('Content-Type', 'text/html');
  let params = ctx.params;
  let name = params.type + '-' + params.part;
  let filePath = path.join(__dirname, "../template", params.type, params.part);
  let file = path.join(params.type, params.part, params.part);
  // 渲染模板
  return new Promise(async (resolve, reject) => {
    await ctx.render(file, {
      name: name,
      id: name + '-' + params.node_id,
      node_id: params.node_id,
      template: filePath + '/' + params.part
    });
    resolve();
  });
});

exports = module.exports = router;
