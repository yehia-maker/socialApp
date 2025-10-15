export interface RegisterDTO{
    fullName:string,
    email:string,
    password:string,
    gender:Number,
    phoneNumber?:string,
}

export interface VerificationDTO{
    email:string,
    otp:string
}

export interface LoginDTO{
    email:string,
    password:string,
    twoStepVerification:boolean,
}