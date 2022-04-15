import {NextFunction, Request, Response } from 'express'
import HttpException from '@/utils/exceptions/http.exception'
import { stat } from 'fs'

function ErrorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
): void{
    const status = error.status || 500
    const message = error.message || "somethings went wrong"
    res.status(status).send({
        status,
        message
    })
}
export default ErrorMiddleware
