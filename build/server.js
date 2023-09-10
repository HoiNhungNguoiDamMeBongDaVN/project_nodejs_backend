"use strict";

var _express = _interopRequireDefault(require("express"));
var _viewEngines = _interopRequireDefault(require("./config/viewEngines"));
var _web = _interopRequireDefault(require("./router/web"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _connectDB = _interopRequireDefault(require("./config/connectDB"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require('dotenv').config();
var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: true,
  credentials: true
}));
var port = process.env.PORT || 8080;
app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
app.use(_bodyParser["default"].urlencoded({
  limit: "50mb",
  extended: true
}));

//setup view engine
(0, _viewEngines["default"])(app);

//init router
(0, _web["default"])(app);
(0, _connectDB["default"])();
try {
  app.listen(port, function () {
    console.log("Server started with port ", port);
  });
} catch (error) {
  console.error("Error starting the server:", error);
}

// Add a catch block to handle promise rejections
process.on('unhandledRejection', function (reason, promise) {
  console.error('Unhandled Rejection at:', promise);
  // Handle the rejection here, such as logging or throwing an error
});