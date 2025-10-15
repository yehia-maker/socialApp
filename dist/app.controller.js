"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrap = Bootstrap;
const connection_1 = require("./DB/connection");
const auth_controller_1 = __importDefault(require("./modules/Auth/auth.controller"));
const post_controller_1 = __importDefault(require("./modules/Post/post.controller"));
const user_controller_1 = __importDefault(require("./modules/User/user.controller"));
function Bootstrap(app, express) {
    //db connection
    (0, connection_1.dbConnection)();
    //app.use
    app.use(express.json());
    app.use('/auth', auth_controller_1.default);
    app.use('/post', post_controller_1.default);
    app.use('/user', user_controller_1.default);
    //global error handler
    app.use((error, req, res, next) => {
        return res.status(error.statusCode || 500)
            .json({
            message: error.message,
            sucess: false,
            errorDetails: error.errorDetails
        });
    });
}
