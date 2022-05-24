import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import validationMiddleware from "@/middleware/validation.midldeware"
import validate from "@/resources/validation/post.validation"
import NewsService from "../services/news.service"
import NewsTypeService from "../services/newsType.service"
import authenticated from "@/middleware/authenticated.middleware"

class NewsController implements Controller {
  public path = "/news"
  public router = Router()
  private NewsService = new NewsService()
  private NewsTypeService = new NewsTypeService()

  constructor() {
    this.initialiseRoutes()
  }

  private initialiseRoutes() {
    this.router.get(
      `${this.path}/get`,
      //validationMiddleware(validate.approve),
      this.get
    )
    this.router.get(
      `${this.path}/slug`,
      //validationMiddleware(validate.approve),
      this.getSlug
    )
  }
  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const newsId = req.query.p?.toString()
      let data = undefined
      if (newsId != undefined) {
        data = await this.NewsService.getByID(newsId)
      } else data = await this.NewsService.get()
      res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }

  private getSlug = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      let data = undefined
      data = await this.NewsTypeService.getAllSlug()

      res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default NewsController
