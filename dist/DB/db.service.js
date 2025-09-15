"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbService = void 0;
// we made it generic so can be usable for all classes and made it base class to prevent taking new instance from it
class DbService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(item) {
        //take a new instance of the class and save it 
        const doc = new this.model(item);
        return await doc.save();
    }
    async exist(filter, projection, options) {
        return await this.model.findOne(filter, projection, options);
    }
}
exports.DbService = DbService;
