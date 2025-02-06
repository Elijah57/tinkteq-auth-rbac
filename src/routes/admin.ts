import { Router } from "express";
import { getAllUsers } from "../controllers/adminController";

const adminRouter = Router();

adminRouter.post("/users", getAllUsers);


export default adminRouter
