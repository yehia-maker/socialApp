"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const db_repository_1 = require("./db.repository");
const user_model_1 = require("./models/user.model");
class UserRepository extends db_repository_1.DbRepository {
    constructor() {
        super(user_model_1.User);
    }
    async getAllUsers() {
        return await this.model.find();
    }
}
exports.UserRepository = UserRepository;
