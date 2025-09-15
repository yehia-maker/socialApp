import { Document, Model, ProjectionType, QueryOptions, RootFilterQuery } from "mongoose";




// we made it generic so can be usable for all classes and made it base class to prevent taking new instance from it


export abstract class DbService <T>{
    constructor(protected model:Model<T & Document>){}

    async create(item:Partial<T>){
        //take a new instance of the class and save it 
        const doc = new this.model(item)
        return await doc.save()
    }

    async exist(filter:RootFilterQuery<T>,projection?:ProjectionType<T>,options?:QueryOptions<T>){
        return await this.model.findOne(filter,projection,options)
    }


}