import { Document } from "mongoose"

export default interface IDeclineReason extends Document {
  _id: string
  title: string
}
