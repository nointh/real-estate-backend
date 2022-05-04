import WardModel from "@/resources/models/address/ward.model"
import Ward from "@/resources/interfaces/province.interface"

class WardService {
  private ward = WardModel

  public async get(wardCode: string): Promise<any> {
    try {
      const ward = await this.ward.findOne({ wardCode: wardCode })

      if (ward) {
        return ward
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public async getWardsByDistrict(
    districtId: string | undefined
  ): Promise<any> {
    try {
      const wards = await this.ward.find({ districtId: districtId })

      return wards
    } catch (error) {
      throw new Error("Unable to get provinces")
    }
  }
}

export default WardService
