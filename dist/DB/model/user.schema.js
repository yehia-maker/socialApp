"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const Common_1 = require("../../Utils/Common");
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
    },
    password: {
        type: String,
        required: function () {
            if (Common_1.User_Agent.google)
                return false;
            return true;
        }
    },
    phoneNumber: {
        type: String,
    },
    gender: {
        type: String,
        enum: Common_1.Gender,
        default: Common_1.Gender.male
    },
    age: {
        type: String,
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: String,
    },
    role: {
        type: String,
        emum: Common_1.Sys_Role,
        default: Common_1.Sys_Role.user
    },
    userAgent: {
        type: String,
        enum: Common_1.User_Agent,
        required: function () {
            if (Common_1.User_Agent.google)
                return false;
            return true;
        }
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.userSchema.virtual('fullName').get(function () {
    return this.firstName + " " + this.lastName;
}).set(function (value) {
    const [firstName, lastName] = value.split(" ");
    this.firstName = firstName,
        this.lastName = lastName;
});
