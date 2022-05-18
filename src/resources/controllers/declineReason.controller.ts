import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import DeclineReasonService from "../services/declineReason.service"

class DeclineReasonController implements Controller {
  public path = "/a/decline-reason"
  public router = Router()
  private DeclineReasonService = new DeclineReasonService()

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
        const reasonId = req.query.id?.toString()

        let data = undefined

        if (reasonId != undefined) {
            data = await this.DeclineReasonService.get(reasonId)
        } else {
            data = await this.DeclineReasonService.getAll()
        }

        res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}
export default DeclineReasonController
