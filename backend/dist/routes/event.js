"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get("/all", controllers_1.eventController.getEvents);
router.get("/closing-soon", controllers_1.eventController.getClosingSoonEvents);
router.get("/completed", controllers_1.eventController.getCompletedEvents);
router.get("/register/:id", auth_1.default, controllers_1.eventController.registerEvent);
router.get("/favourite/:id", auth_1.default, controllers_1.eventController.favouriteEvent);
router.get("/isRegistered/:id", auth_1.default, controllers_1.eventController.CheckEvent);
exports.default = router;
