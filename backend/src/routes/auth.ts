import express from "express";
import { authController } from "../controllers";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../validation";

const router = express.Router();

router.post("/signup", validate(registerSchema), authController.signUp);
router.post("/login", validate(loginSchema), authController.login);

export default router;
