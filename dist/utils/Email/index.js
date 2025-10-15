"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendMail(mailOptions) {
    // create transporter
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'yehiaahmedd632@gmail.com',
            pass: "tpej zsef hcri gxpa"
        }
    });
    mailOptions.from = "'saraha app'<yehiaahmedd109@gmail.com>";
    await transporter.sendMail(mailOptions);
}
