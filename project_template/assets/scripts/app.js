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
  }

  return app;
});