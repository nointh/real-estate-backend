import DistrictModel from "@/resources/models/address/district.model"

class DistrictService {
  private district = DistrictModel

  public async get(districtCode: string): Promise<any> {
    try {
      const district = await this.district.findOne({
        districtCode: districtCode,
      })

      if (district) {
        return district
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public async getAll(): Promise<any> {
    try {
      const districts = await this.district.find({})

      return districts
    } catch (error) {
      throw new Error("Unable to get districts")
    }
  }

  public async getDistrictsByProvince(
    provinceId: string | undefined
  ): Promise<any> {
    try {
      const districts = await this.district.find({ provinceNameId: provinceId })

      if (districts.length > 0) return districts
      else return null
    } catch (error) {
      throw new Error("Unable to get districts")
    }
  }
}

export default DistrictService
