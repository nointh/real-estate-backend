import StreetModel from "@/resources/models/address/street.model"
import Province from "@/resources/interfaces/province.interface"

class StreetService {
  private street = StreetModel

  public async get(streetCode: string): Promise<any> {
    try {
      const street = await this.street.findOne({ streetCode: streetCode })

      if (street) return street
      else return null
    } catch (error) {
      throw new Error("Unable to get provinces")
    }
  }
  public async getStreetsByDistrict(
    districtId: string | undefined
  ): Promise<any> {
    try {
      const streets = await this.street.find({ districtId: districtId })

      if (streets.length > 0) return streets
      else return null
    } catch (error) {
      throw new Error("Unable to get provinces")
    }
  }
}

export default StreetService
