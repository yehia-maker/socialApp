"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const Token_1 = require("../utils/Token");
const user_repository_1 = require("../DB/user.repository");
const isAuthenticated = () => {
    return async (req, res, next) => {
        // check token existence
        //verify token 
        const { token } = req.headers;
        // if (!token) throw new BadRequestException('please login first..')
        const payload = await (0, Token_1.verifyToken)(token);
        console.log(payload);
        //check user existence 
        const userRepo = new user_repository_1.UserRepository();
        const user = await userRepo.exist({ _id: payload._id });
        req.user = user;
        next();
    };
};
exports.isAuthenticated = isAuthenticated;
