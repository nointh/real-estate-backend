import { number, string } from 'joi'
import { Schema, model } from 'mongoose'
import News from '../interfaces/news.interface'

const NewsDetailsSchema = new Schema(
    {
        type: {
            type: String,
            required: true
        },
        src: {
            type: String,
            required: true
        },
        style: {
            fontSize:{
                type: Number,
                required: true
            },
            fontStyle: {
                type: String,
                required: true
            }
        }
    }
);

const NewsSchema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        body:{
            type: [NewsDetailsSchema],
            default: undefined
        },
        author: {
            type: String
        },
        description: {
            type: String
        },
        submitday: {
            type: String,
        },
        tags: {
            type: String,
        },
        type: {
            type: String,
        },
        views:{
            type: Number,
        }
    },
    {
        timestamps: true
    }
);

export default model<News>("New", NewsSchema)