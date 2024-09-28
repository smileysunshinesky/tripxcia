"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = __importStar(require("express"));
const query_routes_1 = require("./app/query/query.routes");
const client_routes_1 = require("./app/clients/client.routes");
const vendor_routes_1 = require("./app/vendor/vendor.routes");
const auth_routes_1 = require("./app/auth/auth.routes");
const middleware_controller_1 = require("./app/middleware/middleware.controller");
const app = (0, express_1.Router)();
exports.Router = app;
app.use('/query', middleware_controller_1.MiddlewareController, query_routes_1.QueryRoutes);
app.use('/clients', middleware_controller_1.MiddlewareController, client_routes_1.clientRouter);
app.use('/vendors', middleware_controller_1.MiddlewareController, vendor_routes_1.VendorRoutes);
app.use('/auth', auth_routes_1.AuthRoutes);
app.get('/logs', middleware_controller_1.MiddlewareLog);
app.use('/server', express_1.default.static('public'));
app.get("/", (req, res) => {
    res.send("Backend is running");
});