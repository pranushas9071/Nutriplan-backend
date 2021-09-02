"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetails = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var dogSchema = new Schema({
    username: { type: Schema.Types.String, index: true },
    email: { type: Schema.Types.String, index: true },
    password: { type: Schema.Types.String },
}, { strict: true });
dogSchema.index({ email: 1 }, { unique: true });
dogSchema.index({ username: 1 }, { unique: true });
exports.UserDetails = mongoose_1.default.model("UserDetail", dogSchema, "UserDetail");
