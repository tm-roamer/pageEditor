"use strict";

import { constant } from '../config.js';
import utils from '../utils.js';
import view from '../view.js';
import registry from './registry.js';

import Node from "../element/node.js";

// 节点的缩放事件监听
export default {
  resizeStart(evt, zoom) {
    registry.isResize = true;
    registry.dragZoomBar = evt.target;
    registry.node = zoom.node;
    registry.originNodeCoord = Object.assign({}, registry.node.data);
  },
  resizeOver(evt) {
    if (registry.isResize) {
      // 函数节流
      if (!utils.throttle(Date.now())) return;
      // 转换坐标
      let node = registry.node;
      let workspace = node.workspace;
      let nodeCoord = node.data;
      let originNodeCoord = registry.originNodeCoord;
      // 拖动的坐标
      let coord = {
        x: evt.pageX - workspace.coord.x,
        y: evt.pageY - workspace.coord.y
      };

      // 最小值的极限值
      let minW = workspace.option.resizeMinW;
      let minH = workspace.option.resizeMinH;
    
      // @特殊处理, 这里不可以约束最大值, E SE S方向拖动会被限制
      coord.x = utils.rangeMin(coord.x, 0);
      coord.y = utils.rangeMin(coord.y, 0);

      let type = view.attr(registry.dragZoomBar, "type");
      if (type.indexOf(constant.ZOOM_BAR_N) !== -1 ) {
        // 约束拖动的最大值
        coord.y = utils.rangeMax(coord.y, originNodeCoord.yh - minH);
        nodeCoord.y = coord.y;
        nodeCoord.h = originNodeCoord.yh - coord.y;
      }
      if (type.indexOf(constant.ZOOM_BAR_E) !== -1 ) {
        nodeCoord.w = coord.x - originNodeCoord.x;
      }
      if (type.indexOf(constant.ZOOM_BAR_S) !== -1 ) {
        nodeCoord.h = coord.y - originNodeCoord.y;
      }
      if (type.indexOf(constant.ZOOM_BAR_W) !== -1 ) {
        // 约束拖动的最大值
        coord.x = utils.rangeMax(coord.x, originNodeCoord.xw - minW);
        nodeCoord.x = coord.x;
        nodeCoord.w = originNodeCoord.xw - coord.x;
      }

      //最大值极限值
      let maxW = workspace.coord.w - nodeCoord.x;
      let maxH = workspace.coord.h - nodeCoord.y;
      // console.log('----',nodeCoord.x, nodeCoord.w, maxW, maxH);

      // @特殊处理 最大值是为了控制反方向拖动
      nodeCoord.x = utils.rangeMax(nodeCoord.x, originNodeCoord.xw - minW);
      nodeCoord.y = utils.rangeMax(nodeCoord.y, originNodeCoord.yh - minH);
      nodeCoord.w = utils.range(nodeCoord.w, minW, maxW);
      nodeCoord.h = utils.range(nodeCoord.h, minH, maxH);

      node.style();
      node.zoom.move(nodeCoord);
    }
  },
  resizeEnd(evt) {
    if (registry.isResize) {
      // 保存修改
      registry.node.update();
    }
    delete registry.isResize;
    delete registry.node;
    delete registry.dragZoomBar;
    delete registry.originNodeCoord;
  }
};