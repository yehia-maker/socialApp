"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validation_1 = require("./auth.validation");
const auth_service_1 = __importDefault(require("./auth.service"));
const validation_middleware_1 = require("../../Middlewares/validation.middleware");
const router = (0, express_1.Router)();
router.post('/register', (0, validation_middleware_1.isValid)(auth_validation_1.registerSchema), auth_service_1.default.register);
router.post('/verify-account', auth_service_1.default.verifyAccount);
exports.default = router;
