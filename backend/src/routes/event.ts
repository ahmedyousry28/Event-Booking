import express from "express";
import { eventController } from "../controllers";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/all", eventController.getEvents);
router.get("/closing-soon", eventController.getClosingSoonEvents);
router.get("/completed", eventController.getCompletedEvents);
router.get("/details/:id", eventController.getEventDetails);
router.get("/register/:id", authMiddleware, eventController.registerEvent);
router.get("/favourite/:id", authMiddleware, eventController.favouriteEvent);
router.get("/isRegistered/:id", authMiddleware, eventController.CheckEvent);

export default router;
