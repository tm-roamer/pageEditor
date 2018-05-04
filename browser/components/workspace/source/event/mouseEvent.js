"use strict";

import { constant } from '../config.js';
import view from '../view.js';
import utils from '../utils.js';
import Cache from "../cache.js";

import Node from "../element/node.js";
import Zoom from "../element/zoom.js";
import ContextMenu from '../element/contextMenu.js';

import registry from './registry.js';
import dragImage from './dragImage.js';
import resizeEvent from './resizeEvent.js';
import {nodeDragEvent, containerDragEvent} from  './dragDropEvent.js';

// 模拟HTML5拖拽的底层操作
// !!! 我需要开放接口, 让vue能够参与进来
let mouseEvent = {
  init() {
    this.add(document, 'mousedown', this.mouseDown.bind(this), false);
    this.add(document, 'mousemove', this.mouseMove.bind(this), false);
    this.add(document, 'mouseup', this.mouseUp.bind(this), false);
    this.add(document, 'click', this.click.bind(this), true);
    this.add(document, 'contextmenu', this.contextMenu.bind(this), false);
    // 添加拖拽镜像节点
    registry.dragImage = view.createDragNode();
    document.body.appendChild(registry.dragImage);
  },
  destroy() {
    this.remove(document, 'mousedown', this.mouseDown.bind(this), false);
    this.remove(document, 'mousemove', this.mouseMove.bind(this), false);
    this.remove(document, 'mouseup', this.mouseUp.bind(this), false);
    this.remove(document, 'click', this.click.bind(this), true);
    this.remove(document, 'contextmenu', this.contextMenu.bind(this), false);
    // 移除拖拽镜像节点
    document.body.removeChild(registry.dragImage);
    delete registry.dragImage;
  },
  add(el, type, listener, options) {
    el.addEventListener(type, listener, options);
  },
  remove(el, type, listener, options) {
    el.removeEventListener(type, listener, options);
  },
  mouseDown(evt) {
    // 右击菜单内的点击, 不做任何操作
    if (view.up(evt.target, constant.WORKSPACE_CONTEXTMENU)) {
      return;
    } else {
      // 点击其他地方, 关闭右击菜单
      if (registry.isContextMenu) {
        registry.contextMenu && registry.contextMenu.destroy(registry);
        delete registry.contextMenu;
        delete registry.isContextMenu;
      }
    }
    // 开始缩放
    if (evt.target.classList.contains(constant.ZOOM_BAR)) {
      return resizeEvent.resizeStart(evt, registry.zoom);
    }
    // 准备拖拽
    nodeDragEvent.dragReady(evt, view.up(evt.target, constant.WORKSPACE_NODE));
  },
  mouseMove(evt) {
    // 缩放中
    if (registry.isResize) {
      return resizeEvent.resizeOver(evt);
    }
    // 开始拖拽, 改变位置
    if (registry.dragElement && registry.isMouseDown && this.isMove(evt)) {
      registry.isDrag = true;
      registry.isMouseDown = undefined;
      // 设置全局禁用拖拽选中文本
      document.body.classList.add(constant.WORKSPACE_USER_SELECT);
      // 根据节点内存中是否存在,来判断方向
      registry.node = Node.cache.get(registry.dragElement);
      if (registry.node) {

        // @特殊处理 拖拽过程中, zoom需要移除. 结束拖拽后再显示.
        let zoom = registry.node.zoom;
        zoom && zoom.enable() && zoom.destroy();

        registry.setWorkspace(registry.node.workspace);
        registry.inside = true;          // 状态 容器内
      } else {
        registry.inside = false;         // 状态 容器外
      }
      // 记录拖拽状态
      registry.dragType = view.attr(registry.dragElement, constant.DRAG_TYPE) || "copy";
      registry.nodeType = view.attr(registry.dragElement, constant.NODE_TYPE) || "div";
      // 设置拖拽镜像
      dragImage.set();
      // 节点监听-开始拖拽
      nodeDragEvent.dragStart(evt);
    }
    // 正在拖拽, 改变位置
    if (registry.isDrag) {
      // 移动拖拽镜像
      dragImage.move(evt);
      // 函数节流
      if (!utils.throttle(Date.now())) return;
      // 碰撞检测
      utils.hitContainerAll(registry.dragCoord, registry.inside, (hit, workspace) => {
        // 发生碰撞
        if (hit) {
          // 进入
          if (registry.inside === false) {
            containerDragEvent.dragEnter(evt, workspace);
            registry.inside = true;
            // console.log('dragEnter');
          }
          // 停留
          containerDragEvent.dragOver(evt);
          // console.log('dragOver');
        } else {
          // 离开
          if (registry.inside === true) {
            containerDragEvent.dragLeave(evt);
            registry.inside = false;
            //console.log('dragLeave');
          }
        }
      });
    }
  },
  mouseUp(evt) {
    // 缩放
    if (registry.isResize) {
      return;
    }
    // 结束拖拽, 改变位置
    if (registry.isDrag) {
      // 取消全局禁用拖拽选中文本
      document.body.classList.remove(constant.WORKSPACE_USER_SELECT);
      // 隐藏拖拽镜像
      dragImage.hide();
      // 触发容器的放下事件
      if (registry.inside) {
        // @特殊处理, 支持当节点首次加入容器的情况
        registry.node = containerDragEvent.drop(evt, registry.dragType, registry.nodeType, registry.dragCoord, registry.node);
      }
      // 节点监听-结束拖拽 
      nodeDragEvent.dragEnd(evt, registry.dragType, registry.dragCoord, registry.node);

    }
    delete registry.inside;
    // delete registry.isDrag;      click remove
    // delete registry.node;        click remove
    // delete registry.dragElement; click remove
    // delete registry.workspace;   drop & dragLeave remove
    // delete registry.dragType;    click remove
    delete registry.dragCoord;
    delete registry.nodeType;
    delete registry.offsetX;
    delete registry.offsetY;
    delete registry.pageX;
    delete registry.pageY;
  },
  isMove: function (evt) {
    let distanceX = Math.abs(evt.pageX - registry.pageX || 0),
      distanceY = Math.abs(evt.pageY - registry.pageY || 0);
    // 计算拖拽距离, 判断是否拖拽
    if (registry.distance <= distanceX || registry.distance <= distanceY) {
      return true;
    }
  },
  click(evt) {
    // 右击菜单内的点击, 不做任何操作
    if (view.up(evt.target, constant.WORKSPACE_CONTEXTMENU)) {
      // 取得拖拽节点
      let element = view.up(evt.target, constant.CONTEXTMENU_ITEM);
      let eventKey = view.attr(element, constant.CONTEXTMENU_EVENT_KEY);
      // Workspace.emit(eventKey);
      if (eventKey) {
        let name = utils.changeLine2Hump(eventKey.replace(".", "-").split("-").reverse().join("-"))
        // 执行监听, 并移除右击菜单
        registry.contextMenu[name](() => {
          registry.contextMenu.destroy();
          delete registry.contextMenu;
          delete registry.isContextMenu;
        });
      }
      return;
    }
    // 结束拖拽
    if (registry.isDrag) {
      delete registry.isDrag;
      if (registry.dragType !== "copy") {
        delete registry.dragType;

        // @特殊处理 拖拽过程中, zoom需要移除. 结束拖拽后再显示.
        let node = registry.node;
        if (node && !node.zoom) {
          // 先移除其他节点的句柄
          registry.zoom && registry.zoom.destroy();
          // 再添加当前节点的句柄
          registry.zoom = new Zoom(node.workspace, node);
        }

        return;
      }
    }
    // 结束缩放
    if (registry.isResize) {
      return resizeEvent.resizeEnd(evt);
    }
    // 添加句柄
    let node = Node.cache.get(registry.dragElement) || registry.node;
    // 点击其他地方, 移除句柄
    if (!node) {
      registry.zoom && registry.zoom.destroy();
      delete registry.zoom;
    } else {
      // 节点是否拥有句柄 
      if (!node.zoom) {
        // 先移除其他节点的句柄
        registry.zoom && registry.zoom.destroy();
        // 再添加当前节点的句柄
        registry.zoom = new Zoom(node.workspace, node);
      }
    }
    delete registry.node;
    delete registry.dragElement;
  },
  contextMenu(evt) {
    evt.preventDefault();
    registry.isContextMenu = true;
    // 取得拖拽节点
    let dragElement = view.up(evt.target, constant.WORKSPACE_NODE);
    if (dragElement) {
      // 取得节点实例
      let node = Node.cache.get(dragElement);
      if (node) {
        registry.contextMenu = new ContextMenu(node, evt.pageX, evt.pageY);
      }
    }
  }
};

export default mouseEvent;