import { ProjectionType, RootFilterQuery } from "mongoose";
import { IUser } from "../utils/common/interface";
import { DbRepository } from "./db.repository";
import { User } from "./models/user.model";
import { QueryOptions } from "mongoose";

export class UserRepository extends DbRepository<IUser>{
    constructor(){
        super(User)
    }
    async getAllUsers(){
        return await this.model.find()
    }
}