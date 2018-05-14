"use strict";

import { constant } from "../config.js";
import Cache from '../cache.js';
import view from '../view.js'
import utils from '../utils.js'

class Node {
  constructor(workspace, nodeType, coord) {
    this._number = Node.number;
    this.workspace = workspace;
    this.data = this.setData(coord, nodeType);
    this.element = this.createElement();
    this.style();
  }
  destroy() {
    // !!! 需要补充注销方法
  }
  setData(coord, nodeType) {
    let data = Object.assign({}, coord);
    data.layer = Node.layer;
    data.nodeType = nodeType;
    return utils.setCoord(data);
  }
  getData() {
    return this.data;
  }
  createElement() {
    let dragType = "move";
    let element = this._createNode(this._number, this.data.nodeType, dragType);
    this.workspace.container.appendChild(element);
    return element;
  }
  _createNode(number, nodeType, dragType) {
    let self = this;
    let ele = document.createElement("div");
    ele.classList.add(constant.WORKSPACE_NODE);
    view.attr(ele, constant.NODE_NUMBER, number);
    view.attr(ele, constant.DRAG_TYPE, dragType);
    let part = nodeType.split("-").join("/");
    let id = nodeType + '-' + number;
    // 加载组件
    $(ele).load('/template/' + part + '/' + id, function (res, status, xhr) {
      self.component = app.component[id];
      app.component[id].node = self;
    });
    return ele;
  }
  // 修改节点拖拽状态
  changeDragType(type) {
    // 改变data
    // 改变dom
    // view.attr(this, )
  }
  style() {
    view.style(this.element, {
      "top": this.data.y + "px",
      "left": this.data.x + "px",
      "width": this.data.w + "px",
      "height": this.data.h + "px",
      "z-index": this.data.layer
    });
  }
  update(coord) {
    utils.setCoord(this.data, coord);
    this.style();
  }
  render() {

  }
  refresh() {

  }
  onAdd() {

  }
  onDelete() {

  }
  onEdit() {

  }
}

// 初始每个节点的编号和层级
let _number = 1;
let _layer = 1;

// 初始化缓存
Node.cache = new Cache(true);

Object.defineProperties(Node, {
  number: {
    configurable: false,    // 不可以删除
    enumerable: true,       // 可以枚举
    get: function () {
      return _number++
    }
  },
  layer: {
    configurable: false,    // 不可以删除
    enumerable: true,       // 可以枚举
    get: function () {
      return _layer++
    }
  }
});

export default Node;