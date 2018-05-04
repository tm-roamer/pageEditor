"use strict";

import { constant } from '../config.js';
import utils from '../utils.js';
import registry from './registry.js';

import Node from "../element/node.js";
import Zoom from "../element/zoom.js";

// 节点的拖拽事件监听
export let nodeDragEvent = {
  dragReady(evt, dragElement) {
    if (dragElement) {
      registry.dragElement = dragElement;
      // 记录位置, 通过比较拖拽距离来判断是否是拖拽, 如果是拖拽则阻止冒泡. 不触发点击事件
      registry.isMouseDown = true;
      registry.pageX = evt.pageX;
      registry.pageY = evt.pageY;
      // 记录坐标, 计算点击的偏移量
      registry.dragCoord = utils.getCoord(registry.dragElement);
      registry.offsetX = evt.pageX - registry.dragCoord.x;
      registry.offsetY = evt.pageY - registry.dragCoord.y;
    }
  },
  dragStart(evt) {
    // console.log("dragStart", evt, node);
  },
  // dragend(在drop后面触发)
  dragEnd(evt, dragType, dragCoord, node) {
    if (!node && dragType === "copy") {
      return;
    } else if (node && dragType === "move") {
      // 转换坐标
      Object.assign(node.data, utils.convertCoord(dragCoord, node.workspace.coord));
    }
    // 约束范围
    let exceed = utils.constraint(node.workspace.coord, node.data);
    // 执行动画
    if (exceed) {
      var tmp = function () {

        // @特殊处理 拖拽过程中, zoom需要移除. 结束拖拽后再显示.
        let node = registry.node;
        if (node && !node.zoom) {
          // 先移除其他节点的句柄
          registry.zoom && registry.zoom.destroy();
          // 再添加当前节点的句柄
          registry.zoom = new Zoom(node.workspace, node);
        }

        node.element.classList.remove(constant.NODE_BOUND_ANIME);
        node.element.removeEventListener("transitionend", tmp, false);
      }
      node.element.addEventListener("transitionend", tmp, false);
      node.element.classList.add(constant.NODE_BOUND_ANIME);
    }
    // 每次拖拽完成, 节点坐标同步更新
    node.style();
  }
};

// 容器的拖拽事件监听
export let containerDragEvent = {
  dragEnter(evt, workspace) {
    registry.setWorkspace(workspace);
  },
  dragOver(evt) {
  },
  dragLeave(evt) {
    delete registry.workspace;
  },
  drop(evt, dragType, nodeType, dragCoord, node) {
    if (dragType === "copy") {
      // 转换坐标 !!!书写位置有待研究
      let data = utils.convertCoord(dragCoord, registry.workspace.coord);
      // 创建节点
      node = new Node(registry.workspace, nodeType, data);
      // 缓存, map实现
      registry.workspace.nodes.set(node._number, node);
      // 缓存 weakmap实现
      Node.cache.set(node.element, node);
    }
    delete registry.workspace;
    // 如果存在, 直接返回, 如果不存在, 则创建
    return node;
  }
};