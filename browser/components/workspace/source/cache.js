"use strict";

class Cache {
  constructor(weak) {
    this.map = !!weak ? new WeakMap() : new Map();
  }
  has(key) {
    return this.map.has(key);
  }
  get(key) {
    return this.map.get(key);
  }
  set(key, val) {
    this.map.set(key, val);
  }
  delete(key) {
    return this.map.delete(key);
  }
  // @特殊说明 WeakMap不可以遍历, 此方法仅针对 Map 使用
  list() {
    let arr = [];
    this.map.forEach((val, key) => {
      arr.push(val);
    });
    return arr;
  }
  destroy() {
    this.map = null;
    delete this.map;
    return true;
  }
}

export default Cache