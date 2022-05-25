import NewsModel from "../models/news.model"
import News from "../interfaces/news.interface"
import NewsTypesModel from "../models/newsType.modal"

import { title } from "process"

class NewsService {
  private news = NewsModel
  private newsType = NewsTypesModel

  public async get(): Promise<Array<News> | any> {
    try {
      const news = await this.news.find()
      if (news.length > 0) return news
      else return null
    } catch (error) {
      throw new Error("Unable to get news")
    }
  }

  public async getByID(id: string): Promise<News | any> {
    try {
      const news = await this.news.findById("abc")
      return news
    } catch (error) {
      throw new Error("Unable to get news")
    }
  }

  public async getBySlug(slug: string): Promise<News | any> {
    try {
      const news = await this.news.findOne({ slug: slug })

      return news
    } catch (error) {
      throw new Error("Unable to get news")
    }
  }

  public async getByTypeSlug(typeslug: string): Promise<News | any> {
    try {
      console.log(typeslug)
      const news = await this.news.find({ type: typeslug })

      return news
    } catch (error) {
      throw new Error("Unable to get news")
    }
  }

  public async getAllNewsSlugs(): Promise<any> {
    try {
      let news = await this.news.find()
      const filterNews = news.filter((element) => element.slug)
      const result = await Promise.all(
        filterNews.map(async (element) => {
          let postSlug = element?.slug
          let typeSlug = element?.type
          return {
            params: { newsTypeSlug: typeSlug, newSlug: postSlug },
          }
        })
      )
      return result
    } catch (error) {
      console.log(error)
      throw new Error(`Unable to get post slug due to error: ${error}`)
    }
  }

  public async getByTag(tag: string): Promise<any> {
    try {
      const type = await this.news
        .find({
          tags: {
            $regex: new RegExp(tag, "i"),
          },
        })
        .exec()

      return type
    } catch (error) {
      throw new Error("Unable to get news types")
    }
  }

  public async getPopular(): Promise<any> {
    try {
      const type = await this.news.find().sort({ view: 1 })

      return type
    } catch (error) {
      throw new Error("Unable to get news types")
    }
  }
}
export default NewsService
