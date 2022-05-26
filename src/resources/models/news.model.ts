import { number, string } from "joi"
import { Schema, model } from "mongoose"
import mongoose from "mongoose"
import News from "../interfaces/news.interface"
const slug = require("mongoose-slug-generator")
mongoose.plugin(slug)
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
      slug: "slug",
      unique: true,
    },
    thumbnail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

NewsSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next()
  this.slug = normalizedVNString(this.title)

  next()
})

const normalizedVNString = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
}

export default model<News>("New", NewsSchema)
