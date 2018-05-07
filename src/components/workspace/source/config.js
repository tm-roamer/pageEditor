"use strict";

export const constant = {
  THROTTLE_TIME: 14,                                    // 节流函数的间隔时间单位ms, FPS = 1000 / THROTTLE_TIME
  WORKSPACE_USER_SELECT: "workspace-user-select",       // 拖拽进行中, 在body标签动态绑定防止文本选中样式
  WORKSPACE: "workspace",                               // 容器的className
  WORKSPACE_NUMBER: "workspace-number",                 // 容器编号

  WORKSPACE_NODE: "workspace-node",                     // 节点的className
  NODE_TYPE: "node-type",                               // 节点类型, 例 "div", "input", "radio"
  NODE_NUMBER: "node-number",                           // 节点编号
  DRAG_TYPE: "drag-type",                               // 节点的拖拽类型, 默认"copy", 支持"move", "copy"

  DRAG_IMAGE: "workspace-drag-image",                   // 拖拽节点镜像className
  DRAG_IMAGE_SHOW: "drag-image-show",                   // 拖拽节点镜像显示className
  DRAG_IMAGE_HIDE: "drag-image-hide",                   // 拖拽节点镜像显示className

  NODE_BOUND_ANIME: "node-bound-anime",                 // 节点被拖拽超过边界的动画className

  WORKSPACE_ZOOM: "workspace-zoom",                     // 带八角四线句柄的节点
  ZOOM_RECT: "zoom-rect",                               // 句柄矩形
  ZOOM_BAR: "zoom-bar",                                 // 句柄小块
  ZOOM_BAR_N: "n",                                      // 句柄小块, 正北
  ZOOM_BAR_NE: "ne",                                    // 句柄小块, 东北
  ZOOM_BAR_NW: "nw",                                    // 句柄小块, 西北
  ZOOM_BAR_E: "e",                                      // 句柄小块, 正东
  ZOOM_BAR_W: "w",                                      // 句柄小块, 正西
  ZOOM_BAR_SE: "se",                                    // 句柄小块, 东南
  ZOOM_BAR_SW: "sw",                                    // 句柄小块, 西南
  ZOOM_BAR_S: "s",                                      // 句柄小块, 正南
  ZOOM_LINE: "zoom-line",                               // 句柄线
  ZOOM_LINE_TOP: "top",                                 // 句柄线, 上侧
  ZOOM_LINE_LEFT: "left",                               // 句柄线, 左侧
  ZOOM_LINE_RIGHT: "right",                             // 句柄线, 右侧
  ZOOM_LINE_BOTTOM: "bottom",                           // 句柄线, 下侧

  WORKSPACE_CONTEXTMENU: "workspace-contextmenu",       // 右击菜单的className
  CONTEXTMENU_ITEM: "contextmenu-item",                 // 右击菜单条目的className
  CONTEXTMENU_EVENT_KEY: "event-key",                   // 右击菜单条目的书写名, 用于触发事件
  CONTEXTMENU_ITEM_TYPE_ITEM: 'item',                   // 普通条目
  CONTEXTMENU_ITEM_TYPE_LINE: 'line',                   // 分割线
  CONTEXTMENU_ITEM_STATE_NORMAL: 'normal',              // 正常
  CONTEXTMENU_ITEM_STATE_DISABLED: 'disabled',          // 禁用
  CONTEXTMENU_ITEM_STATE_DIALOG: 'dialog',              // 文字后面出现... 点击弹出dialog
  CONTEXTMENU_ITEM_STATE_SUBMENU: 'submenu',            // 条目的行尾出现 右箭头 悬停出现子菜单

  EVENT_NODE_COPY: "node.copy",                         // 事件类型 复制节点
  EVENT_NODE_DELETE: "node.detele",                     // 事件类型 删除节点 
  EVENT_LAYER_TOP: "layer.top",                         // 事件类型 置于顶层
  EVENT_LAYER_UP: "layer.up",                           // 事件类型 上移一层
  EVENT_LAYER_DOWN: "layer.down",                       // 事件类型 下移一层
  EVENT_LAYER_BOTTOM: "layer.bottom",                   // 事件类型 置于底层
};

