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
    async getOne(filter, projection, options) {
        return await this.model.findOne(filter, projection, options);
    }
    async getAll(filter, projection, options) {
        return await this.model.find(filter, projection, options);
    }
    async deleteOne(filter, options) {
        return await this.model.deleteOne(filter, options);
    }
    async findbyIdAndUpdate(id, update, options) {
        return await this.model.findByIdAndUpdate(id, update, options);
    }
}
exports.DbRepository = DbRepository;
