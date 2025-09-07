import express from "express";
import { userController } from "../controllers";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/events", authMiddleware, userController.getUserEvents);
router.get("/favourites", authMiddleware, userController.getUserFavourites);

export default router;
