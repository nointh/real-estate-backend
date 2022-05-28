import transactionModel from "../models/transaction.model"
import ITransaction from "../interfaces/transaction.interface"

class TransactionService {
  private transaction = transactionModel

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
      const trans = await this.transaction
        .find({
          user: {
            $regex: new RegExp(id, "i"),
          },
          type: {
            $regex: new RegExp(type, "i"),
          },
        })
        .sort({ dateProceed: 1 })

      return trans
    } catch (error) {
      throw new Error("Unable to get transaction")
    }
  }

  public async finish(id: string, status: string): Promise<any> {
    try {
      let result = await this.transaction.updateOne(
        { id: id },
        {
          $set: {
            status: status,
            dateFinish: new Date(),
          },
        }
      )

      return result
    } catch (error) {
      throw new Error("Unable to get transaction")
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