export const globalConfig = {
  el: "#workspace",                                // 容器选择器
  edit: true,                                      // 是否开启编辑模式
  hitScale: 0.6,                                   // 节点与容器碰撞的面积重叠比例 !!! 0.2有bug
  resizeMinW: 16,                                  // 拖拽节点改变大小时的最小宽度, 单位px
  resizeMinH: 16,                                  // 拖拽节点改变大小时的最小高度, 单位px
  zoom: {
    offset: 4,                                     // 缩放句柄的偏移, 单位px, 不建议修改, 与css样式关联. offset = width / 2
  },
  contextMenu: {                                   // 右击菜单配置
    workspace: [],
    node: [
      {
        type: constant.CONTEXTMENU_ITEM_TYPE_ITEM,
        state: constant.CONTEXTMENU_ITEM_STATE_DISABLED,
        text: '复制',
        shortcutKey: '',
        eventKey: constant.EVENT_NODE_COPY,
      },
      {
        type: constant.CONTEXTMENU_ITEM_TYPE_ITEM,
        state: constant.CONTEXTMENU_ITEM_STATE_DISABLED,
        text: '删除',
        shortcutKey: '',
        eventKey: constant.EVENT_NODE_DELETE,
      },
      {
        type: constant.CONTEXTMENU_ITEM_TYPE_LINE
      },
      {
        type: constant.CONTEXTMENU_ITEM_TYPE_ITEM,
        state: constant.CONTEXTMENU_ITEM_STATE_NORMAL,
        text: '置于顶层',
        shortcutKey: '',
        eventKey: constant.EVENT_LAYER_TOP,
      },
      {
        type: constant.CONTEXTMENU_ITEM_TYPE_ITEM,
        state: constant.CONTEXTMENU_ITEM_STATE_NORMAL,
        text: '上移一层',
        shortcutKey: '',
        eventKey: constant.EVENT_LAYER_UP,
      },
      {
        type: constant.CONTEXTMENU_ITEM_TYPE_ITEM,
        state: constant.CONTEXTMENU_ITEM_STATE_NORMAL,
        text: '下移一层',
        shortcutKey: '',
        eventKey: constant.EVENT_LAYER_DOWN,
      },
      {
        type: constant.CONTEXTMENU_ITEM_TYPE_ITEM,
        state: constant.CONTEXTMENU_ITEM_STATE_NORMAL,
        text: '置于底层',
        shortcutKey: '',
        eventKey: constant.EVENT_LAYER_BOTTOM,
      },
      {
        type: constant.CONTEXTMENU_ITEM_TYPE_ITEM,
        state: constant.CONTEXTMENU_ITEM_STATE_DIALOG,
        text: '测试dialog',
        shortcutKey: '',
      },
      {
        type: constant.CONTEXTMENU_ITEM_TYPE_ITEM,
        state: constant.CONTEXTMENU_ITEM_STATE_SUBMENU,
        text: '测试menu',
        subMenu: [
          {
            type: constant.CONTEXTMENU_ITEM_TYPE_ITEM,
            state: constant.CONTEXTMENU_ITEM_STATE_SUBMENU,
            text: '测试子菜单',
            subMenu: [
              {
                type: constant.CONTEXTMENU_ITEM_TYPE_ITEM,
                state: constant.CONTEXTMENU_ITEM_STATE_NORMAL,
                text: '测试子菜单',
                shortcutKey: '',
                eventKey: '',
              },
              {
                type: constant.CONTEXTMENU_ITEM_TYPE_ITEM,
                state: constant.CONTEXTMENU_ITEM_STATE_NORMAL,
                text: '测试子菜单',
              }
            ]
          },
          {
            type: constant.CONTEXTMENU_ITEM_TYPE_ITEM,
            state: constant.CONTEXTMENU_ITEM_STATE_NORMAL,
            text: '测试子菜单',
          }
        ]
      }
    ]
  },
};