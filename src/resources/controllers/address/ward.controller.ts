import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import validationMiddleware from "@/middleware/validation.midldeware"
import validate from "@/resources/validation/post.validation"
import WardService from "@/resources/services/address/ward.service"
import authenticated from "@/middleware/authenticated.middleware"

class WardController implements Controller {
  public path = "/a/ward"
  public router = Router()
  private WardService = new WardService()

  constructor() {
    this.initialiseRoutes()
  }
  private initialiseRoutes() {
    this.router.get(
      `${this.path}/get`,
      //   validationMiddleware(validate.decline),
      this.get
    )
  }

  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const districtId = req.query.d?.toString()
      const wardId = req.query.w?.toString()

      let data = undefined
      if (wardId !== undefined) {
        data = await this.WardService.get(wardId)
      } else if (districtId !== undefined) {
        data = await this.WardService.getWardsByDistrict(districtId)
      } else {
        data = null
      }

      res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default WardController
