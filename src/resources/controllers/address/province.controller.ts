import e, { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import validationMiddleware from "@/middleware/validation.midldeware"
import validate from "@/resources/validation/post.validation"
import ProvinceService from "@/resources/services/address/province.service"
import authenticated from "@/middleware/authenticated.middleware"

class ProvinceController implements Controller {
  public path = "/a/province"
  public router = Router()
  private ProvinceService = new ProvinceService()

  constructor() {
    this.initialiseRoutes()
  }
  private initialiseRoutes() {
    this.router.get(
      `${this.path}/get`,
      //   validationMiddleware(validate.approve),
      this.get
    )
  }
  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const provinceId = req.query.p?.toString()

      let data = undefined

      if (provinceId == undefined) {
        data = await this.ProvinceService.getAll()
      } else {
        data = await this.ProvinceService.get(provinceId)
      }

      res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default ProvinceController
