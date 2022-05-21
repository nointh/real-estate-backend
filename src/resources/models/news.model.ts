import { Schema, model } from 'mongoose'
import News from '../interfaces/news.interface'

const NewsSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        body:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)
export default model<News>("New", NewsSchema)