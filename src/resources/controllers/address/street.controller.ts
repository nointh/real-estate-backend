import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import validationMiddleware from "@/middleware/validation.midldeware"
import validate from "@/resources/validation/post.validation"
import StreetService from "@/resources/services/address/street.service"
import authenticated from "@/middleware/authenticated.middleware"

class StreetController implements Controller {
  public path = "/a/street"
  public router = Router()
  private StreetService = new StreetService()

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
      const streetId = req.query.s?.toString()

      let data = undefined
      if (streetId !== undefined) {
        data = await this.StreetService.get(streetId)
      } else if (districtId !== undefined) {
        data = await this.StreetService.getStreetsByDistrict(districtId)
      } else {
        data = null
      }
      

      res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default StreetController
