import { config } from "dotenv";
config();

export const configs = {
    host: process.env.HOST as String,
    port: Number(process.env.PORT),
    env: process.env.ENV as string,
    dbUri: process.env.MONGODB_URI as string,
    jwtSecret: process.env.JWT_SECRET as string,
    jwtRefreshSecret: process.env.JWT_SECRET as string,
    jwtExpiry: process.env.JWT_EXPIRY || "1h",
    jwtRExpiry: process.env.JWT_REFRESH_EXPIRY || "7d"
}