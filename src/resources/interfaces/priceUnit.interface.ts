import { Document } from "mongoose"

export default interface IPriceUnit extends Document {
  _id: string
  label: string
}
