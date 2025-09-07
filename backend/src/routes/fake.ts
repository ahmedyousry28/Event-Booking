import express from "express";
import { dataController } from "../controllers";
const router = express.Router();

router.get("/generate-mock-data", dataController.generateMockData);

export default router;
