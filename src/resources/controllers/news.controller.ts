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
    this.router.get(`${this.path}/get`, this.get)
    this.router.get(`${this.path}/popular`, this.getPopular)
    this.router.get(`${this.path}/slug`, this.getSlug)
    this.router.get(`${this.path}/type`, this.getType)
    this.router.post(`${this.path}/view`, this.view)
  }
  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const slug = req.query.slug?.toString()
      const typeSlug = req.query.typeslug?.toString()
      const tag = req.query.tag?.toString()
      let limit = req.query.limit?.toString()

      let limit_n = 1000

      if (limit) {
        limit_n = parseInt(limit)
      }

      let data = undefined
      if (slug != undefined) {
        data = await this.NewsService.getBySlug(slug)
      } else if (typeSlug != undefined) {
        data = await this.NewsService.getByTypeSlug(typeSlug, limit_n)
      } else if (tag != undefined) {
        data = await this.NewsService.getByTag(tag)
      } else data = await this.NewsService.get(limit_n)
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
      data = await this.NewsService.getAllNewsSlugs()

      res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }

  private getType = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      let slug = req.query.slug?.toString()

      let data = undefined
      if (slug) {
        data = await this.NewsTypeService.getBySlug(slug)
      } else {
        data = await this.NewsTypeService.get()
      }

      res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }

  private getPopular = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      let limit = req.query.limit?.toString()
      let limit_n = 100
      let data = undefined

      if (limit) {
        limit_n = parseInt(limit)
      }

      data = await this.NewsService.getPopular(limit_n)

      res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }

  private view = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      let { slug } = req.body.slug?.toString()

      const data = await this.NewsService.view(slug)

      res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default NewsController
