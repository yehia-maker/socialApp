"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const comment_schema_1 = require("./comment.schema");
exports.Comment = mongoose_1.default.model('Comment', comment_schema_1.commentSchema);
