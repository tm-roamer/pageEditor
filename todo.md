
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

bug

1. Object.assgin()的浅copy
2. 容器带滚动条的请求,属于复杂情况如何控制
3. 右击菜单的出现位置, 需要智能检测是否距底部了. 
4. 代码需要整理和重构

优化
1. 数据传递方式 DataTransfer  clearData,  getData,  setData setDragImage(el, x , y);



code

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="assets/styles/reset.css">
  <link rel="stylesheet" type="text/css" href="assets/styles/element-ui.min.css">
  <link rel="stylesheet" type="text/css" href="assets/styles/theme.css">
  <link rel="stylesheet" type="text/css" href="assets/styles/custom.css">
  <title>VisualKit</title>
</head>
<body>

<div class="app-body">
  <div class="app-header">
    <div class="logo">观安自现实验室 - 可视化展示系统</div>
    <ul class="nav">
      <li>
        <a data-route="/" class="nav-item">首页</a>
        <a data-route="/page" class="nav-item">页面</a>
      </li>
    </ul>
    <div class="user-info">
      <a>用户名</a>
      <a>退出</a>
    </div>
  </div>
  <div class="app-content" id="app-content">

  </div>
</div>

<script type="text/javascript" src="assets/scripts/jquery.min.js"></script>
<script type="text/javascript" src="assets/scripts/page.js"></script>
<script type="text/javascript" src="assets/scripts/vue.min.js"></script>
<script type="text/javascript" src="assets/scripts/element-ui.min.js"></script>
<script type="text/javascript" src="assets/scripts/axios.min.js"></script>

<script>
  $(document).ready(function () {

    let appContent = $("#app-content");

    // 菜单跳转
    let navItem = $(".nav .nav-item");
    navItem.on('click', function() {
      navItem.removeClass("active");
      page($(this).addClass("active").data("route"));
    });

    // 路由配置
    // page.base('/');
    page({
      hashbang: true   // 通过#号跳转
    });
    page('/', (ctx, next) => {
      appContent.html('<div class="center">hello world</div>');
    });
    page('/page', (ctx, next) => {
      appContent.load("views/page.html");
      // $("#app").html(await $.get('page.html'));
    });

    // 启动当前路由页面
    const regExp = /^#!/;
    const hash = location.hash;
    page(hash.search(regExp) >= 0 ? hash.replace(regExp, "") : '/' );

  });
</script>
</body>
</html>
