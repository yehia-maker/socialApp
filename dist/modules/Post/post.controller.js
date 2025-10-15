"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = __importDefault(require("../Comment/comment.controller"));
const post_service_1 = __importDefault(require("./post.service"));
const auth_middleware_1 = require("../../Middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use('/:postId/comment', comment_controller_1.default);
router.post('/create', (0, auth_middleware_1.isAuthenticated)(), post_service_1.default.create);
router.patch('/add-reaction/:id', (0, auth_middleware_1.isAuthenticated)(), post_service_1.default.addReaction);
router.get('/specific-post/:id', (0, auth_middleware_1.isAuthenticated)(), post_service_1.default.getSpecificPost);
router.delete("/:id", (0, auth_middleware_1.isAuthenticated)(), post_service_1.default.deletePost);
router.patch('/freeze/:id', (0, auth_middleware_1.isAuthenticated)(), post_service_1.default.freezePost);
router.patch('/update/:id', (0, auth_middleware_1.isAuthenticated)(), post_service_1.default.update);
exports.default = router;
