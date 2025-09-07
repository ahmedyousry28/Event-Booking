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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const eventSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    date: {
        type: Date,
        required: true,
        default: () => {
            const today = new Date();
            const randomDays = Math.floor(Math.random() * 60);
            today.setDate(today.getDate() + randomDays);
            return today;
        },
    },
    time: {
        type: String,
        required: true,
        default: () => {
            const hour = Math.floor(Math.random() * (21 - 9 + 1)) + 9;
            const minute = Math.random() < 0.5 ? "00" : "30";
            return `${hour.toString().padStart(2, "0")}:${minute}`;
        },
    },
    location: { type: String, required: true },
    description: { type: String, required: true },
    speakers: [{ type: String }],
    price: {
        type: Number,
        required: true,
        default: () => Math.floor(Math.random() * 800),
    },
    image: { type: String, required: true },
    capacity: {
        type: Number,
        required: true,
        default: () => Math.floor(Math.random() * (250 - 70 + 1)) + 70,
    },
    availableSpots: {
        type: Number,
        required: true,
        default: () => Math.floor(Math.random() * 60),
    },
}, { timestamps: true });
exports.Event = mongoose_1.default.model("Event", eventSchema);
