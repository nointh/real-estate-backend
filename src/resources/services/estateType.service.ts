import estateTypeModel from "../models/estateType.model"

class EstateTypeService {
  private estateType = estateTypeModel

  public async get(id: string): Promise<any> {
    try {
      const res = await this.estateType.findById(id)

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
      const types = await this.estateType.find({}).exec()

      return types
    } catch (error) {
      throw new Error("Unable to get estate types")
    }
  }
}

export default EstateTypeService
