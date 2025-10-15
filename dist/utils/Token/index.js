"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function generateToken({ payload, secretKey = 'mysecretkey', options }) {
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
}
async function verifyToken(token, secretKey = 'mysecretkey') {
    return jsonwebtoken_1.default.verify(token, secretKey);
}
