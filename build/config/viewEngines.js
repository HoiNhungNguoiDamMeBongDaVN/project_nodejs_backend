"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var configViewEngine = function configViewEngine(app) {
  app.use(_express["default"]["static"]('./src/public')); //noi set quyen truy cap cho trinh duyet co the xem
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};
var _default = configViewEngine;
exports["default"] = _default;