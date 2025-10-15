"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendRequestSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../utils/common/enum");
exports.friendRequestSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: Number,
        enum: enum_1.Status,
        default: 0,
    },
}, { timestamps: true });
