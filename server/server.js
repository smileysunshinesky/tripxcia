"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cloudinary = require('cloudinary').v2;
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const ser = "hh";
mongoose_1.default.connect(process.env.MONGO_URI);
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB");
});
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = (0, express_1.default)();
const corsOptions = {
    origin: process.env.FRONT_UTL || "http://localhost:5173",
    credentials: true
};
const accessLogStream = fs_1.default.createWriteStream("log.json", { flags: "a" });
app.use((0, morgan_1.default)("combined", { stream: accessLogStream }));
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
app.use('/', routes_1.Router);
app.listen(port, () => {
    console.log(`[server]: Server is running on: ${port}`);
});
