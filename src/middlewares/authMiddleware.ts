import { NextFunction, Request, Response,  } from "express";
import jwt from "jsonwebtoken";
import { configs } from "../configs/config";
import { IAuthPayload, IAuthRequest } from "../types";
import { Forbidden, UnAuthorized, ServerError } from "./errorMiddleware";

export const isLoggedIn = async (req: IAuthRequest, res: Response, next: NextFunction)=>{

    const token = req.headers.authorization?.split(" ")[1];
    if(!token) next( new UnAuthorized("unauthorized, please login to continue"))

    try {
        const decode = jwt.verify(token, configs.jwtSecret) as IAuthPayload
        req.user = {
            userId: decode.userId,
            role: decode.role
        } 
        next();
    }
    catch (error: any) {
        if (error.name === 'TokenExpiredError') next(new UnAuthorized("Token has expired, please login again" ));
        else if (error.name === 'JsonWebTokenError') next(new UnAuthorized("Invalid token, please login again"));
        else { next (new ServerError("Internal server error"));}
    }
}


export const isAdmin = async (req: IAuthRequest, res: Response, next: NextFunction)=>{
    if(req.user && req.user.role === "admin"){
        next()
    }else{
        next(new Forbidden("Access Restricted to admin only"))
    }
}

export const isCarrier = async (req: IAuthRequest, res: Response, next: NextFunction)=>{
    if(req.user && req.user.role === "carrier"){
        next()
    }else{
        next(new Forbidden("Access Restricted to carrier only"))
    }
}

export const isShipper = async (req: IAuthRequest, res: Response, next: NextFunction)=>{
    if(req.user && req.user.role === "shipper"){
        next()
    }else{
        next(new Forbidden("Access Restricted to shipper only"))
    }
}

export const hasRole = (...allowedRoles: string[]) => {
    return (req: IAuthRequest, res: Response, next: NextFunction) => {
        if (!allowedRoles.includes(req.user?.role)) {
            return next( new Forbidden('Access denied. You do not have the required permissions.'))
        }
        next();
    };
};