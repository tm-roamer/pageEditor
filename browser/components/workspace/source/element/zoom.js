"use strict";

import view from '../view.js';
import utils from '../utils.js';
import { constant } from "../config.js";

/**
 * 缩放句柄
 */
class Zoom {
  // constructor() {
  //   this.createElement();
  //   this.enable(false);
  // }
  // set(target, coord) {
  //   this.target = target;
  //   this.target.zoom = this;
  //   this.setData(coord);
  // }
  constructor(workspace, node) {
    this.workspace = workspace;
    this.workspace.zoom = this;
    this.node = node;
    this.node.zoom = this;
    this.setData(node.data);
    this.createElement();
    this.enable(true);
  }
  destroy() {
    // @特殊处理 防止重复注销
    if (!this.workspace) return;
    this.removeElement();
    this.enable(false);
    this.workspace.zoom = null;
    this.workspace = null;
    this.node.zoom = null;
    this.node = null;
    this.element = null;
    this.data = null;
  }
  setData(coord) {
    this.data = utils.setCoord(Object.assign({}, coord));
    return this;
  }
  getData() {
    return this.data;
  }
  createElement() {
    let container = this.workspace.container;
    container.classList.add(constant.WORKSPACE_ZOOM);
    let element = this.element = {};
    let data = this.getData();
    // 边线
    element["line-top"] = this._createChild(constant.ZOOM_LINE, constant.ZOOM_LINE_TOP, data);
    element["line-left"] = this._createChild(constant.ZOOM_LINE, constant.ZOOM_LINE_LEFT, data);
    element["line-right"] = this._createChild(constant.ZOOM_LINE, constant.ZOOM_LINE_RIGHT, data);
    element["line-bottom"] = this._createChild(constant.ZOOM_LINE, constant.ZOOM_LINE_BOTTOM, data);

    // 句柄
    let offset = this.workspace.option.zoom.offset;
    data = utils.convertCoord(Object.assign({}, data), { x: offset, y: offset });
    element["bar-n"] = this._createChild(constant.ZOOM_BAR, constant.ZOOM_BAR_N, data);
    element["bar-nw"] = this._createChild(constant.ZOOM_BAR, constant.ZOOM_BAR_NW, data);
    element["bar-w"] = this._createChild(constant.ZOOM_BAR, constant.ZOOM_BAR_W, data);
    element["bar-sw"] = this._createChild(constant.ZOOM_BAR, constant.ZOOM_BAR_SW, data);
    element["bar-s"] = this._createChild(constant.ZOOM_BAR, constant.ZOOM_BAR_S, data);
    element["bar-se"] = this._createChild(constant.ZOOM_BAR, constant.ZOOM_BAR_SE, data);
    element["bar-e"] = this._createChild(constant.ZOOM_BAR, constant.ZOOM_BAR_E, data);
    element["bar-ne"] = this._createChild(constant.ZOOM_BAR, constant.ZOOM_BAR_NE, data);

    // 循环添加
    for (let k in element) {
      container.appendChild(element[k]);
    }
  }
  removeElement() {
    if (!this.workspace) return;
    let container = this.workspace.container;
    container.classList.remove(constant.WORKSPACE_ZOOM);
    let list = container.querySelectorAll('.' + constant.ZOOM_LINE + ',.' + constant.ZOOM_BAR);
    for (let e of list) {
      container.removeChild(e);
    }
  }
  _createChild(className, type, data) {
    let ele = document.createElement("div");
    ele.classList.add(className);
    view.attr(ele, {
      "type": type,
      "draggable": "false"  // @特殊处理, 防止浏览器误将小句柄拖动起来
    });
    this._style(ele, className, type, data);
    return ele;
  }
  _style(ele, className, type, data) {
    // 设置样式
    if (className === constant.ZOOM_LINE) {
      ele.style.cssText = this._computeLine(data, type);
    } else {
      ele.style.cssText = this._computeBar(data, type);
    }
  }
  _computeLine(data, type) {
    let style = ``
    switch (type) {
      case "top": style = `top:${data.y}px; left:${data.x}px; width:${data.w}px;`; break;
      case "left": style = `top:${data.y}px; left:${data.x}px; height:${data.h}px;`; break;
      case "right": style = `top:${data.y}px; left:${data.xw}px; height:${data.h}px;`; break;
      case "bottom": style = `top:${data.yh}px; left:${data.x}px; width:${data.w}px;`; break;
    }
    return style;
  }
  _computeBar(data, type) {
    let style = ``
    switch (type) {
      case "n": style = `top:${data.y}px; left:${data.x + data.w / 2}px;`; break;
      case "nw": style = `top:${data.y}px; left:${data.x}px;`; break;
      case "w": style = `top:${data.y + data.h / 2}px; left:${data.x}px;`; break;
      case "sw": style = `top:${data.y + data.h}px; left:${data.x}px;`; break;
      case "s": style = `top:${data.yh}px; left:${data.x + data.w / 2}px;`; break;
      case "se": style = `top:${data.yh}px; left:${data.xw}px;`; break;
      case "e": style = `top:${data.y + data.h / 2}px; left:${data.xw}px;`; break;
      case "ne": style = `top:${data.y}px; left:${data.xw}px;`; break;
    }
    return style;
  }
  move(coord) {
    this.setData(coord).style();
  }
  style(data = this.data) {
    let element = this.element;
    // 边线
    this._style(element["line-top"], constant.ZOOM_LINE, constant.ZOOM_LINE_TOP, data);
    this._style(element["line-left"], constant.ZOOM_LINE, constant.ZOOM_LINE_LEFT, data);
    this._style(element["line-right"], constant.ZOOM_LINE, constant.ZOOM_LINE_RIGHT, data);
    this._style(element["line-bottom"], constant.ZOOM_LINE, constant.ZOOM_LINE_BOTTOM, data);

    // 句柄
    let offset = this.workspace.option.zoom.offset;
    data = utils.convertCoord(Object.assign({}, data), { x: offset, y: offset });

    this._style(element["bar-n"], constant.ZOOM_BAR, constant.ZOOM_BAR_N, data);
    this._style(element["bar-nw"], constant.ZOOM_BAR, constant.ZOOM_BAR_NW, data);
    this._style(element["bar-w"], constant.ZOOM_BAR, constant.ZOOM_BAR_W, data);
    this._style(element["bar-sw"], constant.ZOOM_BAR, constant.ZOOM_BAR_SW, data);
    this._style(element["bar-s"], constant.ZOOM_BAR, constant.ZOOM_BAR_S, data);
    this._style(element["bar-se"], constant.ZOOM_BAR, constant.ZOOM_BAR_SE, data);
    this._style(element["bar-e"], constant.ZOOM_BAR, constant.ZOOM_BAR_E, data);
    this._style(element["bar-ne"], constant.ZOOM_BAR, constant.ZOOM_BAR_NE, data);
  }
  hide() {
    if (!this.workspace) return;
    this.workspace.container.classList.remove(constant.WORKSPACE_ZOOM);
  }
  show() {
    if (!this.workspace) return;
    this.workspace.container.classList.add(constant.WORKSPACE_ZOOM);
  }
  enable(...args) {
    if(args.length === 0) {
      return this._enable;
    } else {
      this._enable = !!args[0];
      this._enable ? this.show() : this.hide();
    }
  }
}

// !!! 一些放大缩小的计算放在这里如何呢? 

export default Zoom