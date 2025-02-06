import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import User from "../models/userModel";
import { ResourceNotFound } from "../middlewares/errorMiddleware";



export const getAllUsers = asyncHandler(async (req:Request, res: Response, next: NextFunction)=>{
    const users = await User.find()
    if(!users) return next( new ResourceNotFound("No user found"))
    return res.status(200).json({
        status: true,
        message: "All users",
        users: users,
    })
})