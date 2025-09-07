"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const fake_1 = __importDefault(require("./fake"));
const event_1 = __importDefault(require("./event"));
const user_1 = __importDefault(require("./user"));
const router = (0, express_1.Router)();
router.use("/auth", auth_1.default);
router.use("/fake", fake_1.default);
router.use("/event", event_1.default);
router.use("/user", user_1.default);
exports.default = router;
