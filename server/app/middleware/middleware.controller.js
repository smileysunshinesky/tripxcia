"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareLog = exports.MiddlewareController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_log_1 = require("./middleware.log");
const MiddlewareController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT || 'defaultSecret');
        if (!decoded) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }
        const log = {
            method: req.method,
            url: req.url,
            userId: decoded._id,
            status: 200,
            message: "Success",
            timestamp: new Date().toISOString(),
            clientIp: (_a = req.ip) !== null && _a !== void 0 ? _a : '',
            clientPlatform: req.headers['user-agent'] || ""
        };
        yield middleware_log_1.AccessLogsModel.create(log);
        next();
    }
    catch (error) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }
});
exports.MiddlewareController = MiddlewareController;
const MiddlewareLog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logs = yield middleware_log_1.AccessLogsModel.find();
        return res.status(200).json({
            logs: logs
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.MiddlewareLog = MiddlewareLog;
