import { Router } from "express";
import { getAllUsers } from "../controllers/adminController";

const adminRouter = Router();

adminRouter.get("/users", getAllUsers);


export default adminRouter
