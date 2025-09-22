export interface RegisterDTO{
    fullName:string,
    email:string,
    password:string,
    gender:string,
    phoneNumber?:string,
}

export interface VerificationDTO{
    email:string,
    otp:string
}