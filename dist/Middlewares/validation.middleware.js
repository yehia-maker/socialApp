"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const error_1 = require("../utils/error");
const isValid = (schema) => {
    return (req, res, next) => {
        //spread data
        const data = { ...req.body, ...req.params, ...req.query };
        const { success, error } = schema.safeParse(data);
        if (success == false) {
            let errorMessage = error?.issues.map((issue) => ({ path: issue.path[0], message: issue.message }));
            throw new error_1.BadRequestException('validation error', errorMessage);
        }
        next();
    };
};
exports.isValid = isValid;
