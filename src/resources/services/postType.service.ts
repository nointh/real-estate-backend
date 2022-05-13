import postTypeModel from "../models/postType.model"

class PostTypeService {
  private postType = postTypeModel

  public async get(id: string): Promise<any> {
    try {
      const res = await this.postType.findById(id)

      if (res) {
        return res
      } else {
        throw new Error("Cannot find object")
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public async getAll(): Promise<any> {
    try {
      const types = await this.postType.find({}).exec()

      return types
    } catch (error) {
      throw new Error("Unable to get estate types")
    }
  }
}

export default PostTypeService
