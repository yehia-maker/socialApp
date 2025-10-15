import { MongooseBaseQueryOptions, MongooseUpdateQueryOptions, UpdateQuery } from "mongoose";
import { User } from "./models/user.model";
import { Document, Model, ProjectionType, QueryOptions, RootFilterQuery } from "mongoose";
import { ObjectId } from "mongoose";

//generic function around all the application
export abstract class DbRepository<T> {
    constructor(protected model: Model<T>) { }
    async create(item: Partial<T>) {
        const doc = new this.model(item)
        return await doc.save()
    }
    async exist(filter: RootFilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
        return await this.model.findOne(filter, projection, options)
    }
    async update(
        filter: RootFilterQuery<T>,
        update: UpdateQuery<T>,
        options?: MongooseUpdateQueryOptions<T>
    ) {
        return await this.model.updateOne(filter, update, options)
    }
    async getOne(filter: RootFilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
        return await this.model.findOne(filter, projection, options)
    }
     async getAll(filter: RootFilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
        return await this.model.find(filter, projection, options)
    }
    async deleteOne(filter: RootFilterQuery<T>,options?:MongooseBaseQueryOptions<T>){
        return await this.model.deleteOne(filter,options)
    }
     async findbyIdAndUpdate(id?: ObjectId | any,update?: UpdateQuery<T>,options?: QueryOptions<T>){
        return await this.model.findByIdAndUpdate(id,update,options)
    }

    //  update?: UpdateQuery<T>, options?: QueryOptions<T>): Query<IfAny<T,

}