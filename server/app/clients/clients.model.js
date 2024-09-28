"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const mongoose_1 = require("mongoose");
const ClientSchema = new mongoose_1.Schema({
    name: { type: String, required: false },
    address: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    website: { type: String, required: false },
    contactPersonNumber: { type: String, required: false },
    contactPersonEmail: { type: String, required: false },
    birthday: { type: String, required: false },
    panNumber: { type: String, required: false },
    tanNumber: { type: String, required: false },
    cinNumber: { type: String, required: false },
    gstinNumber: { type: String, required: false },
    password: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});
exports.ClientModel = (0, mongoose_1.model)('Client', ClientSchema);
