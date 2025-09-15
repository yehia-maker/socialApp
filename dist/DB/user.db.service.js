"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_service_1 = require("./db.service");
const user_model_1 = require("./model/user.model");
//create customized functions for User class and extends from dbservice class
class UserService extends db_service_1.DbService {
    constructor() {
        super(user_model_1.User);
    }
    async getAllUsers() {
        return await this.model.find();
    }
}
exports.UserService = UserService;
