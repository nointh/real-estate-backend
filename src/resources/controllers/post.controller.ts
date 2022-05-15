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
    this.router.post(`${this.path}/delete`, this.delete)
    this.router.get(`${this.path}/slug`, this.getSlug)
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
        belongToProject,
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
        expiredDate,
        expiredDate,
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
        belongToProject
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

      let data = undefined

      if (status == undefined) status = ""
      if (postType == undefined) postType = ""
      if (estateType == undefined) estateType = ""

      if (postId != undefined) {
        data = await this.PostService.getDetail(postId)
      } else {
        data = await this.PostService.getWithParams(
          status,
          postType,
          estateType
        )
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
    ) : Promise<Response | void> => {
        try {
            let slug = req.query.slug?.toString()
            if (!slug)
            {
                const slugs = await this.PostService.getAllPostSlugs()
                res.status(200).json({ slugs })
            }
            else
            {
                const post = await this.PostService.getPostBySlug(slug)
                res.status(200).json({ post })
            }

        } catch( error:any ){
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
}
export default PostController
