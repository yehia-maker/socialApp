"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestRepository = void 0;
const db_repository_1 = require("../../db.repository");
const friendRequests_model_1 = require("./friendRequests.model");
class FriendRequestRepository extends db_repository_1.DbRepository {
    constructor() {
        super(friendRequests_model_1.FriendRequest);
    }
}
exports.FriendRequestRepository = FriendRequestRepository;
