import { Request, Response, NextFunction } from "express";
import { configs } from "../configs/config";

class HttpError extends Error {
    statusCode: number

    constructor(statusCode: number, message: string){
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}

export class BadRequest extends HttpError{
    constructor(message: string){
        super(400, message)
    }
}

export class UnAuthorized extends HttpError{
    constructor(message: string){
        super(401, message)
    }
}


export class Forbidden extends HttpError{
    constructor(message: string){
        super(403, message)
    }
}

export class ResourceNotFound extends HttpError{
    constructor(message: string){
        super(404, message)
    }
}


export class Conflict extends HttpError{
    constructor(message: string){
        super(409, message)
    }
}

export class ServerError extends HttpError{
    constructor(message: string){
        super(500, message)
    }
}
export const routeNotFound = (req: Request, res: Response, next: NextFunction)=>{
    const message = `Route not Found: ${req.originalUrl}`;
    res.status(404).json({status: false, message})
}


export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message
    const cleanedMessage = message.replace(/"/g, "")

    res.status(statusCode).json({
        status: false,
        message: cleanedMessage,
        stack: configs.env === "PROD" ? "": err.stack
    })
}