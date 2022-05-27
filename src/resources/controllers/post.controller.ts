import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import validationMiddleware from "@/middleware/validation.midldeware"
import PostService from "../services/post.service"

class PostController implements Controller {
  public path = "/post"
  public router = Router()
  private PostService = new PostService()

  constructor() {
    this.initialiseRoutes()
  }
  private initialiseRoutes() {
    this.router.post(`${this.path}/upload`, this.create)
    this.router.get(`${this.path}/get`, this.get)
    this.router.get(`${this.path}/count`, this.count)
    this.router.post(`${this.path}/delete`, this.delete)
    this.router.get(`${this.path}/slug`, this.getSlug)
    this.router.post(`${this.path}/view`, this.view)

  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {
        title,
        address,
        ownerId,
        postTypeId,
        estateTypeId,
        forSaleOrRent,
        status,
        location,
        cor,
        description,
        images,
        legalDocuments,
        publishedDate,
        expiredDate,
        reviewExpireDate,
        price,
        priceType,
        area,
        floorNumber,
        bathroomNumber,
        bedroomNumber,
        direction,
        furniture,
        width,
        depth,
        roadWidth,
        facade,
        slug,
        declineReasonId,
        belongToProject,
        views
      } = req.body
      const token = await this.PostService.create(
        title,
        address,
        ownerId,
        postTypeId,
        estateTypeId,
        forSaleOrRent,
        status,
        location,
        cor,
        description,
        images,
        legalDocuments,
        publishedDate,
        expiredDate,
        reviewExpireDate,
        reviewExpireDate,
        price,
        priceType,
        area,
        floorNumber,
        bathroomNumber,
        bedroomNumber,
        direction,
        furniture,
        width,
        depth,
        roadWidth,
        facade,
        slug,
        declineReasonId,
        belongToProject,
        views
      )
      res.status(201).json({ token })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }

  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      let postId = req.query.id?.toString()
      let status = req.query.s?.toString()
      let postType = req.query.pt?.toString()
      let estateType = req.query.et?.toString()
      let ownerId = req.query.oid?.toString()
      let userId = req.query.usr?.toString()

      let data = undefined

      if (status == undefined) status = ""
      if (postType == undefined) postType = ""
      if (estateType == undefined) estateType = ""
      if (ownerId == undefined) ownerId = ""

      if (postId != undefined) {
        data = await this.PostService.getDetail(postId)
      } else {
        if (userId != undefined) {
          data = await this.PostService.getAllPostOfUser(userId)
        } else {
          data = await this.PostService.getWithParams(
            status,
            postType,
            estateType,
            ownerId
          )
        }
      }

      res.status(200).json({ data })
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
      let slug = req.query.slug?.toString()
      if (!slug) {
        const slugs = await this.PostService.getAllPostSlugs()
        res.status(200).json({ slugs })
      } else {
        const post = await this.PostService.getPostBySlug(slug)
        res.status(200).json({ post })
      }
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
      let postId = req.query.id?.toString()
      const token = await this.PostService.delete(postId)

      res.status(200).json({ token })
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
      let cityCode = req.query.cityCode?.toString()
      let userId = req.query.userId?.toString()
      let data = undefined

      if (cityCode == undefined && userId != undefined) {
        data = await this.PostService.getTotalPostOfUser(userId)
      }
      if (cityCode != undefined && userId == undefined) {
        data = await this.PostService.getTotalPostOfCity(cityCode)
      }

      res.status(200).json({ data })
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
      const { _id } = req.body

      const data = await this.PostService.view(_id)

      res.status(200).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default PostController
