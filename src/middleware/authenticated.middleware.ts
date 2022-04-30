import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/token";
import userModel from "@/resources/models/user.model";
import Token from '@/utils/interface/token.interface'
import HttpException from "@/utils/exceptions/http.exception";
import jwt, { verify } from 'jsonwebtoken'

async function authenticated(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized"})
    }
    const accessToken = bearer.split('Bearer ')[1].trim()
    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(accessToken)

        if (payload instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ error: "Unauthorized"})
        }

        const user = await userModel.findById(payload.id)
        .select("-password")
        .exec()
        if (!user) {
            return next(new HttpException(400, "Unauthorized - Not found user"))
        }
        req.user = user
        return next()
    } catch( error: any ) {
        return next( new HttpException(401, `Unauthorized - Exception error: ${error}`))
    }
}
export default authenticated