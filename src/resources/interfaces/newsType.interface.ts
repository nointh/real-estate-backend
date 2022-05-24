import { Document } from "mongoose"

export default interface INewsType extends Document {
  _id: string
  name: string
  slug: string
}
