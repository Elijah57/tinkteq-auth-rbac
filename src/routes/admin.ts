import { Router } from "express";
import { getAllUsers } from "../controllers/adminController";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware";

const adminRouter = Router();

adminRouter.get("/users", isLoggedIn, isAdmin, getAllUsers);


export default adminRouter
