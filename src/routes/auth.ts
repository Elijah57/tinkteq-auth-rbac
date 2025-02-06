import { Router } from "express";
import { login, signup, logout } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", login)
authRouter.post("/signup", signup)
authRouter.delete("/logout", logout)


export default authRouter
