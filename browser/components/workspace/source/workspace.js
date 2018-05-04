"use strict";

import { constant, globalConfig } from './config.js';
import Cache from './cache.js';
import view from './view.js';
import utils from './utils.js';
import Zoom from './element/zoom.js';

class Workspace {
  constructor(options) {
    // 初始化配置
    this.option = Object.assign({}, globalConfig, options);
    // 防止重复初始化
    let container = view.element(this.option.el);
    if (Workspace.cache.has(container))
      throw new Error("workspace repeating init instance");
    // 记录位置
    this.coord = utils.getCoord(container);
    // 容器缓存 key: HTMLElement, val: Workspace Instance
    this.container = container
    Workspace.cache.set(container, this);
    // 节点缓存
    this.nodes = new Cache();
    this.container.classList.add(constant.WORKSPACE);
    // 设置编号
    this._number = Workspace._number++;
    view.attr(this.container, constant.WORKSPACE_NUMBER, this._number);

    // !!!初始化各种元素

    // dragImage;

    // contextMenu
  }
  // 是否开启编辑模式
  edit() {
    // 这里开启编辑模式, ::after遮挡所有的内部元素,防止触发事件
  }
  // 刷新所有的节点
  refresh() {
    let nodes = this.nodes;
    for (let n of nodes.list()) {
      n.update();
    }
  }
}

Workspace.cache = new Cache();
Workspace._number = 1;
Workspace.version = '1.0.0';



Workspace.instance = (...args) => {
  // 多参数 = set
  // 支持index, 和el, HTMLDivElement 三种方式
  // 单参数 = get
  // 支持index, 和el, HTMLDivElement 三种方式
}

Workspace.destroy = () => {
  // 无参数删除所有
  // 有参数 支持index和el, , HTMLDivElement 三种方式
  // !!! 容器销毁 cache也要销毁
}

export default Workspace;