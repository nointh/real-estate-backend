import { Document } from "mongoose"

export default interface ITransaction extends Document {
  _id: string
  user: string
  status: string
  dateProceed: Date
  dateFinish: Date
  amount: number
  balance: number
  detail: string
  type: string
}
