import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import validationMiddleware from "@/middleware/validation.midldeware"
import validate from "@/resources/validation/post.validation"
import PostService from "@/resources/services/post.service"
import authenticated from "@/middleware/authenticated.middleware"

class PostController implements Controller {
  public path = "/admin/post"
  public router = Router()
  private PostService = new PostService()

  constructor() {
    this.initialiseRoutes()
  }
  private initialiseRoutes() {
    this.router.post(
      `${this.path}/approve`,
      validationMiddleware(validate.approve),
      this.approve
    )
    this.router.post(
      `${this.path}/decline`,
      validationMiddleware(validate.decline),
      this.decline
    )
  }
  private approve = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { username } = req.body
      const token = await this.PostService.approve(username)
      res.status(201).json({ token })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
  private decline = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { username } = req.body
      const token = await this.PostService.decline(username)
      res.status(201).json({ token })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default PostController
