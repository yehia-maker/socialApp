import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../../Utils/Interfaces";
import { Gender, Sys_Role, User_Agent } from "../../Utils/Common";


export const userSchema = new Schema<IUser & Document>({
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
            if (User_Agent.google) return false
            return true
        }

    },
    phoneNumber: {
        type: String,
    },
    gender: {
        type: String,
        enum: Gender,
        default: Gender.male
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
        emum: Sys_Role,
        default: Sys_Role.user
    },
     userAgent: {
        type: String,
        enum: User_Agent,
        required: function () {
            if (User_Agent.google) return false
            return true
        }

    }



}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })



    userSchema.virtual('fullName').get(function () {
        return this.firstName + " " + this.lastName
    }).set(function (value) {
        const [firstName, lastName] = value.split(" ")
        this.firstName = firstName,
            this.lastName = lastName
    })
