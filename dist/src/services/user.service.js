"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
var models_1 = require("../models");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.addUser = function (username, email, password) {
        var data = { username: username, email: email, password: password };
        return models_1.UserDetails.insertMany([data]);
    };
    UserService.prototype.getUser = function (username) {
        if (models_1.UserDetails.find({ username: username }) == [])
            return models_1.UserDetails.find({ username: username });
        else
            return new Error("no user found");
    };
    return UserService;
}());
exports.userService = new UserService();
