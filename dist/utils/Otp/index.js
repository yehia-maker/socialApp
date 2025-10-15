"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExpiryDate = exports.generateOTP = void 0;
const generateOTP = () => {
    const otp = Math.floor(10000 + Math.random() * 90000); // 5-digit OTP
    return otp;
};
exports.generateOTP = generateOTP;
// const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
const generateExpiryDate = (minutes = 5) => {
    return new Date(Date.now() + minutes * 60 * 1000);
    ;
};
exports.generateExpiryDate = generateExpiryDate;
