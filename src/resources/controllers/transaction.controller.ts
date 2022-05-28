import { Router, Request, Response, NextFunction } from "express"
import Controller from "@/utils/interface/controller.interface"
import HttpException from "@/utils/exceptions/http.exception"
import TransactionService from "../services/transaction.service"
import UserService from "../services/user.service"

class TransactionController implements Controller {
  public path = "/transaction"
  public router = Router()
  private transactionService = new TransactionService()
  private userService = new UserService()

  constructor() {
    this.initialiseRoutes()
  }
  private initialiseRoutes() {
    this.router.get(`${this.path}/`, this.get)
    this.router.post(`${this.path}/add`, this.add)
    this.router.post(`${this.path}/add`, this.add)

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

      let data = undefined

      if (id != "") {
        data = await this.transactionService.get(id)
      } else {
        data = await this.transactionService.getWithParams(user, type)
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

      let result = await this.transactionService.add(user, amount, balance, detail, type, status)

      res.status(201).json({ result })
    } catch (error: any) {
      next(new HttpException(400, error.message))
    }
  }
}

export default TransactionController
