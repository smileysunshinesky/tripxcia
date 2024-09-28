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
exports.AuthRegister = exports.AuthLogin = void 0;
const auth_model_1 = require("./auth.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body.formValues;
        if (!email || !password) {
            return res.status(400).send("Email and Password are required");
        }
        const user = yield auth_model_1.AuthModel.findOne({ email, password });
        
        if (!user) {
            console.log("user")
            return res.status(404).send("User not found");
        }
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
            email: user.email,
        }, process.env.JWT || 'defaultSecret', { expiresIn: '5h' });
        yield user.updateOne({
            token: token
        });
        return res.status(200).json({
            token: token,
            user: user,
            status: "success",
            message: "Logged in successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});
exports.AuthLogin = AuthLogin;
const AuthRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Email and Password are required");
        }
        const user = yield auth_model_1.AuthModel.create(req.body);
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
            email: user.email,
        }, process.env.JWT || 'defaultsECRET', { expiresIn: '5H' });
        yield user.updateOne({
            token: token
        });
        return res.status(200).json({
            user: user,
            status: "success",
            token: token
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.AuthRegister = AuthRegister;

const AuthLogOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Clear access token and refresh token
        res.clearCookie("accessToken", { path: "/" });
        res.clearCookie("refreshToken", { path: "/" });

        res.status(200).json({
            status: "success",
            message: "Logged out successfully",
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Failed to log out",
        });
    }
});
exports.AuthLogOut = AuthLogOut;