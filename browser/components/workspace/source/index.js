"use strict";

import event from "./event/event.js";
import mouseEvent from './event/mouseEvent.js';
import Workspace from "./workspace.js";


mouseEvent.init();

Object.assign(Workspace, event.init());

// 使用ES6模块
if (this === undefined) {
  // == export default Workspace;
  window.Workspace = Workspace;
}