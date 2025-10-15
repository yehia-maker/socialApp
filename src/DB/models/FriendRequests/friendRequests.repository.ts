import { IFriendRequest } from "../../../utils/common/interface";
import { DbRepository } from "../../db.repository";
import { FriendRequest } from "./friendRequests.model";


export class FriendRequestRepository extends DbRepository<IFriendRequest> {
    constructor() {
        super(FriendRequest)
    }
}