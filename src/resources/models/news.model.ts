import { number, string } from "joi"
import { Schema, model } from "mongoose"
import News from "../interfaces/news.interface"

const NewsSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    // body: {
    //   type: [NewsDetailsSchema],
    // },
    body: [
      {
        type: {
          type: String,
          required: true,
        },
        src: {
          type: String,
          required: true,
        },
        style: {
          fontSize: {
            type: Number,
          },
          fontStyle: {
            type: String,
          },
        },
      },
    ],
    author: {
      type: String,
    },
    description: {
      type: String,
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
    views: {
      type: Number,
    },
    slug: {
      type: String,
    },
    thumnail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default model<News>("New", NewsSchema)
