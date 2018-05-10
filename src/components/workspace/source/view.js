"use strict";

import { constant } from "./config.js";

export default {
  element(el) {
    let element;
    if (!el)
      throw new Error("workspace selector invalid");
    if (typeof el === "string") {
      element = document.querySelector(el);
      if (!element)
        throw new Error("workspace no selector can be found");
    } else if (el instanceof HTMLElement) {
      return el;
    }
    return element;
  },
  repeat(el) {
    return !!Object.is(this.container, el)
  },
  attr(...args) {
    if (args.length === 3) {
      args[0].setAttribute(args[1], args[2]);
    
    } else if (args.length === 2 && typeof args[1] === "object") {
      for(let k in args[1]) {
        args[0].setAttribute(k, args[1][k]);
      }
    } else {
      let val = args[0].getAttribute(args[1]);
      // String or Number
      return !Number.isNaN(val * 1) ? val * 1 : val;
    }
  },
  style(...args) {
    if (args.length === 3) {
      args[0].style.cssText += args[1] + ':' + args[2] + ';';
    
    } else if (args.length === 2 && typeof args[1] === "object") {
      for(let k in args[1]) {
        args[0].style.cssText += k + ':' + args[1][k] + ';';
      }
    } else {
      return window.getComputedStyle(args[0])[args[1]];
    }
  },
  up(node, className) {
    // 向上递归到顶就停
    if (!node || node === document.body || node === document) return undefined;
    if (node.classList.contains(className)) return node;
    return this.up(node.parentNode, className);
  },
  down(node, className) {
    return node.querySelector("." + className);
  },
  createDragNode() {
    let ele = document.createElement("div");
    ele.classList.add(constant.WORKSPACE_NODE, constant.DRAG_IMAGE, constant.DRAG_IMAGE_HIDE);
    return ele;
  },
  createContextMenu(conf) {
    let frag = document.createDocumentFragment();
    let ele = document.createElement('div');
    ele.classList.add(constant.WORKSPACE_CONTEXTMENU);
    ele.innerHTML = this.createContextMenuTpl(conf);
    frag.appendChild(ele);
    document.body.appendChild(frag.children[0]);
    return ele;
  },
  createContextMenuTpl(conf) {
    let tpl = ``;
    if (conf && conf.length > 0) {
      for (let obj of conf) {
        if (obj.state === constant.CONTEXTMENU_ITEM_STATE_SUBMENU) {
          tpl += this.createContextSubMenuItem(obj);
        } else {
          tpl += this.createContextMenuItem(obj);
        }
      }
    }
    return tpl;
  },
  createContextMenuItem(item) {
    return `
        <div class="contextmenu-item contextmenu-item-${item.state || item.type}"
             ${item.eventKey ? 'event-key="' + item.eventKey + '"' : ''}">
          ${item.text || ''}
        </div>
    `;
  },
  createContextSubMenuItem(item) {
    return `
        <div class="contextmenu-item">
          ${item.text}
          <i class="contextmenu-item-arrow"></i>
          <div class="workspace-contextmenu contextmenu-item-${item.state}">
            ${this.createContextMenuTpl(item.subMenu)}
          </div>
        </div>
    `;
  },
  removeContextMenu(ele) {
    document.body.removeChild(ele);
  },
  
  // 清除
  clear() {

  },
  // 渲染
  render(nodes, attention, ctx) {

  },
  // 初始化
  init() {

  }
}