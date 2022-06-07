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
            `${this.path}/currentUser`,
            authenticated,
            this.getCurrentUser
        ),
        this.router.put(
            `${this.path}/currentUser`,
            authenticated,
            this.updateCurrentUser
        )
        this.router.post(
            `${this.path}/changePassword`,
            authenticated,
            this.changePassword
        )
        this.router.post(
            `${this.path}/balance/update`,
            this.updateBalance
        )
        this.router.get(
            `${this.path}`,
            this.getUser
        )
        // this.router.delete(
        //     `${this.path}`,
        //     this.delete
        // ),
        // this.router.put(
        //     `${this.path}`,
        //     this.update
        // )
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
    private getCurrentUser = async (
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
    private getUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const { id, username } = req.query
            if (!id && !username){
                const users = await this.UserService.getAllUsers()
                res.status(200).json({ users: users})
            }
            else{
                if (id && !username)
                {
                    const user = await this.UserService.getUserById(id.toString())
                    res.status(200).json({ user: user})
                }
                else if (!id && username)
                {
                    const user = await this.UserService.getUserByUsername(username.toString())
                    res.status(200).json({ user: user})
                }
            }
        } catch( error:any ){
            next(new HttpException(400, error.message))
        }
    }
    private changePassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const { oldPassword, newPassword} = req.body
            if (! req.user){
                return next(new HttpException(401,"Unauthorized"))
            }
            if (await this.UserService.changePassword(req.user._id, oldPassword, newPassword)){
                res.status(200).json({ message: "Change password successfully" })
            }
            else{
                next(new HttpException(401,"Cannot change password"))
            }
        } catch( error:any ){
            next(new HttpException(400, error.message))
        }
    }
    private updateCurrentUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const { fullname, dateOfBirth, phone, email, cityId, districtId, wardId, streetId } = req.body      
            if (! req.user){
                return next(new HttpException(401,"Unauthorized"))
            }
            if (await this.UserService.update(req.user._id, fullname, dateOfBirth, phone, email, cityId, districtId, wardId, streetId)){
                res.status(200).json({ message: "Update user successfully" })
            }
            else{
                next(new HttpException(401,"Cannot update user"))
            }
        } catch( error:any ){
            next(new HttpException(400, error.message))
        }
    }
    // private delete = async (
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ) : Promise<Response | void> => {
    //     try {
    //         const { id } = req.query
    //         if 
    //         const user = await this.UserService.deleteUserById(id.toString())
    //         if (user){
    //             res.status(200).json({ message: "Delete user successfully", user: user })
    //         }
    //         else{
    //             next(new HttpException(401,"Cannot delete user"))
    //         }
    //     } catch( error:any ){
    //         next(new HttpException(400, error.message))
    //     }
    // }
    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const { fullname, dateOfBirth, phone, email, cityId, districtId, wardId, streetId } = req.body      
            const { id } = req.params
            if (await this.UserService.update(id, fullname, dateOfBirth, phone, email, cityId, districtId, wardId, streetId)){
                res.status(200).json({ message: "Update user successfully" })
            }
            else{
                next(new HttpException(401,"Cannot update user"))
            }
        } catch( error:any ){
            next(new HttpException(400, error.message))
        }
    }
    private updateBalance = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const { userId, balance } = req.body      

            await this.UserService.updateBalance(userId, balance)
            res.status(200).json({ message: "Update user successfully" })
        } catch( error:any ){
            next(new HttpException(400, error.message))
        }
    }
}
export default UserController