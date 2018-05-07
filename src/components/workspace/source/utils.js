"use strict";

import { constant, globalConfig } from './config.js';
import view from './view.js';

export default {
  // 命名的 中横线 变换成 驼峰
  changeLine2Hump(name) {
    let words = name.split('-');
    for (let i = 1; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join('');
  },
  // 节流函数
  throttle(now) {
    let time = new Date().getTime();
    this.throttle = function (now) {
      if (now - time > constant.THROTTLE_TIME) {
        time = now;
        return true;
      }
      return false;
    };
    this.throttle(now);
  },
  /**
   * 检测矩形碰撞
   *    拖拽节点与容器的重叠面积大于scale规定的比例才认定为碰撞
   * @param n1 拖拽节点
   * @param n2 容器
   * @param inside 状态, 里面 === true, 外面 === false
   * @param scale 比例, 碰撞重叠比例
   * @return {boolean} 是否碰撞
   */
  collision(n1, n2, inside, hitScale) {
    let hit = false;
    // 离开和进入的比例相对的
    let scale = inside ? 1 - hitScale : hitScale;
    // 重叠
    if (n2.xw > n1.x && n2.x < n1.xw) {
      if (n2.yh > n1.y && n2.y < n1.yh) {
        // 默认包含
        let w = n1.w, h = n1.h;

        // 左边部分接触
        if (n1.x < n2.x)
          w = n1.xw - n2.x;
        // 右边部分接触
        if (n2.xw < n1.xw)
          w = n2.xw - n1.x;
        // 上边部分接触
        if (n1.y < n2.y)
          h = n1.yh - n2.y;
        // 下边部分接触
        if (n2.yh < n1.yh)
          h = n2.yh - n1.y;

        hit = w * h / (n1.w * n1.h) >= scale;
      }
    }
    return hit;
  },
  // 进行所有的容器的矩形碰撞
  hitContainerAll: function (nodeCoord, inside, callback) {
    let hit, workspace;
    // key === container, value === Workspace Instance
    Workspace.cache.map.forEach((value, key) => {
      if (this.collision(nodeCoord, value.coord, inside, value.option.hitScale)) {
        hit = true;
        workspace = value;
      }
    });
    callback(hit, workspace);
  },
  /**
   * 获取元素坐标
   */
  getCoord(ele, offsetX, offsetY) {
    offsetX = offsetX || document.documentElement.scrollLeft;
    offsetY = offsetY || document.documentElement.scrollTop;
    let rect = ele.getBoundingClientRect();
    return {
      x: rect.left + offsetX,
      y: rect.top + offsetY,
      w: rect.width,
      h: rect.height,
      xw: rect.left + offsetX + rect.width,
      yh: rect.top + offsetY + rect.height,
    }
  },
  /**
   * 转换坐标
   * @param {*} n1 节点
   * @param {*} n2 容器
   */
  convertCoord(n1, n2) {
    n1.x = n1.x - n2.x;
    n1.y = n1.y - n2.y;
    return this.setCoord(n1);
  },
  /**
   * 更新坐标
   * @param {*} n1 节点的旧值
   * @param {*} n2 节点的新值
   */
  setCoord(n1, n2) {
    n2 && Object.assign(n1, n2);
    n1.xw = n1.x + n1.w || 0;
    n1.yh = n1.y + n1.h || 0;
    return n1;
  },
  // 约束节点不超过容器范围
  constraint(container, node) {
    let exceed = false;
    if (node.x < 0) {
      node.x = 0;
      exceed = true;
    }
    if (node.x + node.w > container.w) {
      node.x = container.w - node.w;
      exceed = true;
    }
    if (node.y < 0) {
      node.y = 0;
      exceed = true;
    }
    if (node.y + node.h > container.h) {
      node.y = container.h - node.h;
      exceed = true;
    }
    this.setCoord(node);
    return exceed;
  },
  rangeMin(val, min) {
    if (val < min) {
      return min;
    }
    return val;
  },
  rangeMax(val, max) {
    if (val > max) {
      return max;
    }
    return val;
  },
  range(val, min, max) {
    typeof min != undefined && (val = this.rangeMin(val, min));
    typeof max != undefined && (val = this.rangeMax(val, max));
    return val;
  }
};