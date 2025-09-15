"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_db_service_1 = require("../../DB/user.db.service");
const Error_1 = require("../../Utils/Error");
const factory_1 = require("./factory");
// import * as z from "zod";
const auth_validation_1 = require("./auth.validation");
class AuthService {
    //taking new instance from user.db.service
    user = new user_db_service_1.UserService();
    authFactory = new factory_1.AuthFactory();
    constructor() { }
    register = async (req, res, next) => {
        //get data from body 
        const registerDto = req.body;
        //validation
        const { error, success } = auth_validation_1.registerSchema.safeParse(registerDto);
        if (success == false) {
            let errorMessages = error?.issues.map((issue) => ({ path: issue.path[0], message: issue.message }));
            throw new Error_1.BadRequestException('validation error', errorMessages);
        }
        // check user existence 
        const userExist = await this.user.exist({ email: registerDto.email });
        if (userExist) {
            throw new Error_1.ConflictException('user already exist');
        }
        //prepare data, use factory methods
        const userData = this.authFactory.register(registerDto);
        //create user 
        await this.user.create(userData);
        //send respone 
        return res.status(201).json({ message: "User registered successfully", data: userData });
    };
}
exports.AuthService = AuthService;
exports.default = new AuthService();
