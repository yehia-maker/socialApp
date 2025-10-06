"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recationSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../utils/common/enum");
exports.recationSchema = new mongoose_1.Schema({
    reaction: {
        type: Number,
        enum: enum_1.Reaction,
        default: enum_1.Reaction.like
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });
