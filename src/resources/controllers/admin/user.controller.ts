import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import validationMiddleware from "@/middleware/validation.midldeware"
import validate from "@/resources/validation/user.validation"
import UserService from "@/resources/services/user.service"
import authenticated from "@/middleware/authenticated.middleware"

class UserController implements Controller {
  public path = "/admin/user"
  public router = Router()
  private UserService = new UserService()

  constructor() {
    this.initialiseRoutes()
  }
  private initialiseRoutes() {
    this.router.post(
      `${this.path}/delete`,
      validationMiddleware(validate._delete),
      this.delete
    )
    this.router.get(
      `${this.path}`,
      this.getUser
    )
    this.router.put(
      `${this.path}`,
      this.update
    )
  }
  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id, username } = req.query
      if (!id && !username)
      {
        throw new Error("ID or username must be defined")
      }
      if (id && !username){
        const user = await this.UserService.deleteUserById(id.toString())
        res.status(201).json({ user })
      }
      else if (username){
        const user = await this.UserService.deleteByUsername(username.toString())
        res.status(201).json({ user })
      }
    } catch (error: any) {
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
            else if (username)
            {
                const user = await this.UserService.getUserByUsername(username.toString())
                res.status(200).json({ user: user})
            }
        }
    } catch( error:any ){
        next(new HttpException(400, error.message))
    }
  }
  private update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) : Promise<Response | void> => {
    try {
      const { fullname, dateOfBirth, phone, email, cityId, districtId, wardId, streetId, accountStatus } = req.body      
      const { id, username } = req.params
      if (!id && !username)
      {
        next(new HttpException(401,"Username or id must be defined"))
      }
      if (id && !username){
        const updatedUser = await this.UserService.update('id', id, fullname, dateOfBirth, phone, email, cityId, districtId, wardId, streetId, accountStatus)
        res.status(200).json(
          { message: "Update user successfully",
          user:updatedUser 
          }
        )
      }
      else{
        const updatedUser = await this.UserService.update('username', username, fullname, dateOfBirth, phone, email, cityId, districtId, wardId, streetId, accountStatus)
        res.status(200).json(
          { message: "Update user successfully",
          user:updatedUser 
          }
        )
      }
    } catch( error:any ){
      next(new HttpException(400, error.message))
    }
  }
}
export default UserController
