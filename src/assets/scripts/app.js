/**
 * 页面编辑器的应用对象
 */
; (function (root, fun) {
  if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    module.exports = fun();
  } else if (typeof define === 'function'
    && (typeof define.amd === 'object' || typeof define.cmd === 'object')) {
    define(fun);
  } else {
    root.app = fun();
  }
})(this, function (app) {

  app = {
    structure: {
      nav: null,
      tool: null,
      component: null,
      workspace: null,
      config: null,
      status: null
    },
    component: {},
    mountNode(setting) {
      app.structure.config.$data.setting = setting;
    },
    unmountNode() {
      app.structure.config.$data.setting = {};
    }
  }

  window.a = {
    data: {
      x: 2,
      y: 5
    }
  }

  window.proxy = new Proxy(
    // {
    //   a: 1,
    //   b: [2, 3]
    // },
    a.data,
    {
      get(target, name) {
        console.log(target, name);
        return target[name];
      },
      set(target, name, value) {
        console.log(target, name, value);
      }
    }
  );

  return app;
});