import { Router } from "express";
import { login, signup, logout, refreshToken } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", login)
authRouter.post("/signup", signup)
authRouter.delete("/logout", logout)
authRouter.post("/refresh-token", refreshToken);


export default authRouter
