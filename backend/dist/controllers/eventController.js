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
exports.CheckEvent = exports.favouriteEvent = exports.registerEvent = exports.getCompletedEvents = exports.getClosingSoonEvents = exports.getEvents = void 0;
const event_1 = require("../models/event");
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_1.Event.find();
        res.json({ message: "Events fetched successfully", events });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getEvents = getEvents;
const getClosingSoonEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_1.Event.find({
            $and: [
                { availableSpots: { $gt: 0, $lte: 15 } },
                { date: { $gt: new Date() } },
            ],
        });
        res.json({ message: "Events fetched successfully", events });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getClosingSoonEvents = getClosingSoonEvents;
const getCompletedEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_1.Event.find({
            $and: [{ availableSpots: { $eq: 0 } }, { date: { $gt: new Date() } }],
        });
        res.json({ message: "Events fetched successfully", events });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCompletedEvents = getCompletedEvents;
const registerEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const registeredEvent = yield user_1.default.findOne({
            _id: userId,
            regEvents: req.params.id,
        });
        if (registeredEvent) {
            yield user_1.default.findByIdAndUpdate(userId, {
                $pull: { regEvents: req.params.id },
            });
            yield event_1.Event.findByIdAndUpdate(req.params.id, {
                $inc: { availableSpots: 1 },
            });
            return res
                .status(200)
                .json({ message: "Event unregistered successfully" });
        }
        else {
            yield user_1.default.findByIdAndUpdate(userId, {
                $addToSet: { regEvents: req.params.id },
            });
            yield event_1.Event.findByIdAndUpdate(req.params.id, {
                $inc: { availableSpots: -1 },
            });
            return res.status(200).json({ message: "Event registered successfully" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerEvent = registerEvent;
const favouriteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const favourite = yield user_1.default.findOne({
            _id: userId,
            favEvents: req.params.id,
        });
        if (favourite) {
            yield user_1.default.findByIdAndUpdate(userId, {
                $pull: { favEvents: req.params.id },
            });
            return res.status(200).json({ message: "Event removed from favourites" });
        }
        else {
            yield user_1.default.findByIdAndUpdate(userId, {
                $addToSet: { favEvents: req.params.id },
            });
            return res.status(200).json({ message: "Event added to favourites" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.favouriteEvent = favouriteEvent;
const CheckEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = yield user_1.default.findOne({ _id: userId });
        if (!user) {
            return res.status(200).json({ eventExists: false, favExists: false });
        }
        const eventId = new mongoose_1.default.Types.ObjectId(req.params.id);
        const eventExists = user.regEvents.includes(eventId);
        const favExists = user.favEvents.includes(eventId);
        return res.status(200).json({ eventExists, favExists });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.CheckEvent = CheckEvent;
