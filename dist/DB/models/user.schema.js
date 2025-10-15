"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../utils/common/enum");
const Email_1 = require("../../utils/Email");
exports.userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    // fullName: {
    //     type: String,
    //     required: true,
    //     virtual: true
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            if (enum_1.User_Agent.google)
                return false;
            return true;
        }
    },
    phoneNumber: {
        type: String,
    },
    gender: {
        type: Number,
        enum: enum_1.Gender,
        default: enum_1.Gender.male
    },
    age: {
        type: String,
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: mongoose_1.Schema.Types.Date,
    },
    role: {
        type: Number,
        emum: enum_1.Sys_Role,
        default: enum_1.Sys_Role.user
    },
    userAgent: {
        type: Number,
        enum: enum_1.User_Agent,
        required: function () {
            if (enum_1.User_Agent.google)
                return false;
            return true;
        }
    },
    twoStepVerification: {
        type: Boolean,
        default: false
    },
    blockedUsers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }],
    requests: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }],
    friends: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        }]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.userSchema.virtual('fullName').get(function () {
    return this.firstName + " " + this.lastName;
}).set(function (value) {
    const [firstName, lastName] = value.split(" ");
    this.firstName = firstName,
        this.lastName = lastName;
});
//hoooks
exports.userSchema.pre('save', async function (next) {
    await (0, Email_1.sendMail)({
        to: this.email,
        subject: 'verfication mail',
        html: `<p>your otp is ${this.otp}</p>`
    });
});
