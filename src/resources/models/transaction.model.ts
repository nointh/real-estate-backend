import { Schema, model } from "mongoose"
import ITransaction from "../interfaces/transaction.interface"

const TransactionSchema = new Schema<ITransaction>({
  user: { type: String },
  status: { type: String },
  dateProceed: { type: Date },
  dateFinish: { type: Date },
  amount: { type: Number },
  balance: { type: Number },
  detail: { type: String },
  type: { type: String },
})

export default model<ITransaction>("transaction", TransactionSchema)
