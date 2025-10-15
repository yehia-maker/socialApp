"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequest = void 0;
const mongoose_1 = require("mongoose");
const friendRequests_schema_1 = require("./friendRequests.schema");
// Export the model
exports.FriendRequest = (0, mongoose_1.model)("FriendRequest", friendRequests_schema_1.friendRequestSchema);
