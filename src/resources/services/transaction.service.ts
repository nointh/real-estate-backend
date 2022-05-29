import transactionModel from "../models/transaction.model"
import ITransaction from "../interfaces/transaction.interface"
import userModel from "../models/user.model"

class TransactionService {
  private transaction = transactionModel
  private user = userModel

  public async get(id: string): Promise<any> {
    try {
      const trans = await this.transaction.findOne({ id: id })

      return trans
    } catch (error) {
      throw new Error("Unable to get transaction")
    }
  }

  public async getWithParams(id: string, type: string): Promise<any> {
    try {
      let trans = await this.transaction
        .find({
          user: {
            $regex: new RegExp(id, "i"),
          },
          type: {
            $regex: new RegExp(type, "i"),
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

  public async finish(id: string, status: string, balance?: number): Promise<any> {
    try {
      let result = await this.transaction.updateOne(
        { id: id },
        {
          $set: {
            status: status,
            dateFinish: new Date(),
            balance: balance
          },
        }
      )

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
