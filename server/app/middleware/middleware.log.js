"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessLogsModel = void 0;
const mongoose_1 = require("mongoose");
const AccessLogsSchema = new mongoose_1.Schema({
    method: { type: String, required: false },
    userId: { type: String, required: false },
    url: { type: String, required: false },
    clientIp: { type: String, required: false },
    clientPlatform: { type: String, required: false },
    status: { type: Number, required: false },
    message: { type: String, required: false },
    timestamp: { type: String, required: false },
});
exports.AccessLogsModel = (0, mongoose_1.model)("AccessLogs", AccessLogsSchema);
