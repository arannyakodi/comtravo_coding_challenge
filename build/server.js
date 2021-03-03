"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Controller_1 = require("./controllers/Controller");
var config_1 = require("./config/config");
var app = express();
var controller = new Controller_1.Controller();
app.get('/', controller.get.bind(controller));
app.listen(config_1.PORT, function () {
    console.log("Listening to port : " + config_1.PORT);
});
