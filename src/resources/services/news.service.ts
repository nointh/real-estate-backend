import NewsModel from "../models/news.model"
import News from "../interfaces/news.interface"
import NewsTypesModel from "../models/newsType.modal"

import { title } from "process"

class NewsService {
  private news = NewsModel
  private newsType = NewsTypesModel

  public async get(limit: number): Promise<Array<News> | any> {
    try {
      const news = await this.news.find().sort({ submitday: 1 }).limit(limit)
      if (news.length > 0) return news
      else return null
    } catch (error) {
      throw new Error("Unable to get news")
    }
  }

  public async getBySlug(slug: string): Promise<News | any> {
    try {
      let n = await this.news.findOne({ slug: slug })
      if (n) {
        let v = n?.views
        v += 1
        let result = await this.news.updateOne(
          { slug: slug },
          {
            $set: {
              views: v,
            },
          }
        )
      }

      return n
    } catch (error) {
      throw new Error("Unable to get news")
    }
  }

  public async view(slug: string): Promise<News | any> {
    try {
      let n = await this.news.findOne({ slug: slug })

      if (n) {
        let v = n?.views
        v += 1
        let result = await this.news.updateOne(
          { slug: slug },
          {
            $set: {
              views: v,
            },
          }
        )

        return result
      }
    } catch (error) {
      throw new Error("Unable to get news")
    }
  }

  public async getByTypeSlug(
    typeslug: string,
    limit: number
  ): Promise<News | any> {
    try {
      const news = await this.news
        .find({ type: typeslug })
        .sort({ submitday: 1 })
        .limit(limit)

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
        .sort({ submitday: 1 })

      return type
    } catch (error) {
      throw new Error("Unable to get news types")
    }
  }

  public async getPopular(limit: number): Promise<any> {
    try {
      const type = await this.news.find().sort({ view: 1 }).limit(limit)

      return type
    } catch (error) {
      throw new Error("Unable to get news types")
    }
  }
}
export default NewsService
