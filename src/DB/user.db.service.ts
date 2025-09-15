import { IUser } from "../Utils/Interfaces";
import { DbService } from "./db.service";
import { User } from "./model/user.model";

//create customized functions for User class and extends from dbservice class
export class UserService extends DbService<IUser>{
    constructor(){
        super(User)
    }
    async getAllUsers(){
        return await this.model.find()
    }
    
}