"use strict";

/**
 * 变量登记处
 * 拖拽过程中产生临时变量的存放处
 */
let registry = {
  distance: 3,                    // 触发拖拽的拖拽距离

  node: null,                     // 被拖拽的节点 Node实例
  nodeType: undefined,            // 拖动的节点类型, 进行数据关联, 例: "div", "input", "img"
  workspace: null,                // 拖拽的节点 Node实例 所在容器 Workspace实例

  dragType: undefined,            // 拖拽的类型, 支持 "move", "copy"
  dragImage: null,                // 拖拽的节点镜像 HTMLElement, 针对 dragType = "copy" 情况
  dragElement: null,              // 拖拽的节点 HTMLElement
  dragCoord: null,                // 拖拽的坐标数据

  isMouseDown: undefined,         // 是否触发MouseDown
  pageX: 0,                       // 记录MouseDown的pageX
  pageY: 0,                       // 记录MouseDown的pageY
  offsetX: 0,                     // 记录MouseDown的节点左上角与点击处的偏移量offsetX
  offsetY: 0,                     // 记录MouseDown的节点左上角与点击处的偏移量offsetY

  inside: false,                  // 拖拽的容器内外标识, 容器内 === true,  容器外 === false

  isDrag: false,                  // 是否开启 拖拽 改变位置
  isResize: false,                // 是否开启 拖拽 放大缩小
  isContextMenu: false,           // 是否开启 右击菜单

  zoom: null,                     // 句柄选择器, 可以放大缩小
  dragZoomBar: null,              // 被拖拽的节点句柄 HTMLElement
  originNodeCoord: null,          // 被拖拽的节点 原始坐标

  contextMenu: null,              // 右击菜单对象

  setWorkspace(workspace) {
    registry.workspace = workspace;
    registry.container = workspace.container;
    return this;
  },

  clearDrag() {
    delete this.workspace;
    delete this.container;
  },
  clearResize() {
    
  },
  clearAll() {

  }
}

export default registry;