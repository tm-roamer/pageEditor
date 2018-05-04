"use strict";

import Cache from '../cache.js';

/**
 * 循环遍历 事件名
 * @param {*} names 
 * @param {*} callback 
 */
function forEachNames(names, callback) {
  // 支持多事件名称
  let nameList = names.split(/[\,\s]/);
  for (let k of nameList) {
    let name = k.trim();
    name && callback(name, event.listeners);
  }
}

let event = {
  init() {
    this.listeners = new Cache();
    return {
      on: this.on,
      off: this.off,
      emit: this.emit
    };
  },
  on(names, callback) {
    forEachNames(names, (name, listeners) => {
      if (!listeners.has(name)) {
        listeners.set(name, []);
      }
      listeners.get(name).push(callback);
    });
  },
  off(names, callback) {
    forEachNames(names, (name, listeners) => {
      listeners.delete(name);
    });
  },
  emit(names, ...params) {
    forEachNames(names, (name, listeners) => {
      let arr = listeners.get(name);
      for (let ck of arr) {
        ck.apply(ck, params);
      }
    });
  }
}

export default event;