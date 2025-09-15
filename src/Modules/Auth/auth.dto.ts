import { Gender } from "../../Utils/Common";

//DTO data to obj
export interface RegisterDto{
        fullName:string,
        email:string,
        password:string,
        gender:Gender,
        phoneNumber?:string,
       
}