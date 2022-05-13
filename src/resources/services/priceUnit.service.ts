import priceUnitModel from "../models/priceUnit.model"

class PriceUnitService {
  private priceUnit = priceUnitModel

  public async get(id: string): Promise<any> {
    try {
      const res = await this.priceUnit.findById(id)

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
      const types = await this.priceUnit.find({}).exec()

      return types
    } catch (error) {
      throw new Error("Unable to get price types")
    }
  }
}

export default PriceUnitService
