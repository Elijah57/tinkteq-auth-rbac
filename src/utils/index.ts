import jwt from "jsonwebtoken"
import { configs } from "../configs/config"
import { IAuthPayload } from "../types"
import * as bcrypt from "bcryptjs"

export const generateAcessToken = (payload: IAuthPayload)=>{
    const jwtExpiry: string | any = configs.jwtExpiry || "1d";
    return jwt.sign( payload, configs.jwtSecret, {expiresIn: jwtExpiry})
}

export const generateRefreshToken = (payload: IAuthPayload)=>{
    const jwtExpiry: string | any = configs.jwtExpiry || "1d";
    return jwt.sign( payload, configs.jwtRefreshSecret, {expiresIn: jwtExpiry})
}

export async function comparePassword(password: string, hashPassword:string): Promise<boolean>{
    return await bcrypt.compare(password, hashPassword)
}