import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

declare module "express" {
  export interface Request {
    userId?: string;
  }
}
const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
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
    const decoded = jwt.verify(token, secretKey) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(402).json({ error: "Invalid or expired token." });
  }
};

export default authMiddleware;
