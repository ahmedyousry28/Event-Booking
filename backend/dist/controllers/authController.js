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
exports.login = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../utils/token");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                error: "This email address is already registered!",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        const accessToken = (0, token_1.generateAccessToken)(user._id);
        return res.status(201).json({
            message: "Signed up successfully",
            accessToken,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                favEvents: user.favEvents,
                regEvents: user.regEvents,
            },
        });
    }
    catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password.",
            });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid email or password.",
            });
        }
        const accessToken = (0, token_1.generateAccessToken)(user._id);
        res.json({
            message: "Logged in successfully",
            accessToken,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                favEvents: user.favEvents,
                regEvents: user.regEvents,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
