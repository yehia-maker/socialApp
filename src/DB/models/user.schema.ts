import { Schema } from "mongoose";
import { Gender, Sys_Role, User_Agent } from "../../utils/common/enum";
import { IUser } from "../../utils/common/interface";
import { Document } from "mongoose";
import { sendMail } from "../../utils/Email";

export const userSchema = new Schema<IUser>({
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
            if (User_Agent.google) return false
            return true
        }

    },
    phoneNumber: {
        type: String,
    },
    gender: {
        type: Number,
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
        type: Schema.Types.Date,
    },
    role: {
        type: Number,
        emum: Sys_Role,
        default: Sys_Role.user
    },
    userAgent: {
        type: Number,
        enum: User_Agent,
        required: function () {
            if (User_Agent.google) return false
            return true
        }
    },
    twoStepVerification: {
        type: Boolean,
        default: false
    },
    blockedUsers:[{
        type:Schema.Types.ObjectId,
        ref: "User"
    }],
     requests:[{
        type:Schema.Types.ObjectId,
        ref: "User"
    }],
     friends:[{
        type:Schema.Types.ObjectId,
        ref: "User"
    }]





}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })


userSchema.virtual('fullName').get(function () {
    return this.firstName + " " + this.lastName
}).set(function (value) {
    const [firstName, lastName] = value.split(" ")
    this.firstName = firstName,
        this.lastName = lastName
})



//hoooks
userSchema.pre('save', async function (next) {

    await sendMail({
        to: this.email,
        subject: 'verfication mail',
        html: `<p>your otp is ${this.otp}</p>`
    })

})