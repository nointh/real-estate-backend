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

  public async getAllNewsSlugs(): Promise<any> {
    try {
      let news = await this.news.find()
      const filterNews = news.filter((element) => element.slug)
      const result = await Promise.all(
        filterNews.map(async (element) => {
          let postSlug = element?.slug
          let type = await this.newsType.findOne({ id: element?.type })
          let typeSlug = ""
          if (type) {
            typeSlug = type?.slug
          }
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
}
export default NewsService
