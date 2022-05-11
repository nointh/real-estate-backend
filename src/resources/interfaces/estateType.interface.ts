import { Document } from "mongoose"

export default interface IEstateType extends Document {
  _id: string
  name: string
}
