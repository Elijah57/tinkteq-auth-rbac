import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import { generateAcessToken, generateRefreshToken } from "../utils";
import User from "../models/userModel";
import { BadRequest, Conflict, ResourceNotFound, UnAuthorized } from "../middlewares/errorMiddleware";
import { comparePassword } from "../utils";
import { IAuthPayload } from "../types";
import { configs } from "../configs/config";
import jwt from "jsonwebtoken";


export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{

    const { email, password } = req.body;
    if(!email || !password) return next(new BadRequest("Email and Password are required"))

    const user = await User.findOne({email: email})

    if(!user) return next(new ResourceNotFound("User not found"));
    
    const isMatched = await comparePassword(password, user.password_hash);
    if(!isMatched) return next(new BadRequest("Invalid credentials"))

    const payload: IAuthPayload = { userId: user._id, role: user.role}
    const accessToken = generateAcessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: configs.env === "PROD",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }).json({
        status: true,
        accessToken,
        message:"Login successful"
    })
})

// creating a simplified signup controller, to simply user signup
export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    const { firstname, lastname, phone, role, email, password} = req.body;
    if(!firstname || !lastname || !phone || !email || !password ) return next( new BadRequest("All fields are required"))
    
    const user = await User.findOne({ email: email})
    if(user) return next(new Conflict("user with this email already exist"))

    const newUser = await User.create({ 
        firstname: firstname, 
        lastname: lastname,
        phone: phone,
        email: email,
        role: role,
        password_hash: password
     })
    await newUser.save()

    res.status(201).json({
        status: true,
        message: `user created successfully`
    })
})

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: configs.env === "PROD",
    }).json({
        status: true,
        message: "Logged out successfully"
    })
})

export const refreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return next(new UnAuthorized("Refresh token not found, Please login to continue"))
    
    const decode = jwt.verify(refreshToken, configs.jwtRefreshSecret) as IAuthPayload
    const user = await User.findById(decode.userId)
    if(!user) return next(new ResourceNotFound("User not found"))
    
    const newAccessToken = generateAcessToken({userId: user._id, role: user.role})
    res.json({
        status: true,
        accessToken: newAccessToken
    })
})
