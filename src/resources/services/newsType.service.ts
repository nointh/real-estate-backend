import newsTypeModel from "../models/newsType.modal"

class NewsTypeService {
  private newsType = newsTypeModel

  public async get(): Promise<any> {
    try {
      const types = await this.newsType.find({}).exec()

      return types
    } catch (error) {
      throw new Error("Unable to get news types")
    }
  }
}

export default NewsTypeService
