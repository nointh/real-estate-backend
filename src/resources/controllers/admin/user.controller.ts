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
  }
  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { username } = req.body
      const token = await this.UserService.delete(username)
      res.status(201).json({ token })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default UserController
