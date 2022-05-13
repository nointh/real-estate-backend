import { Document } from "mongoose"

export default interface IPostType extends Document {
  _id: string
  name: string
  price: number
  title_color: string
}
