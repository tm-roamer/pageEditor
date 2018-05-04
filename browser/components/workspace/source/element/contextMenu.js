"use strict";

import view from '../view.js';
import utils from '../utils.js';

class ContextMenu {
  constructor(target, x, y) {
    this.type = target instanceof Workspace ? "workspace" : "node";
    this.target = target;
    this.target.contextMenu = this;
    this.setData(x, y);
    this.createElement();
    this.style();
  }
  destroy() {
    this.target.contextMenu = null;
    this.removeElement();
  }
  setData(x, y) {
    this.data = {
      x: x || 0,
      y: y || 0
    };
  }
  getData() {
    return this.data;
  }
  style() {
    // !!! 当节点靠近底部的时候, 如何控制位置
    view.style(this.element, {
      "top": this.data.y + "px",
      "left": this.data.x + "px"
    });
  }
  createElement() {
    if (this.type === "node") {
      let conf = this.target.workspace.option.contextMenu.node;
      this.element = view.createContextMenu(conf);
    }
  }
  removeElement() {
    view.removeContextMenu(this.element);
  }
  upLayer(done) {
    let arr = this._sortLayer();
    if (arr.length > 1) {
      var index = this._getIndexOfLayer(arr) - 1;
      index < 0 && (index = 0);
      let node = arr[index];
      this._exchangeLayer(node)
      this._updateNodeLayer(node);
    }
    done();
  }
  downLayer(done) {
    let arr = this._sortLayer();
    if (arr.length > 1) {
      var index = this._getIndexOfLayer(arr) + 1;
      let len = arr.length - 1;
      index > len && (index = len);
      let node = arr[index];
      this._exchangeLayer(node)
      this._updateNodeLayer(node);
    }
    done();
  }
  topLayer(done) {
    let arr = this._sortLayer();
    if (arr.length > 1 ){
      let node = arr[0];
      this._exchangeLayer(node)
      this._updateNodeLayer(node);
    }
    done();
  }
  bottomLayer(done) {
    let arr = this._sortLayer();
    if (arr.length > 1) {
      let node = arr[arr.length - 1];
      this._exchangeLayer(node);
      this._updateNodeLayer(node);
    }
    done();
  }
  _updateNodeLayer(node) {
    this.target.update();
    node.update();
  }
  _getIndexOfLayer(arr) {
    let layer = this.target.data.layer;
    for (let i = 0; i < arr.length; i++)
      if (arr[i].data.layer == layer)
        return i;
  }
  _exchangeLayer(node) {
    let target = this.target;
    let tmp = target.data.layer;
    target.data.layer = node.data.layer;
    node.data.layer = tmp;
  }
  _sortLayer() {
    let arr = [];
    if (this.type === "node") {
      let nodes = this.target.workspace.nodes;
      arr = nodes.list();
      arr.sort((a, b) => {
        // 倒序, 配合图层顺序
        return b.data.layer - a.data.layer
      });
    }
    return arr;
  }
}

export default ContextMenu;