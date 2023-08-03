import { Router } from "express";
import { register, login, logout, profile, verifyToken } from "../controllers/auth.controller.js";
import { validateToken } from "../middlewares/validatorToken.js"
import { validateSchema } from "../middlewares/validatorSchema.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", validateToken, logout);

router.get("/verify", verifyToken);
router.get("/profile", validateToken, profile);


export default router;  