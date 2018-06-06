const fs = require('fs');
const path = require('path');
const file = require("../utils/file");
const Router = require("koa-router");
const router = Router();

// 预览
router.get('/preview', (ctx, next) => {
  // let filePath = path.join(__dirname, "../../preview");
  // let projectFilePath = path.join(__dirname, "../../project_template");
  // file.remove(filePath);
  // file.copy(projectFilePath, filePath);
  ctx.body = {
    "code": 200,
    "message": "成功",
    "data": []
  }
});

// 发布
router.get('/publish', (ctx, next) => {
  // let filePath = path.join(__dirname, "../../preview");
  // let projectFilePath = path.join(__dirname, "../../project_template");
  // file.remove(filePath);
  // file.copy(projectFilePath, filePath);
  ctx.body = {
    "code": 200,
    "message": "成功",
    "data": []
  }
});

// 保存
router.post('/save', (ctx, next) => {

  let arr = [];
  let data = ctx.request.body;

  for (let node of data.arr) {

  }

  ctx.body = {
    "code": 200,
    "message": "成功",
    "data": []
  }
});

exports = module.exports = router;