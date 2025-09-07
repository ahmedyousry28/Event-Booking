import { Router } from "express";
import authRoutes from "./auth";
import fakeRoutes from "./fake";
import eventRoutes from "./event";
import userRoutes from "./user";
const router = Router();

router.use("/auth", authRoutes);
router.use("/fake", fakeRoutes);
router.use("/event", eventRoutes);
router.use("/user", userRoutes);
export default router;
