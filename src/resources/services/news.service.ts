import NewsModel from "../models/news.model"
import News from "../interfaces/news.interface"
import { title } from "process"

class NewsService {
  private news = NewsModel

  public async get(): Promise<Array<News>|any> {
    try {
      const news = await this.news.find()
        if(news.length>0)
        return news
        else return null
      
    } catch (error) {
      throw new Error("Unable to get news")
    }
  }

  public async getByID(id: string): Promise<News|any>{
    try {
        const news = await this.news.findById({id})
          if(news)
          return news
          else return null
        
      } catch (error) {
        throw new Error("Unable to get news")
      }
  }  
}
export default NewsService
