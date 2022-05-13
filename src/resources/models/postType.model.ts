import { Schema, model } from "mongoose"
import IPostType from "../interfaces/postType.interface"

const PostTypeSchema = new Schema<IPostType>({
    name: { 
        type: String 
    },
    price: {
        type: Number
    },
    title_color: {
        type: String
    }
})
export default model<IPostType>("postType", PostTypeSchema)
