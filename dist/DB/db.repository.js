"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbRepository = void 0;
//generic function around all the application
class DbRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(item) {
        const doc = new this.model(item);
        return await doc.save();
    }
    async exist(filter, projection, options) {
        return await this.model.findOne(filter, projection, options);
    }
    async update(filter, update, options) {
        return await this.model.updateOne(filter, update, options);
    }
}
exports.DbRepository = DbRepository;
