const fs = require('fs');
const path = require('path');
const Router = require("koa-router");
const router = Router();

router.get('/:type/:part/:id', (ctx, next) => {
  ctx.set('Content-Type', 'text/html');
  let params = ctx.params;
  let file = path.join(params.type, params.part, params.part);
  return new Promise(async (resolve, reject) => {
    await ctx.render(file, {
      id: params.id
    });
    resolve();
  });
});

exports = module.exports = router;
