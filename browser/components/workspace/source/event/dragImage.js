"use strict";

import { constant } from '../config.js';
import utils from '../utils.js';
import registry from './registry.js';

// 拖拽节点HTMLElement镜像
export default {
  set() {
    if (!registry.node && registry.dragType === "copy") {
      registry.dragImage.innerHTML = registry.dragElement.cloneNode(true).innerHTML;
      registry.dragImage.classList.remove(constant.DRAG_IMAGE_HIDE);

    } else if (registry.node && registry.dragType === "move") {
      registry.node.element.classList.add(constant.DRAG_IMAGE);
    }
  },
  move(evt) {
    let x = evt.pageX - registry.offsetX;
    let y = evt.pageY - registry.offsetY;
    if (!registry.node && registry.dragType === "copy") {
      registry.dragImage.style.cssText += 'top:' + y + 'px;left:' + x + 'px;';

    } else if (registry.node && registry.dragType === "move") {
      let coord = registry.node.workspace.coord;
      let tx = x - coord.x;
      let ty = y - coord.y;
      registry.node.element.style.cssText += 'top:' + ty + 'px;left:' + tx + 'px;';
    }
    // 同步更新拖拽坐标信息
    utils.setCoord(registry.dragCoord, { x, y });
  },
  hide() {
    if (!registry.node && registry.dragType === "copy") {
      registry.dragImage.style.cssText = '';
      registry.dragImage.classList.add(constant.DRAG_IMAGE_HIDE);

    } else if (registry.node && registry.dragType === "move") {
      registry.node.element.classList.remove(constant.DRAG_IMAGE);
    }
  }
};