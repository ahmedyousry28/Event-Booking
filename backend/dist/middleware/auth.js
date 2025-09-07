"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const secretKey = process.env.JWT_ACCESS_SECRET;
    if (!secretKey) {
        throw new Error("JWT_SECRET is missing.");
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(402).json({ error: "Access denied. No token provided." });
        return;
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(402).json({ error: "Invalid or expired token." });
    }
};
exports.default = authMiddleware;
