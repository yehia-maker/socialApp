"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Agent = exports.Sys_Role = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["male"] = "male";
    Gender["female"] = "female";
})(Gender || (exports.Gender = Gender = {}));
var Sys_Role;
(function (Sys_Role) {
    Sys_Role["user"] = "user";
    Sys_Role["admin"] = "admin";
})(Sys_Role || (exports.Sys_Role = Sys_Role = {}));
var User_Agent;
(function (User_Agent) {
    User_Agent["local"] = "local";
    User_Agent["google"] = "google";
})(User_Agent || (exports.User_Agent = User_Agent = {}));
