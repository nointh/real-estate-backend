import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import validationMiddleware from "@/middleware/validation.midldeware"
import validate from "@/resources/validation/post.validation"
import DistrictService from "@/resources/services/address/district.service"
import authenticated from "@/middleware/authenticated.middleware"

class DistrictController implements Controller {
  public path = "/a/district"
  public router = Router()
  private DistrictService = new DistrictService()

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
      const provinceId = req.query.p?.toString()
      const districtId = req.query.d?.toString()

      let data = undefined

      if (districtId !== undefined) {
        data = await this.DistrictService.get(districtId)
      } else if (provinceId !== undefined) {
        data = await this.DistrictService.getDistrictsByProvince(provinceId)
      } else {
        data = null
      }

      res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default DistrictController
