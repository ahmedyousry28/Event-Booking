"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validate_1 = require("../middleware/validate");
const validation_1 = require("../validation");
const router = express_1.default.Router();
router.post("/signup", (0, validate_1.validate)(validation_1.registerSchema), controllers_1.authController.signUp);
router.post("/login", (0, validate_1.validate)(validation_1.loginSchema), controllers_1.authController.login);
exports.default = router;
