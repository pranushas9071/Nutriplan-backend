"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var controllers_1 = require("../controllers");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/addUser", controllers_1.userController.addUser);
exports.userRouter.get("/getUser", controllers_1.userController.getUser);
