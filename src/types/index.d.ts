import { Request } from "express";
import { Types, Document } from "mongoose";

export interface IAuthRequest extends Request {
    user?: {
        userId: string | Types.ObjectId,
        role: string
    }
}

// export interface Iuser extends Document {
//     firstname: string,
//     lastname: string,
//     email: string,
//     phone: string,
//     role: string ,
//     password_hash?: string,
//     verified?: boolean
// }

export interface IAuthPayload {
    userId: string | Types.ObjectId,
    role: string
}