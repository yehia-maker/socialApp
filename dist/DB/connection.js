"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = dbConnection;
const mongoose_1 = __importDefault(require("mongoose"));
function dbConnection() {
    mongoose_1.default.connect('mongodb://127.0.0.1:27017/socialApp2')
        .then(() => {
        console.log('db connected successfuly');
    }).catch(() => {
        console.log('errror conecting to db');
    });
}
