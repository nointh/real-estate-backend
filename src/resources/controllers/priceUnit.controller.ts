import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import PriceUnitService from "../services/priceUnit.service"

class PriceUnitController implements Controller {
  public path = "/a/price-unit"
  public router = Router()
  private PriceUnitService = new PriceUnitService()

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
            data = await this.PriceUnitService.get(typeId)
        } else {
            data = await this.PriceUnitService.getAll()
        }

        res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default PriceUnitController
