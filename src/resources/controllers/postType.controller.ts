import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import PostTypeService from "../services/postType.service"

class PostTypeController implements Controller {
  public path = "/a/post-type"
  public router = Router()
  private PostTypeService = new PostTypeService()

  constructor() {
    this.initialiseRoutes()
  }
  private initialiseRoutes() {
    this.router.get(
        `${this.path}/get`,
        this.get
    )
  }

  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
        const typeId = req.query.id?.toString()

        let data = undefined

        if (typeId != undefined) {
            data = await this.PostTypeService.get(typeId)
        } else {
            data = await this.PostTypeService.getAll()
        }

        res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default PostTypeController
