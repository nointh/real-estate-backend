import ProvinceModel from "@/resources/models/address/province.model"
import Province from "@/resources/interfaces/province.interface"

class ProvinceService {
  private province = ProvinceModel

  public async get(id: string | undefined): Promise<any> {
    try {
      const province = await this.province.findById({ _id: id })

      if (province) {
        return province
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public async getAll(): Promise<any> {
    try {
      const provinces = await this.province.find({})

      if (provinces.length > 0) return provinces
      else return null
    } catch (error) {
      throw new Error("Unable to get provinces")
    }
  }
}

export default ProvinceService
