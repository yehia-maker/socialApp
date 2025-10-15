"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Reaction = exports.User_Agent = exports.Sys_Role = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
})(Gender || (exports.Gender = Gender = {}));
var Sys_Role;
(function (Sys_Role) {
    Sys_Role[Sys_Role["user"] = 0] = "user";
    Sys_Role[Sys_Role["admin"] = 1] = "admin";
})(Sys_Role || (exports.Sys_Role = Sys_Role = {}));
var User_Agent;
(function (User_Agent) {
    User_Agent[User_Agent["local"] = 0] = "local";
    User_Agent[User_Agent["google"] = 1] = "google";
})(User_Agent || (exports.User_Agent = User_Agent = {}));
var Reaction;
(function (Reaction) {
    Reaction[Reaction["like"] = 0] = "like";
    Reaction[Reaction["care"] = 1] = "care";
    Reaction[Reaction["sad"] = 2] = "sad";
    Reaction[Reaction["angry"] = 3] = "angry";
    Reaction[Reaction["haha"] = 4] = "haha";
})(Reaction || (exports.Reaction = Reaction = {}));
var Status;
(function (Status) {
    Status[Status["pending"] = 0] = "pending";
    Status[Status["accepted"] = 1] = "accepted";
    Status[Status["rejected"] = 2] = "rejected";
})(Status || (exports.Status = Status = {}));
