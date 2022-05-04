import { Router, Request, Response, NextFunction } from 'express'
import Controller from '@/utils/interface/controller.interface'
import HttpException from '@/utils/exceptions/http.exception'
import validationMiddleware from '@/middleware/validation.midldeware'
import validate from '@/resources/validation/user.validation'
import UserService from '@/resources/services/user.service'
import authenticated from '@/middleware/authenticated.middleware'

class UserController implements Controller{
    public path = "/user"
    public router = Router()
    private UserService = new UserService()

    constructor(){
        this.initialiseRoutes()
    }
    private initialiseRoutes(){
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        )
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        )
        this.router.get(
            `${this.path}`,
            authenticated,
            this.getUser
        )
    }
    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { username, password, fullname, email, phone, dateOfBirth} = req.body
            const token = await this.UserService.register(
                username,
                password,
                fullname,
                email,
                phone,
                dateOfBirth
            )
            res.status(201).json({ token })
        } catch( error:any ){
            next(new HttpException(400, error.message))
        }
    }
    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const { username, password } = req.body
            const userDto = await this.UserService.login(
                username,
                password
            )
            res.status(200).json({ userDto })
        } catch( error:any ){
            next(new HttpException(400, error.message))
        }
    }
    private getUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            if (! req.user){
                return next(new HttpException(401,"Unauthorized"))
            }
            res.status(200).json({ user: req.user })
        } catch( error:any ){
            next(new HttpException(400, error.message))
        }
    }
}
export default UserController