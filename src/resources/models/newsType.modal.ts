import { Schema, model } from "mongoose"
import INewsType from "../interfaces/newsType.interface"

const PostTypeSchema = new Schema<INewsType>({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
})
export default model<INewsType>("newstype", PostTypeSchema)
