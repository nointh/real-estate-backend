import transactionModel from "../models/transaction.model"
import ITransaction from "../interfaces/transaction.interface"
import userModel from "../models/user.model"
import UserService from "./user.service"

class TransactionService {
  private transaction = transactionModel
  private user = userModel
  private userService = new UserService()

  public async get(id: string): Promise<any> {
    try {
      const trans = await this.transaction.findOne({ id: id })

      return trans
    } catch (error) {
      throw new Error("Unable to get transaction")
    }
  }

  public async getWithParams(
    id: string,
    type: string,
    status: string
  ): Promise<any> {
    console.log(status)
    try {
      let trans = await this.transaction
        .find({
          user: {
            $regex: new RegExp(id, "i"),
          },
          type: {
            $regex: new RegExp(type, "i"),
          },
          status: {
            $regex: new RegExp(status, "i"),
          },
        })
        .sort({ dateProceed: -1 })

      var newTrans: ITransaction[] = []

      for (let index = 0; index < trans.length; index++) {
        let element = trans[index]

        let _user = await this.user.findById(element?.user)
        if (_user) {
          let username = _user.username
          element.user = username
          newTrans.push(element)
        }
      }

      return newTrans
    } catch (error) {
      throw new Error("Unable to get transaction")
    }
  }

  public async finishIncomeSuccess(id: string): Promise<any> {
    try {
      let amount = 0
      let balance = 0
      let result = undefined

      let trans = await this.transaction.findById(id)

      console.log(trans)
      if (trans) {
        amount = trans.amount
        let user = await this.user.findById(trans?.user)
        if (user) {
          balance = user?.balance
          balance += amount
          await this.userService.updateBalance(user.id, balance)
          result = await trans.update({
            $set: {
              status: "success",
              dateFinish: new Date(),
              balance: balance,
            },
          })
        }
      }

      return result
    } catch (error) {
      throw new Error("Unable to finish transaction")
    }
  }

  public async finishIncomeError(id: string): Promise<any> {
    try {
      let balance = 0
      let result = undefined

      let trans = await this.transaction.findById(id)

      console.log(trans)
      if (trans) {
        let user = await this.user.findById(trans?.user)
        if (user) {
          balance = user?.balance
          result = await trans.update({
            $set: {
              status: "failed",
              dateFinish: new Date(),
              balance: balance,
            },
          })
        }
      }

      return result
    } catch (error) {
      throw new Error("Unable to finish transaction")
    }
  }

  public async add(
    user: string,
    amount: number,
    balance: number,
    detail: string,
    type: string,
    status: string
  ): Promise<any> {
    try {
      let dateProceed = new Date()
      let dateFinish = new Date()
      const trans = await this.transaction.create({
        user,
        status,
        dateProceed,
        dateFinish,
        amount,
        balance,
        detail,
        type,
      })

      return trans
    } catch (error) {
      throw new Error("Unable to get transaction")
    }
  }
}

export default TransactionService
