
### 资料

todo list

3. 修改容器的滚动条兼容性
4. 容器的整体缩放控制
5. 保存方式, 是自动保存 + 手动保存
6. 撤销的实现原理? 每次操作的历史记录? 如何实现? 难道是把每次操作都抽象成了一个记录, 然后可以进行加入, 删除.
7. 数据接口的实现
8. 样式的实现
9. 动画的实现
9. 节点类型的实现, 对于待添加的节点, 和拖拽后生成的节点, 其实共享同一份元数据
10. 组, 合并, 取消合并
11. 辅助线的实现
12. 快捷键
13. 框选操作
14. 响应式的处理
15. 移动端的支持
16. 图层可以copy, 组可以copy ?? 这个有个疑问, 这里的组跟 合并组合 有啥关系? 
17. 预览 / 全屏
18. 导入 / 导出
19. 对于待添加的节点, 和拖拽后生成的节点, 其实共享同一份元数据
20. 保存的时候, 如何控制不是all in, 而是增量, 如何跟撤销配合在一起.

bug

1. Object.assgin()的浅copy
2. 容器带滚动条的请求,属于复杂情况如何控制
3. 右击菜单的出现位置, 需要智能检测是否距底部了. 
4. 代码需要整理和重构
5. 交互需要修改了(拖拽 改成 点击)

优化
1. 数据传递方式 DataTransfer  clearData,  getData,  setData setDragImage(el, x , y);



code



// :size="setting.config.size.value"
            // "size": {
            //   label: "尺寸",
            //   name: "size",
            //   type: "select",
            //   options: ["", "medium", "small", "mini"],
            //   value: ""
            // },


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