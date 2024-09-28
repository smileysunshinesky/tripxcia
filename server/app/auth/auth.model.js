"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = void 0;
const mongoose_1 = require("mongoose");
const AuthSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { type: String, required: false },
    token: { type: String, required: false },
    createdAt: { type: String, required: false, default: new Date().toISOString() },
    updatedAt: { type: String, required: false, default: new Date().toISOString() },
});
exports.AuthModel = (0, mongoose_1.model)("Users", AuthSchema);
