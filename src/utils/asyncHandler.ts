import { Request, Response, NextFunction } from "express"
type MiddlwareFunction = (request: Request, response: Response, next: NextFunction) => Promise<any> | void

const asyncHandler = (fn: MiddlwareFunction )=>{
    return async(req: Request, res: Response, next: NextFunction)=>{
        try{
            await fn(req, res, next)
        }catch(err){
            console.log(`Error: ${err}`)
        }
    }
}

export default asyncHandler