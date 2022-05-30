import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import TransactionService from "../services/transaction.service"
import UserService from "../services/user.service"

class TransactionController implements Controller {
  public path = "/transaction"
  public router = Router()
  private transactionService = new TransactionService()

  constructor() {
    this.initialiseRoutes()
  }
  private initialiseRoutes() {
    this.router.get(`${this.path}/`, this.get)
    this.router.post(`${this.path}/add`, this.add)
    this.router.post(`${this.path}/finish`, this.finish)
  }

  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const id = req.query.id?.toString() || ""
      const type = req.query.type?.toString() || ""
      const user = req.query.user?.toString() || ""
      const status = req.query.status?.toString() || ""

      let data = undefined

      if (id != "") {
        data = await this.transactionService.get(id)
      } else {
        data = await this.transactionService.getWithParams(user, type, status)
      }

      res.status(201).json({ data })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }

  private add = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { user, amount, balance, detail, type, status } = req.body

      let result = await this.transactionService.add(
        user,
        amount,
        balance,
        detail,
        type,
        status
      )

      res.status(201).json({ result })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }

  private finish = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id, status } = req.body

      let result = undefined
      if (status == "success") {
        result = await this.transactionService.finishIncomeSuccess(id)
      } else {
        result = await this.transactionService.finishIncomeError(id)
      }

      res.status(201).json({ result })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}

export default TransactionController
