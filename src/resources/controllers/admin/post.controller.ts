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
    this.router.post(
      `${this.path}/terminate`,
      // validationMiddleware(validate.decline),
      this.terminate
    )
    this.router.post(
      `${this.path}/delete`,
      // validationMiddleware(validate.decline),
      this.delete
    )
    this.router.get(
      `${this.path}/count`,
      // validationMiddleware(validate.decline),
      this.count
    )
  }
  private approve = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.body
      const token = await this.PostService.approve(id)
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
      const { id } = req.body
      const token = await this.PostService.decline(id)
      res.status(201).json({ token })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
  private terminate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.body
      const token = await this.PostService.terminate(id)
      res.status(201).json({ token })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.body
      const token = await this.PostService.delete(id)
      res.status(201).json({ token })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
  private count = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const provinceId = req.query.p?.toString() || ""

      let data = undefined

      data = await this.PostService.count(provinceId)

      res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default PostController
